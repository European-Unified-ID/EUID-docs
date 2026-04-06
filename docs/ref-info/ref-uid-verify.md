---
title: UID Verify Chrome Extension
description: How to use the UID Verify Chrome extension to debug and inspect EUID integrations on any web page.
hide_table_of_contents: false
sidebar_position: 02
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID Verify Chrome Extension

UID Verify is a browser extension for debugging EUID integrations. It inspects the EUID implementation on the current page in real time, surfacing EUID SDK configuration, identity storage, event history, and errors.

The extension supports integrations using the <Link href="../sdks/sdk-ref-javascript">SDK for JavaScript</Link>, <Link href="../guides/integration-prebid">Prebid.js</Link>, and <Link href="../guides/integration-google-ss">Google Secure Signals</Link>.

## Overview

When integrating EUID, it can be difficult to tell whether the EUID SDK is initializing correctly, whether tokens are valid, or where in the lifecycle an error is occurring. UID Verify helps debug this by reading the EUID SDK configuration, identity data, and event stream directly from the page and presenting it in a structured, searchable interface.

The extension detects whether a page uses the EUID SDK directly, Prebid.js, or Google Secure Signals (or a combination), and displays the relevant information for each integration type.

## Prerequisites

UID Verify requires:

- **Google Chrome** browser
- A web page that has an EUID integration — one of the following must be present on the page:
  - The <Link href="../sdks/sdk-ref-javascript">SDK for JavaScript</Link> is loaded on the page (accessible via `window.__euid`)
  - <Link href="../guides/integration-prebid">Prebid.js</Link> with an EUID user ID module configured
  - <Link href="https://developers.google.com/publisher-tag/guides/secure-signals">Google Publisher Tags (GPT)</Link> with an EUID Secure Signals provider registered

If more than one integration type is detected, you can switch between them using the integration type tabs at the top of the popup.

:::note
Server-side integrations are not currently supported. UID Verify works by reading client-side signals such as browser storage and EUID SDK globals, which are not present in a server-side integration.
:::

## Installing the Extension

To install UID Verify from the Chrome Web Store, follow these steps:

1. Go to the [UID Verify listing](https://chromewebstore.google.com/detail/uid-verify/cfpjjmdagnkmmolcddnoagffeoekkmle) in the Chrome Web Store.
2. Click **Add to Chrome**.
3. When prompted, click **Add extension**.
4. Pin the extension to your toolbar for easy access: click the Extensions icon in your browser, then click the pin icon next to UID Verify.

## Using UID Verify

Once installed, follow these steps to inspect an EUID integration:

1. Navigate to a web page that has an EUID integration.
2. Click the **UID Verify** icon in your browser toolbar to open the extension popup.
3. The extension detects the integration type on the page and displays the appropriate tabs.

:::note
UID Verify supports both UID2 and EUID. A page should use either UID2 (for North America and parts of Asia) or EUID (for Europe and other GDPR-applicable regions), not both. If both are detected on the same page, the extension displays an error.
:::

## Interpreting Results

The following sections describe the information available in each tab of the UID Verify popup. The content of each tab varies depending on the integration type detected.

### Config Tab

The **Config** tab provides a snapshot of the integration's current state, including status banners for successful token generation, errors, opt-out identities, and other configuration states. The information displayed depends on the integration type, as shown in the following sections.

**EUID SDK integrations:**

- EUID SDK version
- EUID SDK initialization options
- The current identity object, including:
  - Advertising token
  - Refresh token
  - Token and refresh expiration timestamps
- The result of `getAdvertisingToken()`
- The result of `isLoginRequired()`

**Prebid.js integrations:**

- The current EUID token from `window.pbjs.getUserIds().euid`
- The Prebid.js configuration parameters from `window.pbjs.getConfig().userSync.userIds` (for example, `euidApiBase`, `subscriptionId`, `serverPublicKey`)

**Google Secure Signals integrations:**

- Whether Google Publisher Tags is detected
- Whether the EUID provider ID is registered
- Whether `getAdvertisingTokenAsync` is available
- Whether a collector function is registered (the function that passes the EUID token as an encrypted signal to Google Ad Manager)

### Storage Tab

The **Storage** tab shows the raw identity data stored in the browser for the current integration.

**EUID SDK and Prebid.js integrations**

EUID SDK and Prebid.js integrations include the fields shown in the following table.

| Field | Description |
|---|---|
| Storage Type | Indicates whether the identity is stored in a cookie or `localStorage`. |
| Storage Key | The name of the cookie or `localStorage` key. For EUID SDK integrations: `__euid` or `EUID-sdk-identity`. For Prebid.js integrations: `__euid_advertising_token`. |
| Stored Value | The raw identity JSON, including `advertising_token`, `refresh_token`, `identity_expires`, `refresh_expires`, `refresh_from`, and `refresh_response_key`. |
| Valid Identity | Indicates whether the stored identity is currently valid — that is, the advertising token has not expired and the user has not opted out. |
| Optout Identity | Indicates whether the identity reflects an opted-out user. |

For Google Secure Signals integrations, the tab shows the status of the secure signal and the current EUID advertising token. If no signal has been generated yet, it indicates that neither a cached signal nor an EUID SDK advertising token is available. When the collector function has run successfully, the extension displays a "Secure signal is cached" status message and shows the cached value stored under `_GESPSK-euid.eu`. The cached signal is in the format `[providerId, advertisingToken, expiryTimestamp]`. The current EUID advertising token is also displayed separately.

### Callbacks Tab

The **Callbacks** tab is available for EUID SDK integrations only. It displays the source code of all callback functions registered with the EUID SDK, with syntax highlighting. This is useful for confirming that the correct callbacks are registered and identifying where events are being handled in the page code.

### Event History Tab

The **Event History** tab shows a searchable, real-time log of EUID SDK events as they occur on the page. It includes the columns shown in the following table.

| Column | Description |
|---|---|
| Date | The date the event was recorded. |
| Time | The time the event was recorded. |
| Event | The event type (for example, `SdkLoaded`, `InitCompleted`, `TokenUpdated`). |
| Advertising Token | The advertising token associated with the event, if present. |

Use the search bar to filter by event type or token value.

This tab also includes an **Error Log** when errors are detected. The extension captures several categories of errors:

- Failed network requests to the EUID operator
- Failed resource loads (such as the EUID SDK script)
- `console.error` calls from EUID SDK code
- Errors thrown by EUID SDK methods

For known error patterns, the extension displays contextual troubleshooting guidance alongside the error.
