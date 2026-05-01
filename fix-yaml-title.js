#!/usr/bin/env node
/**
 * fix-yaml-title.js
 *
 * For every Markdown (*.md) file in a repo (including subfolders):
 *   - If the file starts with a YAML front-matter block (line 1 is "---"),
 *     and line 2 is a "title:" field,
 *     replace the title value with the text from the first Markdown H1 heading.
 *   - Files without a YAML block are left untouched.
 *
 * Usage:
 *   node fix-yaml-title.js <path-to-repo>
 *
 * If no path is provided, the current working directory is used.
 */

const fs   = require('fs');
const path = require('path');

// ─── helpers ────────────────────────────────────────────────────────────────

/** Recursively collect every *.md file under `dir`. */
function collectMarkdownFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && /\.md$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

/** Process a single Markdown file. Returns 'updated', 'colon', or 'skipped'. */
function processFile(filePath) {
  const raw   = fs.readFileSync(filePath, 'utf8');
  // Normalise line endings to LF for parsing; we'll restore CRLF if needed.
  const usesCRLF = raw.includes('\r\n');
  const content  = raw.replace(/\r\n/g, '\n');
  const lines    = content.split('\n');

  // ── Guard: must start with a YAML front-matter block ──────────────────────
  if (lines[0].trim() !== '---') return 'skipped';

  // ── Guard: line 2 (index 1) must be a "title:" field ──────────────────────
  const titleLineIndex = 1;
  const titleLineRaw   = lines[titleLineIndex];
  const titleMatch     = titleLineRaw.match(/^(title:\s*)(.*)$/i);
  if (!titleMatch) return 'skipped';

  const titlePrefix = titleMatch[1]; // e.g. "title: "
  const oldTitle    = titleMatch[2].trim();

  // ── Find the first H1 heading anywhere in the file ────────────────────────
  let h1Text = null;
  for (const line of lines) {
    const h1Match = line.match(/^#\s+(.+)/);
    if (h1Match) {
      h1Text = h1Match[1].trim();
      break;
    }
  }

  if (!h1Text) {
    console.log(`  SKIP  – no H1 heading found:      ${filePath}`);
    return 'skipped';
  }

  // ── Guard: colon in H1 is illegal in YAML — skip and flag ─────────────────
  if (h1Text.includes(':')) {
    console.log(`  COLON – H1 contains a colon, skipped: ${filePath}`);
    return 'colon';
  }

  if (h1Text === oldTitle) {
    console.log(`  OK    – title already matches:    ${filePath}`);
    return 'skipped';
  }

  // ── Replace the title line ─────────────────────────────────────────────────
  lines[titleLineIndex] = `${titlePrefix}${h1Text}`;
  let updated = lines.join('\n');
  if (usesCRLF) updated = updated.replace(/\n/g, '\r\n');

  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`  UPDATED "${oldTitle}" → "${h1Text}"`);
  console.log(`          ${filePath}`);
  return 'updated';
}

// ─── main ────────────────────────────────────────────────────────────────────

const repoRoot = path.resolve(process.argv[2] || process.cwd());

if (!fs.existsSync(repoRoot) || !fs.statSync(repoRoot).isDirectory()) {
  console.error(`Error: "${repoRoot}" is not a valid directory.`);
  process.exit(1);
}

console.log(`\nScanning: ${repoRoot}\n`);

const files        = collectMarkdownFiles(repoRoot);
const colonFiles   = [];
let updatedCount   = 0;
let skippedCount   = 0;

for (const file of files) {
  const result = processFile(file);
  if (result === 'updated') {
    updatedCount++;
  } else if (result === 'colon') {
    colonFiles.push(file);
    skippedCount++;
  } else {
    skippedCount++;
  }
}

// ── Write exceptions file if any colons were found ───────────────────────────
if (colonFiles.length > 0) {
  const exceptionsPath = path.join(repoRoot, 'fix-yaml-title-exceptions.txt');
  const exceptionsContent =
    `Files skipped because the H1 heading contains a colon:\n\n` +
    colonFiles.join('\n') + '\n';
  fs.writeFileSync(exceptionsPath, exceptionsContent, 'utf8');
  console.log(`\nExceptions written to: ${exceptionsPath}`);
}

console.log(`\nDone. ${files.length} file(s) scanned — ${updatedCount} updated, ${skippedCount} skipped (${colonFiles.length} due to colon in H1).\n`);
