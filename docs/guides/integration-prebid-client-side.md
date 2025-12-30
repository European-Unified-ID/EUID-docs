---
title: EUID Client-Side Integration Guide for Prebid.js
sidebar_label: Client-Side Integration for Prebid.js
pagination_label: EUID Client-Side Integration for Prebid.js
description: Information about setting up a client-side Prebid.js integration.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptIntegratingWithSSO from '../snippets/_snpt-integrating-with-sso.mdx';
import SnptAddPrebidjsToYourSite from '../snippets/_snpt-prebid-add-prebidjs-to-your-site.mdx';
import SnptStoreEUIDTokenInBrowser from '../snippets/_snpt-prebid-storing-euid-token-in-browser.mdx';

# EUID Client-Side Integration Guide for Prebid.js

This guide is for publishers who have access to <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> (email address or phone number) on the client side and want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) to be passed by Prebid.js in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

To integrate with EUID using Prebid.js, you'll need to make changes to the HTML and JavaScript on your site. No server-side work is required if you follow this guide.

## Prebid.js Version

This implementation requires Prebid.js version 8.42.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

<!-- Diff in Prebid.js supported version for UID2/EUID is fine: verif SS 11/19/24 -->

If you need to use an earlier version of Prebid.js, use the implementation solution presented in the [EUID Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) instead.

## Integrating with Single Sign-On (SSO)

<SnptIntegratingWithSSO />

## Integration Overview: High-Level Steps

You'll need to complete the following steps:

1. [Complete EUID account setup](#complete-euid-account-setup).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the EUID module](#configure-the-euid-module).

### Complete EUID Account Setup

Complete the EUID account setup by following the steps described on the [Account Setup](../getting-started/gs-account-setup.md) page. As part of the account setup process for a client-side implementation, you'll need to provide a list of domain names for the sites that you'll be using with Prebid.js.

:::tip
Only root-level domains are required for account setup. For example, if you're going to use EUID with Prebid.js on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

When account setup is complete, you'll receive a client keypair consisting of two values that identify you to the EUID servers: Subscription ID and public key. These values are unique to you, and you'll use them to configure the EUID module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key).

:::note
If you want to use the integration environment as well as the production environment, you'll need a separate set of credentials for each environment. For details, see [EUID Credentials](../getting-started/gs-credentials.md) and [Environments](../getting-started/gs-environments.md).
:::

### Add Prebid.js to Your Site

<SnptAddPrebidjsToYourSite />

### Configure the EUID Module

To configure the EUID module, call `pbjs.setConfig` with an object containing the **public key** and **Subscription ID** that you received during account setup, as well as the user's hashed or unhashed email address.

Once it's configured, the EUID module generates an EUID token for the user and stores it in the user's browser. The module automatically refreshes the token as needed as long as your site is open in the user's browser.

You can configure the EUID module using any one of these accepted personal data formats, for any specific user:

- Normalized or un-normalized email address
- Normalized, hashed, and Base64-encoded email address
- Normalized phone number
- Normalized, hashed, and Base64-encoded phone number

Notes:

