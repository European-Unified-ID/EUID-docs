[EUID Overview](../../../README.md) > [Getting Started -- Summary](../getting-started/gs-summary.md) > [v2](../summary-doc-v2.md) > [Integration Guides](README.md) > EUID Client-Side Integration Guide for Prebid.js

<!-- ---
title: EUID Client-Side Integration Guide for Prebid.js
sidebar_label: Client-Side Integration for Prebid.js
pagination_label: EUID Client-Side Integration for Prebid.js
description: Information about setting up a client-side Prebid.js integration.
hide_table_of_contents: false
sidebar_position: 04
--- -->

# EUID Client-Side Integration Guide for Prebid.js

This guide is for publishers who have access to personal data<!-- [personal data](../ref-info/glossary-uid.md#gl-personal-data) --> (email address) on the client side and want to integrate with EUID and generate EUID tokens<!-- [EUID tokens](../ref-info/glossary-uid.md#gl-euid-token) --> (advertising tokens) to be passed by Prebid.js in the RTB bid stream.

To integrate with EUID using Prebid.js, you'll need to make changes to the HTML and JavaScript on your site. No server-side work is required if you follow this guide.

<!-- 
This guide includes the following information:

- [Prebid.js Version](#prebidjs-version)
- [Integration Example](#integration-example)
- [Integration Overview: High-Level Steps](#integration-overview-high-level-steps)
   - [Complete EUID Account Setup](#complete-euid-account-setup)
   - [Add Prebid.js to Your Site](#add-prebidjs-to-your-site)
   - [Configure the EUID Module](#configure-the-euid-module)
- [Storing the EUID Token in the Browser](#storing-the-euid-token-in-the-browser)
- [When to Pass Personal Data to the EUID Module](#when-to-pass-personal-data-to-the-euid-module)
- [Checking the Integration](#checking-the-integration)
 -->

## Prebid.js Version

This implementation requires a recent version of Prebid.js. Information on the specific version will be available shortly.

<!-- GWH_TBD This implementation requires Prebid.js version 8.21.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases). -->

If you need to use an earlier version of Prebid.js, use the implementation solution presented in the [EUID Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) instead.

<!-- ## Integration Example -->

<!-- GWH_TBD re integration examples. -->

<!-- An example of the EUID Prebid.js client-side integration is available at the following links:

- Code: [Example Prebid.js EUID Integration](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- Running site: [EUID Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/) -->

## Integration Overview: High-Level Steps

You'll need to complete the following steps:

1. [Complete EUID account setup](#complete-euid-account-setup).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the EUID module](#configure-the-euid-module).


### Complete EUID Account Setup

Complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page. As part of the account setup process for a client-side implementation, you'll need to provide a list of domain names for the sites that you'll be using with Prebid.js.

>TIP: Only root-level domains are required for account setup. For example, if you're going to use EUID with Prebid.js on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.


When account setup is complete, you'll receive a public key and subscription ID. These values are unique to you, and you'll use them to configure the EUID module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key).

### Add Prebid.js to Your Site

To add Prebid.js to your site, follow the instructions in [Getting Started for Developers](https://docs.prebid.org/dev-docs/getting-started.html) in the Prebid.js documentation. 

When you download the Prebid.js package, add the EUID module by checking the box next to the module named **European Unified ID**, listed under the section **User ID Modules**.

When you've added Prebid.js to your site and confirmed that it's working properly, you're ready to configure the EUID module.

>TIP: To make sure that the EUID module is installed, find the string `euidIdSystem` in the [`pbjs.installedModules` array](https://docs.prebid.org/dev-docs/publisher-api-reference/installedModules.html).

### Configure the EUID Module

To configure the EUID module, call `pbjs.setConfig` with an object containing the **public key** and **subscription ID** that you received during account setup, as well as the user's hashed or unhashed email address.

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

>NOTE: This example assumes that you're using the EUID production environment. During integration testing, use the EUID integration environment by setting `params.euidApiBase` to `'https://integ.euid.eu/'`. Tokens from the EUID integration environment are not valid for passing to the bid stream. For the integration environment, you will have different **subscription ID** and **public key** values.

## Storing the EUID Token in the Browser

By default, the EUID module stores data using local storage. To use a cookie instead, set `params.storage` to `cookie`, as shown in the following example.

For details, see [European Unified ID Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/euid.html#european-unified-id-configuration) in the Prebid documentation.

```js
pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'euid', 
      params: { 

                 //default value is ‘localStorage’ 
        storage: ‘cookie’  
      } 
    }] 
  } 
}); 
```

The cookie size can be significant, which could be a problem. However, if local storage is not an option, this is one possible approach.

## When to Pass Personal Data to the EUID Module

When the EUID module is configured, it checks for an existing EUID token in the user's browser. If there is a token that was generated from the same personal data, and either it's still valid or it can be refreshed, the module uses it, and refreshes if needed.

If there is no existing token, or the token has expired and cannot be refreshed, the EUID module cannot generate a new token without personal data.

>TIP: Configure the EUID module with the user's personal data on each page load. This is the recommended approach.

In some cases, the user's personal data is not available on page load, and getting the personal data has some associated cost. For example, an API call might be required to fetch the personal data, or the user has to be prompted to provide the personal data.

If the EUID token has expired and cannot be refreshed, you must configure the EUID module with personal data to generate a new token. To do this, check the value returned by `pbjs.getUserIds().euid`, as shown in the following example:

```js
const params = {}; 
 
if (!pbjs.getUserIds().euid || pbjs.getUserIds().euid.optout) {
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

To check that the EUID module has successfully generated an EUID token, call `pbjs.getUserIds().euid`. There are two possible response value scenarios:

- Response value `pbjs.getUserIds().euid`: A valid EUID token exists in the EUID module.
- Response value `pbjs.getUserIds().euid.optout`: The user has opted out. The `.euid` exists but it does not have the form of a token response, and cannot be used for targeted advertising.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Check the values for **subscription ID** and **public key**:
  - Make sure they are exactly the same values that you received from the EUID team.
  - Check that you have the correct values for the environment you're using. You'll have different **subscription ID** and **public key** values for each [environment](../getting-started/gs-environments.md).
- Check that you provided the domain name of the site to the EUID team during account setup. If needed, to confirm, ask your EUID contact.
- Use the browser developer tools to inspect the API calls to the EUID service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

An example of a tool for validating and debugging Prebid.js configuration is Professor Prebid, an open-source Chrome extension:

- Chrome web store download location: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- Documentation on prebid.org: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

<!-- Reduce Latency by Setting the API Base URL for the Production Environment not applicable for EUID -->
