---
title: EUID Client-Side Integration Guide for Prebid.js
sidebar_label: Client-Side Integration for Prebid.js
pagination_label: EUID Client-Side Integration for Prebid.js
description: Information about setting up a client-side Prebid.js integration.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import AddPrebidjsToYourSite from '/docs/snippets/_prebid-add-prebidjs-to-your-site.mdx';
import StoreEUIDTokenInBrowser from '/docs/snippets/_prebid-storing-euid-token-in-browser.mdx';

# EUID Client-Side Integration Guide for Prebid.js

This guide is for publishers who have access to <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> (email address) on the client side and want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) to be passed by Prebid.js in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

To integrate with EUID using Prebid.js, you'll need to make changes to the HTML and JavaScript on your site. No server-side work is required if you follow this guide.

## Prebid.js Version

This implementation requires Prebid.js version 8.42.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

If you need to use an earlier version of Prebid.js, use the implementation solution presented in the [EUID Client-Server Integration Guide for Prebid.js](integration-prebid-server-side.md) instead.

## Integration Example

An example of the EUID Prebid.js client-side integration is available at the following links:

- Code: [Example Prebid.js EUID Integration](https://github.com/European-Unified-ID/EUID-docs/tree/main/static/examples/cstg-prebid-example)
- Running site: [EUID Prebid.js Client-Side Integration Example](https://euid.eu/examples/cstg-prebid-example/)

## Integration Overview: High-Level Steps

You'll need to complete the following steps:

1. [Complete EUID account setup](#complete-euid-account-setup).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the EUID module](#configure-the-euid-module).


### Complete EUID Account Setup

Complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page. As part of the account setup process for a client-side implementation, you'll need to provide a list of domain names for the sites that you'll be using with Prebid.js.

:::tip
Only root-level domains are required for account setup. For example, if you're going to use EUID with Prebid.js on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

When account setup is complete, you'll receive a public key and Subscription ID. These values are unique to you, and you'll use them to configure the EUID module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key).

### Add Prebid.js to Your Site

<AddPrebidjsToYourSite />

### Configure the EUID Module

To configure the EUID module, call `pbjs.setConfig` with an object containing the **public key** and **Subscription ID** that you received during account setup, as well as the user's hashed or unhashed email address.

Once it's configured, the EUID module generates an EUID token for the user and stores it in the user's browser. The module automatically refreshes the token as needed as long as your site is open in the user's browser.

You can configure the EUID module using any one of these accepted personal data formats, for any specific user:

- Normalized or un-normalized email address
- Normalized and hashed email address

Notes:

- The personal data format might vary per user, but you can only send one value per user.
- If the module is configured multiple times, it uses the most recent configuration values.
- If you want to pass the personal data to the module already hashed, remember to normalize it before hashing. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).
- The EUID module encrypts the hashed personal data before sending it to the EUID service.

The following code snippet demonstrates the different ways that you can configure the EUID module.

```js
const baseConfig = {
  userSync: {
    userIds: [{
      name: 'euid',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        // Choose only one of the following: email or emailHash
        email: 'user@example.com', // Normalized or non-normalized, unhashed email address
        // emailHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=', // Normalized and hashed email address
      }
    }]
  }
};
```

:::note
This example assumes that you're using the EUID production environment. During integration testing, use the EUID integration environment by setting `params.euidApiBase` to `'https://integ.euid.eu/'`. Tokens from the EUID integration environment are not valid for passing to the bidstream. For the integration environment, you will have different **Subscription ID** and **public key** values.
:::

## Storing the EUID Token in the Browser

<StoreEUIDTokenInBrowser />

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

## Checking the Integration

To check that the EUID module has successfully generated an EUID token, call `pbjs.getUserIds().euid`. If a value is returned, a valid EUID token exists in the EUID module.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Check the values for **Subscription ID** and **public key**:
  - Make sure they are exactly the same values that you received from the EUID team.
  - Check that you have the correct values for the environment you're using. You'll have different **Subscription ID** and **public key** values for each [environment](../getting-started/gs-environments.md).
- Check that you provided the domain name of the site to the EUID team during account setup. If needed, to confirm, ask your EUID contact.
- Use the browser developer tools to inspect the API calls to the EUID service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

An example of a tool for validating and debugging Prebid.js configuration is Professor Prebid, an open-source Chrome extension:

- Chrome web store download location: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- Documentation on prebid.org: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

<!-- Reduce Latency by Setting the API Base URL for the Production Environment not applicable for EUID -->
