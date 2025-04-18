---
title: EUID Integration Guides - Summary
sidebar_label: Summary
pagination_label: EUID Integration Guides - Summary
description: Summary of all the integration guides available.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# EUID Integration Guides: Summary

The following guides provide integration instructions based on the needs and requirements of your organization and its primary role as a publisher, DSP, or data provider/advertiser. As an EUID participant, you can also integrate via Enterprise Partners that enable engaging with an Open Operator service and hosting of a Private Operator service.

Integrations fall into these categories:

- [Publisher Integrations](#publisher-integrations)
- [Advertiser/Data Provider Integrations](#advertiserdata-provider-integrations)
- [DSP Integrations](#dsp-integrations)
- [Private Operator Service Integrations](#private-operator-service-integrations)

## Publisher Integrations

Publisher integrations fall into the following main categories:

- [Web Integrations](#web-integrations)
- [Mobile Integrations](#mobile-integrations)
- [CTV Integrations](#ctv-integrations)
- [Prebid Integrations](#prebid-integrations)
- [Google Ad Manager Integrations](#google-ad-manager-integrations)

### Web Integrations

The following documentation resources are available for publisher web integrations.

:::tip
For a detailed summary of web integration options, see [Web Integration Overview](integration-options-publisher-web.md).
:::

| Integration Guide | Content Description |
| :--- | :--- |
| [EUID Integration Overview for Prebid](integration-prebid.md) | An overview of options for publishers who want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) to be passed by Prebid.js in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>. |
| [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | An integration guide for publishers who want to integrate with EUID and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bidstream. This guide is for publishers who want to request EUID tokens client-side, which is the easiest implementation approach. |
| [EUID Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) | An integration guide for publishers who want to integrate with EUID and generate identity tokens to be passed by Prebid in the RTB bidstream. This guide is for publishers who are using a private operator or who want to generate tokens server-side. |
| [EUID Integration Overview for JavaScript](integration-javascript.md) | An overview of options for publishers who want to integrate with EUID using the JavaScript SDK. |
| [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) | A guide for publishers who want to integrate with EUID using only client-side JavaScript changes, which is the easiest implementation approach.<br/>The SDK for JavaScript manages token generation and token refresh automatically. |
| [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) | This integration guide for publishers covers standard web integration scenarios that use the SDK for JavaScript and requires the token to be generated on the server side and passed to the publishers' web pages. |
| [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) | This integration guide is for publishers that do not use the [SDK for JavaScript](../sdks/sdk-ref-javascript.md). |
| [Google Ad Manager Secure Signals Integration Guide](integration-google-ss.md) | This integration guide covers the additional steps needed for publishers using EUID with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |

### Mobile Integrations

The following documentation resources are available for publishers integrating with Android or iOS devices.

| Integration Guide | Content Description |
| :--- | :--- |
| [Mobile Integration Overview for Android and iOS](integration-mobile-overview.md) | An overview of options for mobile app publishers who want to integrate with EUID using the SDK for Android or the SDK for iOS. |
| [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) | An integration guide for mobile app publishers who want to integrate with EUID with changes only within the mobile app (no server-side changes). |
| [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | An integration guide for mobile app publishers who want to integrate with EUID by doing the following:<ol><li>Generating EUID tokens server-side via either a Public or Private Operator.</li><li>Passing the resulting <Link href="../ref-info/glossary-uid#gl-identity">identities</Link> to a mobile app for passing into the bidstream.</li></ol> |
| [Server-Side Integration Guide for Mobile](../guides/integration-mobile-server-side.md) | An integration guide for mobile app publishers who want to manage the EUID token entirely on the server side. |

### CTV Integrations

The following documentation resources are available for publisher integrations supporting CTV.

| Integration Guide | Content Description |
| :--- | :--- |
| [CTV Integration Guide](../guides/integration-ctv-guide.md) | A summary of CTV integration options, with links to additional information and instructions. |

### Prebid Integrations

The following documentation resources are available for publishers integrating with Prebid.

| Integration Guide | Content Description |
| :--- | :--- |
| [EUID Integration Overview for Prebid](integration-prebid.md) | An overview of options for publishers who want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) to be passed by Prebid.js or the Prebid Mobile SDK in the RTB bidstream. |
| [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | An integration guide for publishers who want to integrate with EUID and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bidstream. This guide is for publishers who want to request EUID tokens client-side, which is the easiest implementation approach. |
| [EUID Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) | An integration guide for publishers who want to integrate with EUID and generate identity tokens to be passed by Prebid.js or the Prebid Mobile SDK in the RTB bidstream. This guide is for publishers who are using a Private Operator or who want to generate tokens server-side. |
| [EUID Mobile Integration for Prebid.js](integration-prebid-mobile-summary.md) | A summary of information resources for EUID integration with Prebid.js on mobile devices. |

### Google Ad Manager Integrations

The following documentation resources are available for publishers integrating with Google Ad Manager.

| Integration Guide | Content Description |
| :--- | :--- |
| [Google Ad Manager Secure Signals Integration Guide](integration-google-ss.md) | This integration guide covers the additional steps needed for publishers using EUID with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |
| [EUID GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md) | The EUID Google Mobile Ads (GMA) Plugin for Android enables publishers that use the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [EUID GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md) | The EUID Google Mobile Ads (GMA) Plugin for iOS enables publishers that use the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |
| [EUID IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md) | The EUID Interactive Media Ads (IMA) Plugin for Android enables publishers that use the [Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [EUID IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md) | The EUID Interactive Media Ads (IMA) Plugin for iOS enables publishers that use the [Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |

## Advertiser/Data Provider Integrations

The following documentation resources are available for advertisers and data providers integrating with EUID.

| Integration Guide | Content Description |
| :--- | :--- |
| [Advertiser/Data Provider Overview](integration-advertiser-dataprovider-overview.md) | This guide provides an overview of integration options for organizations that collect user data and push it to other EUID participants. |
| [Snowflake Integration Guide](integration-snowflake.md) | Instructions for generating raw EUIDs from emails within Snowflake. |
| [Advertiser/Data Provider Integration to HTTP Endpoints](integration-advertiser-dataprovider-endpoints.md) | This guide covers integration steps for advertisers and data providers to integrate with EUID by writing code to call EUID HTTP endpoints, rather than using another implementation option such as an SDK or Snowflake. |

## DSP Integrations

The following documentation resources are available for DSPs integrating with EUID.

| Integration Guide | Content Description |
| :--- | :--- |
| [DSP Integration Guide](dsp-guide.md) | This integration guide for DSPs covers handling EUIDs for bidding and honoring user opt-outs. |

## Private Operator Service Integrations

The following documentation resources are available for <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> integrations.
 
| Integration Guide | Content Description |
| :--- | :--- |
| [EUID Private Operator for AWS](operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