- The personal data format might vary per user, but you can only send one value per user.
- If you want to pass the personal data to the module already hashed, follow this sequence:
  1. First normalize.
  1. Then hash the result using the SHA-256 hashing algorithm.
  1. Then encode the resulting bytes of the hash value using Base64 encoding.
  
  For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md). For an example, see [Configuring the EUID Module: Code Example](#configuring-the-euid-module-code-example).
- The EUID module encrypts the hashed personal data before sending it to the EUID service.
- If the module is configured multiple times, it uses the most recent configuration values.

#### Configuring the EUID Module: Code Example

The following code snippet demonstrates the different ways that you can configure the EUID module.

```js
const baseConfig = {
  userSync: {
    userIds: [{
      name: 'euid',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        // Choose only one of the following: email, emailHash, phone, or phoneHash
        email: 'user@example.com', // Normalized or non-normalized, unhashed email address
        // emailHash: 'tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=', // Normalized, hashed, and encoded email address
        // phone: '+12345678901', // Normalized phone number
        // phoneHash: 'EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=', // Normalized, hashed, and encoded phone number
      }
    }]
  }
};
```

:::note
This example assumes that you're using the EUID production environment. During integration testing, use the EUID integration environment by setting `params.euidApiBase` to `'https://integ.euid.eu/'`. Tokens from the EUID integration environment are not valid for passing to the bidstream. For the integration environment, you will have different **Subscription ID** and **public key** values.
:::

## Storing the EUID Token in the Browser

<SnptStoreEUIDTokenInBrowser />

## When to Pass Personal Data to the EUID Module

When the EUID module is configured, it checks for an existing EUID token in the user's browser. If there is a token that was generated from the same personal data, and either it's still valid or it can be refreshed, the module uses it, and refreshes if needed.

If there is no existing token, or the token has expired and cannot be refreshed, the EUID module cannot generate a new token without personal data.

:::tip
Configure the EUID module with the user's personal data on each page load. This is the recommended approach.
:::

In some cases, the user's personal data is not available on page load, and getting the personal data has some associated cost. For example, an API call might be required to fetch the personal data, or the user has to be prompted to provide the personal data.

If the EUID token has expired and cannot be refreshed, you must configure the EUID module with personal data to generate a new token. To do this, check the value returned by `pbjs.getUserIds().euid`, as shown in the following example:

```js
const params = {}; 
 
if (!pbjs.getUserIds().euid) {
  // There is no token that can be used or refreshed. 
  // The EUID module must be configured with personal data to generate a new token. 
  params.email = getUserEmail(); 
  params.serverPublicKey = publicKey; 
  params.subscriptionId = subscriptionId; 
} 

pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'euid', 
      params: params 
    }] 
  } 
}); 
```

It is possible that the user has opted out of EUID previously. In this case, the EUID module respects the user's optout and no EUID token is generated and collected by Prebid.js.

## Checking the Integration

To check that the EUID module has successfully generated an EUID token, call `pbjs.getUserIds().euid`. If a value is returned, a valid EUID token exists in the EUID module.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Check the values for **Subscription ID** (**subscriptionId** value) and **public key** (**serverPublicKey** value):
  - Make sure they are exactly the same values that you received from the EUID team.
  - Check that you have the correct values for the environment you're using. You'll have different **Subscription ID** and **public key** values for each [environment](../getting-started/gs-environments.md).
- Check that you provided the domain name of the site to the EUID team during account setup. If needed, to confirm, ask your EUID contact.
- Use the browser developer tools to inspect the API calls to the EUID service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

An example of a tool for validating and debugging Prebid.js configuration is Professor Prebid, an open-source Chrome extension:

- Chrome web store download location: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- Documentation on prebid.org: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

<!-- Reduce Latency by Setting the API Base URL for the Production Environment not applicable for EUID -->

## Optional: Deferred Client-Side EUID Configuration with mergeConfig

If you already have Prebid.js configured but didn't include EUID in the initial setup, you can still add the EUID module using two functions provided by Prebid.js:

- [mergeConfig()](https://docs.prebid.org/dev-docs/publisher-api-reference/mergeConfig.html): Merges new configuration into the existing Prebid config without overwriting other settings. Use this to add the EUID module to your existing `userSync.userIds` array.
- [refreshUserIds()](https://docs.prebid.org/dev-docs/publisher-api-reference/refreshUserIds.html): Reruns the user ID submodules to fetch the latest IDs. Call this after `mergeConfig()` to trigger EUID token generation.

You still pass the same configuration information as described above (API base URL, credentials, and personal data) so that Prebid can handle the entire EUID token lifecycle:

```js
// Step 1: Define the EUID configuration
const euidConfig = {
  userSync: {
    userIds: [{
      name: 'euid',
      params: {
        euidApiBase: 'https://integ.euid.eu/',
        email: 'user@example.com',
        subscriptionId: subscriptionId,
        serverPublicKey: publicKey
      }
    }]
  }
};

// Step 2: Merge EUID config into existing Prebid config (additive, won't overwrite)
pbjs.mergeConfig(euidConfig);

// Step 3: Trigger user ID refresh to generate the token
await pbjs.refreshUserIds({ submoduleNames: ['euid'] });
```

:::note
Once you add EUID to your configuration, Prebid does not provide functionality to remove individual submodules without overwriting the entire `userIds` array. For client-side integrations where Prebid has access to the EUID token in localStorage, it is important to clear localStorage where the token is stored after the user logs out and reload the page to clear caches. This prevents future bid requests from using the identity.

If you are managing the EUID SDK separately, use `window.__euid.disconnect()` which handles all logout functionality—clearing both memory and storage—without requiring a page refresh.
:::

### Deferred Client-Side Integration Example

A sample implementation for deferred configuration is also available. For details, see [Sample Implementations](#sample-implementations).

## Optional: Prebid.js Integration with Google Secure Signals

if you're using Prebid.js, and you're planning to pass EUID tokens to Google using Google Secure Signals, there are a couple of additional configuration steps:

- In your Google Ad Manager account, make sure that encrypted signals are properly shared with third-party bidders: see [Allow Secure Signals Sharing](integration-google-ss.md#allow-secure-signals-sharing).
- Update your Prebid.js configuration: see [Optional: Enable Secure Signals in Prebid.js](integration-google-ss.md#optional-enable-secure-signals-in-prebidjs).

A sample implementation for Prebid.js with Secure Signals is also available. For details, see [Sample Implementations](#sample-implementations).

## Sample Implementations

The following sample implementations are available to illustrate how to integrate EUID with Prebid.js on the client side:

- Client-side integration example using Prebid.js:
  - Site: [Client-Side EUID Integration with Prebid.js](https://prebid-client.samples.integ.euid.eu/)
  - Code: [uid2-examples/web-integrations/prebid-integrations/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side)
- Deferred client-side integration example using Prebid.js:
  - Site: [Deferred Client-Side EUID Integration with Prebid.js](https://prebid-deferred.samples.integ.euid.eu/)
  - Code: [uid2-examples/web-integrations/prebid-integrations/client-side-deferred](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side-deferred)
- Client-side integration example using Prebid.js with Google Secure Signals:
  - Site: [Client-Side EUID Integration with Prebid.js (with Google Secure Signals)](https://prebid-secure-signals.samples.integ.euid.eu/)
  - Code: [uid2-examples/web-integrations/prebid-secure-signals](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-secure-signals)

Each sample implementation has its own instructions.
