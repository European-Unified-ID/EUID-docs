---
title: Google Ad Manager Secure Signals Integration
sidebar_label: GAM Secure Signals
pagination_label: Google Ad Manager Secure Signals Integration
description: Covers integration steps for publishers using EUID with the Google Ad ManagerSecure Signals feature.
hide_table_of_contents: false
sidebar_position: 10
---

import Link from '@docusaurus/Link';

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

For details, see [Share encrypted signals with bidders](https://support.google.com/admanager/answer/10488752) (Google reference documentation) and then follow the steps in [Use a third-party signal provider](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/securesignals) to switch on EUID as your signal provider.

:::important
When you're following the steps, in [Select allowed secure signals](https://support.google.com/admanager/answer/10488752#select-signals), under **Web Signal Deploy Option**, choose **Google Deploy**.
If you choose the **Prebid User ID Module**, your EUIDs will not be correctly processed unless you also choose the **Use your Prebid configuration to automatically configure your Secure signals settings** field.
Before saving your configuration, double-check that you've selected the correct option.
:::

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

<!-- A sample application is also available for server-side integration. See [Sample Applications](#sample-applications). -->

### SDK for JavaScript Client-Side Integration

If you're using the SDK for JavaScript version 3.4.5 or later, the EUID secure signals script uses the `getAdvertisingTokenAsync` function provided in the SDK to get the fresh advertising token, and then pushes the token to Google Ad Manager.

<!-- (UID2/EUID diff re JS SDK ver at 20240813 UID2 3.0.0 EUID 3.4.0. 170 | 20240904 EUID 3.4.5) -->

This script is hosted on CDN, and GPT automatically loads it with the secure signals feature. 

For details, see [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md).

<!-- A sample application is also available for integration using the SDK for JavaScript. See [Sample Applications](#sample-applications).

## Sample Applications

The following sample applications are available to illustrate how to integrate with the Google Ad Manager secure signals feature:

- Server-Side EUID Integration Example:
  - [Sample application](https://secure-signals-srvonly-integ.uidapi.com/)
  - [Code repository](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/server_only)
- Client-Server EUID SDK Integration Example:
  - [Sample application](https://euid.eu/examples/cstg-js-sdk-example/)
  - [Code repository](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/with_sdk_v3)

Each sample application has its own instructions. -->

<!-- (170 I'll make a ticket to consider an EUID version of the sample.) -->

## Troubleshooting Tips for EUID Integration with Google Secure Signals

Here is some troubleshooting info that might help you in working with Google Secure Signals for your EUID integration:

- [I enabled Secure Signals within Google Ad Manager, but EUIDs are not being passed through Google](#i-enabled-secure-signals-within-google-ad-manager-but-euids-are-not-being-passed-through-google)

#### I enabled Secure Signals within Google Ad Manager, but EUIDs are not being passed through Google

In some cases, after choosing Secure Signals within Google Ad Manager, successful EUIDs were not being passed through Google because the participant had an incorrect **Web Signal Deployment Method** configuration.

If your EUIDs are not being passed through Google, make sure that you chose the correct Web Signal Deployment Method during setup.

For details, see the **Important** note in [Allow Secure Signals Sharing](#allow-secure-signals-sharing).