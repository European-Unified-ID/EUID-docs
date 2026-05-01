---
title: EUID Token Validator
description: How to use the EUID Token Validator to validate EUID tokens against source personal data and confirm that your token generation workflow is correct.
hide_table_of_contents: false
sidebar_position: 02
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# EUID Token Validator

The [EUID Token Validator](https://token-validator.euid.eu/) is a web-based tool that validates <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> against their source personal data to confirm that your token generation process is correct.

## Overview

When publishers generate EUID tokens by providing personal data, in some cases the resulting EUID token appears valid but is not. This is because the normalization or hashing steps are not performed correctly. Because EUID uses the normalized and hashed form of personal data to derive the token, an error in either step produces an EUID token and underlying <Link href="../ref-info/glossary-uid#gl-raw-euid">raw EUID</Link> that do not correspond to the correct values generated from the same personal data by other participants.

## Prerequisites

To use the EUID Token Validator, you need:

- An **EUID API Key** (Client Key)
- An **EUID Client Secret**

If you do not have these, ask your EUID contact. For details, see [EUID credentials](../getting-started/gs-credentials.md).

## Using the token validator

To use the token validator, follow these steps:

1. In the fields at the top of the Token Validation section, enter your **API Key** (Client Key) and **Client Secret**.
2. Select the **Operator** (environment) you want to validate against. For information about EUID environments, see [Environments](../getting-started/gs-environments.md).

### Validate a single token

To validate a single token, follow these steps:

1. Under **Input Mode**, select **Single Validation**.
2. In the **Identifier** field, enter the personal data you used to generate the token. This can be:
   - A raw email address
   - A raw phone number
   - A normalized and then Base64-encoded email hash
   - A normalized and then Base64-encoded phone hash
3. Select the identifier type that matches your input.
4. In the **Token** field, paste the EUID token you want to validate.
5. Click **Validate Tokens**.

### Validate multiple tokens (csv)

To validate a batch of token-identifier pairs, follow these steps:

1. Under **Input Mode**, select **CSV**.
2. Prepare a CSV file with the following columns:
   - `identifier`: The personal data (raw email, raw phone, email hash, or phone hash).
   - `identifier_type`: Either `email`, `phone`, `email_hash` or `phone_hash`.
   - `token`: The EUID token to validate.
3. Upload the CSV file.
4. Click **Validate Tokens**.

## Interpret validation results

When you click **Validate Tokens**, the **Validation Results** table displays a row for each token-identifier pair, in the format shown in the following table.

| Column | Description |
|---|---|
| Identifier | The personal data you entered. |
| Identifier Type | `email`, `phone`, `email_hash` or `phone_hash`. |
| Normalized Hash | The Base64-encoded SHA-256 hash of the normalized personal data. |
| Token | The token you submitted. |
| Validation | The result of the validation. For details, see the following table. |

The **Validation** column reflects the response from the [POST&nbsp;/token/validate](../endpoints/post-token-validate.md) endpoint.

| Validation Result | Meaning |
|---|---|
| `Token matches identifier` | The token matches the provided personal data. This means that the token was generated from the correct normalized hash. |
| `Failed: Token does not match identifier` | The token does not match the provided personal data. The most likely cause is incorrect normalization or hashing. |
| `Failed: Invalid token` | The token is malformed and cannot be parsed. |
| `Failed: {"status":"unauthorized"}` | The API credentials provided are invalid or unauthorized. |

:::tip
If the result is **Failed: Token does not match identifier**, compare the **Normalized Hash** shown in the results with the value your own implementation produced for the same personal data. If they differ, the issue is in your normalization or hashing steps. For details, see [Normalization and encoding](../getting-started/gs-normalization-encoding.md) and [Preparing emails and phone numbers for processing](ref-preparing-emails-and-phone-numbers-for-processing.md).
:::
