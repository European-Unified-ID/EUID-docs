---
title: EUID Integration Overview for Prebid
sidebar_label: EUID Integration Overview for Prebid
pagination_label: EUID Integration Overview for Prebid
description: Overview of options for integrating with Prebid as part of your EUID implementation.
hide_table_of_contents: false
sidebar_position: 04

---

import Link from '@docusaurus/Link';
import StoreEUIDTokenInBrowser from '/docs/snippets/_prebid-storing-euid-token-in-browser.mdx';

# EUID Integration Overview for Prebid

This guide is an overview of integration options for publishers who want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) to be passed by Prebid.js or the Prebid Mobile SDK in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

## Prebid.js Support for Web

EUID provides a Prebid.js module that supports the following:

- [Generating the EUID token](#generating-the-euid-token)
- [Refreshing the EUID token](#refreshing-the-euid-token)
- [Storing the EUID token in the browser](#storing-the-euid-token-in-the-browser)
- [Passing the EUID token to the bidstream](#passing-the-euid-token-to-the-bidstream)

For additional flexibility, EUID also provides alternative methods for some of the features and complementary products, such as a JavaScript SDK.

:::caution
EUID is designed to be used only where GDPR applies. The module checks the consent data that's passed in, and operates only if the `gdprApplies` flag is set to `true`.
:::

<!-- GDPR statement difference for UID2/EUID | UID2 is not designed to be used where GDPR applies | EUID is designed to be used only where GDPR applies. -->

### Generating the EUID Token

Depending on access to personal data, there are two methods to generate EUID tokens for use with Prebid.js, as shown in the following table.

Determine which method is best for you, and then follow the applicable integration guide.

| Scenario | Integration Guide |
| :--- | :--- |
| You have access to personal data on the client side and want to do front-end development only | [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| You have access to personal data on the server side and can do server-side development | [EUID Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |

### Refreshing the EUID Token

The Prebid.js EUID module can automatically refresh the EUID tokens. If you prefer to implement manual refresh outside Prebid.js, see [Refreshing an EUID Token](integration-prebid-client-server.md#refreshing-an-euid-token) in the Server-Side Integration Guide. The client-side integration solution includes automated token refresh.

### Storing the EUID Token in the Browser

<StoreEUIDTokenInBrowser />

### Passing the EUID Token to the Bidstream

To configure the EUID module, call `pbjs.setConfig`. For details on supported parameters, refer to the guide that applies to your implementation:

- [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [EUID Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md)

When the EUID module is configured, it manages an EUID token for the user and stores it in the user's browser. 

When generating tokens with Client Refresh mode on the client side or on the server side, the module automatically takes care of refreshing the token as long as your site is open in the user's browser. However, you also have the option to manage the token refresh on the server side. For details, see [Refreshing an EUID Token](integration-prebid-client-server.md#refreshing-an-euid-token) in the Server-Side Integration Guide. The client-side integration solution includes automated token refresh.

### Integration Overview: High-Level Steps

At a high level, to integrate your site with EUID using Prebid.js, you'll need to complete the following steps:

1. Complete EUID account setup.
1. Add Prebid.js to your site.
1. Configure the EUID module.

For detailed instructions, refer to one of the following integration guides:

- [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [EUID Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md)

## Prebid Mobile SDK Support for Mobile Devices

EUID integration with Prebid is supported for Android and iOS mobile devices using the Prebid Mobile SDK.

For details, see [EUID Mobile Integration for Prebid Mobile SDK](integration-prebid-mobile-summary.md).