---
title: EUID Integration Overview for JavaScript
sidebar_label: EUID Integration Overview for JavaScript
pagination_label: EUID Integration Overview for JavaScript
description: Overview of options for integrating with the EUID SDK for JavaScript as part of your EUID implementation.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# EUID Integration Overview for JavaScript

This guide is an overview of integration options for publishers who want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) using the SDK for JavaScript.

For a summary of all web options, including Prebid.js and additional SDK options, see [Web Integration Overview](integration-options-publisher-web.md).

## Introduction

EUID provides an SDK for JavaScript that supports the following:

- [Generating the EUID token](#generating-the-euid-token)
- [Refreshing the EUID token](#refreshing-the-euid-token)
- [Storing the EUID token in the browser](#storing-the-euid-token-in-the-browser)

For additional flexibility, EUID also provides alternative methods for some of the features and complementary products, such as a Prebid integration.

## Client-Side or Client-Server Integration

The options for integrating with EUID using the SDK for JavaScript are summarized in the following table. Choose the option that's best for you.

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| You have access to personal data on the client side and want to do front-end development only. | Client-side integration | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |
| You have access to personal data on the server side and can do server-side development, or you are using a Private Operator. | Server-side integration | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |

## Generating the EUID Token

Depending on access to personal data, there are two methods to generate EUID tokens using the SDK for JavaScript: client-side or server-side.

From the table in [Client-Side or Client-Server Integration](#client-side-or-client-server-integration), determine which option is best for you, and then follow the applicable integration guide.

## Refreshing the EUID Token

The SDK for JavaScript includes automated token refresh.

## Storing the EUID Token in the Browser
<!-- GWH check corresponding (not identical) section in integration-prebid.md, integration-prebid-client-side.md, integration-prebid-client-side.md, for consistency -->

The client-side option stores data using local storage. The client-server option uses local storage by default, but you can also choose to use a cookie instead. For details, see [EUID Storage Format](../sdks/sdk-ref-javascript.md#euid-storage-format) in the *SDK for JavaScript Reference Guide*.

The cookie size can be significant, which could be a problem. However, if local storage is not an option, this is one possible approach.

## Passing the EUID Token to the Bidstream

The JavaScript SDK manages generating, refreshing, and storing the EUID token, but it does not manage passing the token to the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

You can pass the token into the bidstream using any option you choose&#8212;for example, Prebid.js. For some suggestions, see [Pass the Token Into the Bidstream](integration-options-publisher-web.md#pass-the-token-into-the-bidstream) in the *Web Integration Overview*.

## JavaScript Integration Overview: High-Level Steps

At a high level, to integrate your site with EUID using the SDK for JavaScript, you'll need to complete the following steps:

1. Complete EUID account setup.
1. Add the SDK to your site.
1. Configure the SDK.

For detailed instructions, refer to one of the following integration guides:

- [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md)
- [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md)
