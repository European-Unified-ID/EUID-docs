[EUID Overview](../../../README.md) > [Getting Started -- Summary](../getting-started/gs-summary.md) > [v2](../summary-doc-v2.md) > [Integration Guides](README.md) > EUID Integration Overview for Prebid.js

<!-- ---
title: EUID Integration Overview for Prebid.js
sidebar_label: EUID Integration Overview for Prebid.js
pagination_label: EUID Integration Overview for Prebid.js
description: Overview of options for integrating with Prebid.js as part of your EUID implementation.
hide_table_of_contents: false
sidebar_position: 04
--- -->

# EUID Integration Overview for Prebid.js

This guide is an overview of integration options for publishers who want to integrate with EUID and generate EUID tokens<!-- [EUID tokens](../ref-info/glossary-uid.md#gl-euid-token) --> (advertising tokens) to be passed by Prebid.js in the RTB bid stream.
<!-- 
It includes the following sections:

- [Introduction](#introduction)
- [EUID User ID Submodule](#euid-user-id-submodule)
- [Generating the EUID Token](#generating-the-euid-token)
- [Refreshing the EUID Token](#refreshing-the-euid-token)
- [Storing the EUID Token in the Browser](#storing-the-euid-token-in-the-browser)
- [Passing the EUID Token to the Bid Stream](#passing-the-euid-token-to-the-bid-stream)
- [Integration Overview: High-Level Steps](#integration-overview-high-level-steps)

 -->
## Introduction

EUID provides a Prebid.js module that supports the following:

- [Generating the EUID token](#generating-the-euid-token)
- [Refreshing the EUID token](#refreshing-the-euid-token)
- [Storing the EUID token in the browser](#storing-the-euid-token-in-the-browser)
- [Passing the EUID token to the bid stream](#passing-the-euid-token-to-the-bid-stream)

For additional flexibility, EUID also provides alternative methods for some of the features and complementary products, such as a JavaScript SDK.

## EUID User ID Submodule

The Prebid EUID module handles storing, providing, and optionally refreshing EUID tokens.

## Generating the EUID Token

Depending on access to personal data, there are two methods to generate EUID tokens for use with Prebid.js, as shown in the following table.

Determine which method is best for you, and then follow the applicable integration guide.

| Scenario | Integration Guide |
| :--- | :--- |
| You have access to personal data on the client side and want to do front-end development only | [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| You have access to personal data on the server side and can do server-side development | [EUID Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |

## Refreshing the EUID Token

The Prebid.js EUID module can automatically refresh the EUID tokens. If you prefer to implement manual refresh outside Prebid.js, see [Refreshing a EUID Token](integration-prebid-server-side.md#refreshing-an-euid-token) in the Server-Side Integration Guide. The client-side integration solution includes automated token refresh.

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

## Passing the EUID Token to the Bid Stream

To configure the EUID module, call `pbjs.setConfig`. For details on supported parameters, refer to the guide that applies to your implementation:

- [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [EUID Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md)

When the EUID module is configured, it manages an EUID token for the user and stores it in the user's browser. 

When generating tokens with Client Refresh mode on the client side or on the server side, the module automatically takes care of refreshing the token as long as your site is open in the user's browser. However, you also have the option to manage the token refresh on the server side. For details, see [Refreshing an EUID Token](integration-prebid-server-side.md#refreshing-an-euid-token) in the Server-Side Integration Guide. The client-side integration solution includes automated token refresh.

## Integration Overview: High-Level Steps

At a high level, to integrate your site with EUID using Prebid.js, you'll need to complete the following steps:

1. Complete EUID account setup.
1. Add Prebid.js to your site.
1. Configure the EUID module.

For detailed instructions, refer to one of the following integration guides:

- [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [EUID Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md)
