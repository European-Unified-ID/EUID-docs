---
title: Google Ad Manager Secure Signals Integration
sidebar_label: GAM Secure Signals
pagination_label: Google Ad Manager Secure Signals Integration
description: Covers integration steps for publishers using EUID with the Google Ad ManagerSecure Signals feature.
hide_table_of_contents: false
sidebar_position: 10
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';

# Google Ad Manager Secure Signals Integration Guide

This guide covers integration steps for publishers using EUID with the Google Ad Manager secure signals feature (previously known as Encrypted Signals for Publishers, ESP).

:::note
To use the EUID Google Ad Manager secure signals integration, if you are using an SDK you must have your EUID integration already set up. This does not apply if you are using server-side integration. For a summary of all the integration options available, see [EUID Integration Guides: Summary](summary-guides.md).
:::

## Overview

Google secure signals is a way for publishers to pass "encrypted" user IDs to bidders that are approved by Google, via [Google Ad Manager](https://admanager.google.com/home/) and the [Google Ad Manager Ad Exchange (AdX)](https://support.google.com/admanager/answer/6321605?hl=en). The framework is an optional part of the <a href="https://developers.google.com/publisher-tag/guides/get-started">Google Publisher Tag (GPT)</a> library commonly used by publishers.

With this framework, the following steps occur:

1. Publishers push user ID signals (advertising tokens) to the secure signals feature.
2. The secure signals feature caches them on the client side and then transparently passes them to Google Ad Manager.
3. Google Ad Manager uses the EUID tokens to make bid requests, forwarding the tokens to approved bidders within Google AdX based on the publisher's preferences.

## Allow Secure Signals Sharing

For your Google Ad Manager account to be eligible to receive encrypted EUID tokens, you must make sure that encrypted signals are properly shared with third-party bidders on your Google Ad Manager account.

For details, see [Share encrypted signals with bidders](https://support.google.com/admanager/answer/10488752) in the Google documentation, and then follow the steps in [Use a third-party signal provider](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/securesignals) to switch on EUID as your signal provider.

:::important
When you're following the steps, in [Select allowed secure signals](https://support.google.com/admanager/answer/10488752#select-signals), under **Web Signal Deploy Option**, choose **Google Deploy**. If you're using Prebid.js, see [Optional: Enable Secure Signals in Prebid.js](#optional-enable-secure-signals-in-prebidjs).
:::

### Optional: Enable Secure Signals in Prebid.js

If you want to use Secure Signals with Prebid.js, you must complete both these additional steps so that your EUIDs are correctly processed:

1. In Google Ad Manager, when you're making sure that encrypted signals are properly shared with third-party bidders: Choose the **Prebid User ID Module**, and then also choose **Use your Prebid configuration to automatically configure your Secure signals settings**. Before saving your configuration, double-check that you've selected the correct option.

1. In your Prebid.js setup: update the `encryptedSignalSources` section in your Prebid configuration, as shown in the following code:

   ```
   "encryptedSignalSources": {
     "sources":[
       {
         "source":[
           "euid.eu"
         ],
         "encrypt":false
       }
     ]
   }
   ```

   For details, see [ESP Configurations](https://docs.prebid.org/dev-docs/modules/userId.html#esp-configurations) in the Prebid documentation.

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Publisher Integration

When an encrypted signal is cached, the secure signals feature does not execute the handler to generate a new signal. Because of this, it is necessary to clear the cache before and after data capture.

Since the secure signals feature does not provide a way to delete or invalidate a specific ID, publishers must call the `window.googletag.secureSignalProviders.clearAllCache()` function to clear all shared encrypted signals as part of their data capture workflows.

The following is an example of calling the `window.googletag.secureSignalProviders.clearAllCache()` function:

```
window.googletag = window.googletag || { cmd: [] };
window.googletag.cmd.push(function () {
  window.googletag.secureSignalProviders =
    window.googletag.secureSignalProviders || [];
  window.googletag.secureSignalProviders.clearAllCache();
});
```

There are three integration options for Google Secure Signals publisher integration with EUID:
- [Server-Side Integration](#server-side-integration)
- [SDK for JavaScript Client-Server Integration](#sdk-for-javascript-client-server-integration)
- [SDK for JavaScript Client-Side Integration](#sdk-for-javascript-client-side-integration)

### Server-Side Integration

So that it can share encrypted signals, the hosted auto-loaded secure signals script must be able to make an asynchronous call to the `window.getEuidAdvertisingToken` function and, in response, receive `advertising_token` as a string.

It's important to make sure that the identity token is fresh. For a server-side integration, we recommend making a call to the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint to get a fresh [advertising token](../endpoints/post-token-refresh.md#decrypted-json-response-format) from the JSON response.

The following code is an example of how you could do this.

```
window.getEuidAdvertisingToken = async () => {
  // Make a call to get a fresh identity token which could last for at least 12 hours.
  const identity = await getFreshIdentity()
  return JSON.parse(decodeURIComponent(identity)).advertising_token
}
```

For details, see [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md).

<!-- A sample implementation is also available for server-side integration. See [Sample Implementations](#sample-implementations). -->

### SDK for JavaScript Client-Server Integration

If you're using the SDK for JavaScript version 3.4.5 or later, the EUID secure signals script uses the `getAdvertisingTokenAsync` function provided in the SDK to get the fresh advertising token, and then pushes the token to Google Ad Manager.

This script is hosted on CDN, and GPT automatically loads it with the secure signals feature. 

For details, see [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md).

<!-- A sample implementation is also available for integration using the SDK for JavaScript. See [Sample Implementations](#sample-implementations). -->

### SDK for JavaScript Client-Side Integration

If you're using the SDK for JavaScript version 3.4.5 or later, the EUID secure signals script uses the `getAdvertisingTokenAsync` function provided in the SDK to get the fresh advertising token, and then pushes the token to Google Ad Manager.

<!-- (UID2/EUID diff re JS SDK ver at 20240813 UID2 3.0.0 EUID 3.4.0. 170 | 20240904 EUID 3.4.5) -->

This script is hosted on CDN, and GPT automatically loads it with the secure signals feature. 

For details, see [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md).

<!-- A sample implementation is also available for integration using the SDK for JavaScript. See [Sample Implementation](#sample-implementation). -->

## Sample Implementation

The following sample implementation is available to illustrate how to integrate with the Google Ad Manager secure signals feature:

- Client-Side EUID SDK Integration Example:
  - [Sample implementation](https://euid.eu/examples/cstg-secure-signals-example/)
  - [Code repository](https://github.com/European-Unified-ID/EUID-docs/tree/main/static/examples/cstg-secure-signals-example)

<!-- EUID Server-Side SDK integration example to come. gwh 12/9/24. And client-server. gwh 1/29/25. -->

Each sample implementation has its own instructions.

## Troubleshooting

Here is some troubleshooting information that might help you in working with Google Secure Signals for your EUID integration:

- [I enabled Secure Signals within Google Ad Manager, but EUIDs are not being passed through Google](#i-enabled-secure-signals-within-google-ad-manager-but-euids-are-not-being-passed-through-google)

#### I enabled Secure Signals within Google Ad Manager, but EUIDs are not being passed through Google

In some cases, after choosing Secure Signals within Google Ad Manager, successful EUIDs were not being passed through Google because the participant had an incorrect **Web Signal Deployment Method** configuration.

If your EUIDs are not being passed through Google, make sure that you chose the correct Web Signal Deployment Method during setup.

For details, see the **Important** note in [Allow Secure Signals Sharing](#allow-secure-signals-sharing).
