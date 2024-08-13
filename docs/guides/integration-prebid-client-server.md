---
title: Client-Server Integration Guide for Prebid.js
sidebar_label: Client-Server Integration for Prebid.js
pagination_label: EUID Client-Server Integration for Prebid.js
description: Information about setting up a server-side Prebid.js integration.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import AddPrebidjsToYourSite from '/docs/snippets/_prebid-add-prebidjs-to-your-site.mdx';
import StoreEUIDTokenInBrowser from '/docs/snippets/_prebid-storing-euid-token-in-browser.mdx';

# Client-Server Integration Guide for Prebid.js

This guide is for publishers who have access to <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> on the server side and want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) to be passed by Prebid.js in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

This is called client-server integration because some integration steps are client-side and some are server-side.

To integrate with EUID using Prebid.js, you'll need to:

- Make changes to the HTML and JavaScript on your site.
- Make server-side changes for token generation (and, optionally, token refresh).  

## Prebid.js Version
This implementation requires Prebid.js version 7.53.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

## EUID Prebid Module Page

Information about how to integrate Prebid with EUID is also in the following locations:
- On the Prebid site, on the [European Unified ID](https://docs.prebid.org/dev-docs/modules/userid-submodules/euid.html) page for the Prebid User ID submodule.
- In the Prebid GitHub repository, on the [EUID User ID Submodule](https://github.com/prebid/Prebid.js/blob/master/modules/euidIdSystem.md) page.

## Integration Overview: High-Level Steps

You'll need to complete the following steps:

1. [Complete EUID account setup](#complete-euid-account-setup).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the EUID module](#configure-the-euid-module).

## Complete EUID Account Setup

Complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

When account setup is complete, you'll receive your unique API key and client secret. These values are unique to you and it's important to keep them secure. For details, see [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret).

## Add Prebid.js to Your Site

<AddPrebidjsToYourSite />

## Configure the EUID Module

You'll need to configure the EUID Prebid module to complete the following two actions:

| Step | Action | Link to Instructions |
| --- | --- | --- |
| 1 | Send a server-side API call to generate an EUID token.  | [Generating an EUID Token on the Server](#generating-an-euid-token-on-the-server) |
| 2 | Store the response value, so that the Prebid module can manage token refresh as well as opt-out if needed. | [Refreshing an EUID Token](#refreshing-an-euid-token) |

### Generating an EUID Token on the Server


For a client-server EUID integration for Prebid, the first step is to generate the EUID token on your server. Then, you can pass the token to Prebid for sending to the RTB bidstream.

For details, including instructions and examples, see [Server-Side Token Generation](../ref-info/ref-server-side-token-generation.md).

To generate a token, call one of the SDKs or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint. For an example of the API response, showing the token, see [Sample Token](#sample-token). You will need to pass the `Identity` response to Prebid.

:::warning
For security reasons, the API key and secret used in token generation must be called server-side. Do not store these values as part of your Prebid implementation.
:::

### Refreshing an EUID Token

There are two ways to refresh an EUID token, as shown in the following table.

| Mode | Description | Link to Section | 
| --- | --- | --- |
| Client refresh mode | Prebid.js automatically refreshes the tokens internally.<br/>This is the simplest approach. | [Client Refresh Mode](#client-refresh-mode) |
| Server-only mode | Prebid.js doesn't automatically refresh the token. It is up to the publisher to manage token refresh.<br/>Examples of why you might want to choose this option:<ul><li>If you want to use the [SDK for JavaScript](../sdks/sdk-ref-javascript.md) to refresh the token, and Prebid.js to send the token to the bidstream.</li><li>If you want to send the token to the bidstream via multiple avenues (such as Prebid.js and also Google).</li></ul> | [Server-Only Mode](#server-only-mode) |

### Client Refresh Mode

You must provide the Prebid module with the full JSON response body from the applicable endpoint:

- [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) for a new EUID token.
- [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) for a refreshed EUID token.

For an example, see [Sample Token](#sample-token).

As long as the refresh token remains valid, the EUID Prebid module refreshes the EUID token as needed.

This section includes the following information:
- [Client Refresh Mode Response Configuration Options](#client-refresh-mode-response-configuration-options)
- [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example)
- [Client Refresh Mode euidToken Example](#client-refresh-mode-euidtoken-example)
- [Passing a New Token: Client Refresh Mode](#passing-a-new-token-client-refresh-mode)

#### Client Refresh Mode Response Configuration Options

When you configure the module to use Client Refresh mode, you must choose **one** of the following options for providing the token to the Prebid module.

| Option | Details | Use Case | 
| --- | --- | --- |
| Set `params.euidCookie` to the name of the cookie that contains the response body as a JSON string. | See [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example) | Use this option only if you're sure that there is enough space left in your cookie to store the response body. If you're not sure, or the cookie storage needs might vary, choose the other option. |
| Set `params.euidToken` to the response body as a JavaScript object. | See [Client Refresh Mode euidToken Example](#client-refresh-mode-euidtoken-example) | You might choose to provide the response body via `params.euidToken` in either of these cases:<ul><li>If you are already storing a lot of data in the cookie and adding the response body might exceed the cookie size limit.</li><li>If you prefer to have the Prebid module store the token value for you.</li></ul> |

#### Client Refresh Mode Cookie Example

In Client Refresh mode, Prebid.js takes care of refreshing the token. To do this, you must configure it to store the token. The following example shows the cookie and also the configuration for storing the token in a cookie called `euid_pub_cookie`.

Cookie:

```
euid_pub_cookie={"advertising_token":"...advertising token...","refresh_token":"...refresh token...","identity_expires":1684741472161,"refresh_from":1684741425653,"refresh_expires":1684784643668,"refresh_response_key":"...response key..."}
```

Configuration:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'euid',
      params: {
        euidCookie: 'euid_pub_cookie'
      }
    }]
  }
});
```

For an example of the token, see [Sample Token](#sample-token).

#### Client Refresh Mode euidToken Example

The following example shows a sample configuration. For the contents of the token, see [Sample Token](#sample-token).

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'euid',
      params: {
        euidToken: {
          'advertising_token': '...advertising token...',
          'refresh_token': '...refresh token...',
          // etc. - see the sample token for contents of this object
        }
      }
    }]
  }
});
```

#### Passing a New Token: Client Refresh Mode

If the refresh token expires, you'll need to supply a new token response so that a new advertising token and a new refresh token are available for future refreshes. 

For information on how to determine if you need to provide a new token, see [Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token).

### Server-Only Mode

In server-only mode, only the advertising token is provided to the module. The module cannot refresh the token. You are responsible for implementing a way to refresh the token.

To configure the module to use server-only mode, do **one** of the following:

| Implementation Method | Link to Example |
| --- | --- |
| Set a cookie named `__euid_advertising_token` and store the advertising token value in it. | [Server-Only Mode Cookie Example](#server-only-mode-cookie-example) |
| Set `value` to an ID block containing the advertising token. | [Server-Only Mode Value Example](#server-only-mode-value-example) |

This section includes the following information:
- [Server-Only Mode Cookie Example](#server-only-mode-cookie-example)
- [Server-Only Mode Value Example](#server-only-mode-value-example)
- [Passing a New Token: Server-Only Mode](#passing-a-new-token-server-only-mode)

#### Server-Only Mode Cookie Example

The following example stores the advertising token value in a cookie named `__euid_advertising_token`. The configuration allows the EUID module to retrieve the advertising token value from the cookie.

Cookie:

```js
__euid_advertising_token=...advertising token...
```

Configuration:

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'euid'
        }]
    }
});
```

#### Server-Only Mode Value Example

The following example sets the `value` field to an ID block containing the advertising token without storing it in a cookie.

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'euid'
            value: {
                'euid': {
                    'id': '...advertising token...'
                }
            }
        }]
    }
});
```

#### Passing a New Token: Server-Only Mode

In server-only mode, since the Prebid.js EUID module receives only the advertising token, the token is only valid for a short period of time. For this reason, it's best to provide an advertising token on each page load.

If needed, to determine if you need to provide a new token, see [Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token).

## Prebid Implementation Notes and Tips

In planning your Prebid implementation, consider the following:

- The module stores the original token provided to it, refreshes it as needed, and uses the refreshed token. If you provide an expired identity, and the module has a valid update from refreshing the same identity, the module uses the refreshed identity in place of the expired one you provided.

- If you provide a new token that doesn't match the original token used to generate any refreshed tokens, the module discards all stored tokens and uses the new token instead, and keeps it refreshed.

- During integration testing, set `params.euidApiBase` to `"https://integ.euid.eu/"`. You must set this value to the same environment (production or integration) that you use for generating tokens.

- For a Prebid.js client-server integration, you can create a smaller Prebid.js build by disabling client-side integration functionality. To do this, pass the `--disable UID2_CSTG` flag:

```
    $ gulp build --modules=euidIdSystem --disable UID2_CSTG
```

## Storing the EUID Token in the Browser

<StoreEUIDTokenInBrowser />

## Determining Whether the Module Has a Valid Token

You can do a check to determine whether the Prebid.js module has a valid token or you need to provide a new one.

To do this, check the value returned by `pbjs.getUserIds().euid`, as shown in the following example:

```js
if (!pbjs.getUserIds().euid) {
  // There is no token that can be used or refreshed.
  // Configure the EUID module with a new token
  pbjs.setConfig({
      userSync: {
          userIds: [{
              name: 'euid',
              params: {
                  euidToken: {
                      'advertising_token': '...advertising token...',
                      'refresh_token': '...refresh token...',
                      // etc. - see the sample token for contents of this object
                  }
              }
          }]
      }
  });  
}
```

:::caution
If you configure a user ID by calling `setConfig` (or any similar function) twice, you will need to call `refreshUserIds` for the user ID submodules, to reinitialize their ID values.
:::

## Checking the Integration

To check that the EUID module has a valid EUID token, call `pbjs.getUserIds().euid`. If a value is returned, a valid EUID token exists in the EUID module.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Use the browser developer tools to inspect the API calls to the EUID service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

An example of a tool for validating and debugging Prebid.js configuration is Professor Prebid, an open-source Chrome extension:

- Chrome web store download location: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- Documentation on prebid.org: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Configuration Parameters for userSync

The following parameters apply only to the EUID Prebid User ID Module integration.

In this table, CR = client refresh mode, SO = server-only mode, and N/A = not applicable.

| Param under userSync.userIds[] | Mode/Scope | Type | Description | Example |
| --- | --- | --- | --- | --- |
| name | CR: Required<br/>SO:&nbsp;Required | String | ID value for the EUID module. Always `"euid"`. | `"euid"` |
| value | CR: N/A<br/>SO: Optional | Object | An object containing the value for the advertising token. | See [Configuration Parameter Examples: Value](#configuration-parameter-examples-value) |
| params.euidToken | CR: Optional<br/>SO: N/A | Object | The initial EUID token. This should be the `body` element of the decrypted response from a call to the `/token/generate` or `/token/refresh` endpoint. | See [Sample Token](#sample-token) |
| params.euidCookie | CR: Optional<br/>SO: N/A  | String | The name of a cookie that holds the initial EUID token, set by the server. The cookie should contain JSON in the same format as the euidToken param. If `euidToken` is supplied, this parameter is ignored. | See [Sample Token](#sample-token) |
| params.euidApiBase | CR: Optional<br/>SO: Optional | String | Overrides the default EUID API endpoint. For valid values, see [Environments](../getting-started/gs-environments.md). | `"https://prod.euid.eu"` (the default)|
| params.storage | CR: Optional<br/>SO: Optional | String | Specify the module internal storage method: `cookie` or `localStorage`. We recommend that you do not provide this parameter. Instead, allow the module to use the default. | `"localStorage"` (the default) |

### Configuration Parameter Examples: Value

The following code snippet shows an example of the `value` EUID configuration parameter.

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'euid'
            value: {
                'euid': {
                    'id': '...advertising token...'
                }
            }
        }]
    }
});
```

### Sample Token

The following sample is fictitious, but shows what the token response object, returned from either the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint, looks like:

```js
{
  "advertising_token": "...",
  "refresh_token": "...",
  "identity_expires": 1633643601000,
  "refresh_from": 1633643001000,
  "refresh_expires": 1636322000000,
  "refresh_response_key": "wR5t6HKMfJ2r4J7fEGX9Gw=="
}
```

<!-- Reduce Latency by Setting the API Base URL for the Production Environment not applicable for EUID -->
