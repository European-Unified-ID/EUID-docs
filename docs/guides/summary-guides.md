---
title: EUID integration guides - summary
sidebar_label: Summary
pagination_label: EUID integration Guides - summary
description: Summary of all the integration guides available.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# EUID integration guides: Summary

The following guides provide integration instructions based on the needs and requirements of your organization and its primary role as a publisher, DSP, or data provider/advertiser. As an EUID participant, you can also integrate via Enterprise Partners that enable engaging with an Open Operator service and hosting of a Private Operator service.

Integrations fall into these categories:

- [Publisher integrations](#publisher-integrations)
- [Advertiser/data provider integrations](#advertiserdata-provider-integrations)
- [DSP integrations](#dsp-integrations)
- [Private Operator service integrations](#private-operator-service-integrations)

## Publisher integrations

Publisher integrations fall into the following main categories:

- [Web integrations](#web-integrations)
- [Mobile integrations](#mobile-integrations)
- [CTV integrations](#ctv-integrations)
- [Prebid integrations](#prebid-integrations)
- [Google Ad Manager integrations](#google-ad-manager-integrations)

To explore live, working examples of EUID implementations with source code, see [EUID integration samples](../ref-info/integration-sample-sites.md).

### Web integrations

The following documentation resources are available for publisher web integrations.

:::tip
For a detailed summary of web integration options, see [Web integration overview](integration-options-publisher-web.md).
:::

| Integration Guide | Content Description |
| :--- | :--- |
| [EUID integration overview for Prebid](integration-prebid.md) | An overview of options for publishers who want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) to be passed by Prebid.js in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>. |
| [EUID client-side integration guide for Prebid.js](integration-prebid-client-side.md) | An integration guide for publishers who want to integrate with EUID and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bidstream. This guide is for publishers who want to request EUID tokens client-side, which is the easiest implementation approach. |
| [EUID client-server integration guide for Prebid.js](integration-prebid-client-server.md) | An integration guide for publishers who want to integrate with EUID and generate identity tokens to be passed by Prebid in the RTB bidstream. This guide is for publishers who are using a private operator or who want to generate tokens server-side. |
| [EUID integration overview for JavaScript](integration-javascript.md) | An overview of options for publishers who want to integrate with EUID using the JavaScript SDK. |
| [Client-side integration guide for JavaScript](integration-javascript-client-side.md) | A guide for publishers who want to integrate with EUID using only client-side JavaScript changes, which is the easiest implementation approach.<br/>The SDK for JavaScript manages token generation and token refresh automatically. |
| [Client-server integration guide for JavaScript](integration-javascript-client-server.md) | This integration guide for publishers covers standard web integration scenarios that use the SDK for JavaScript and requires the token to be generated on the server side and passed to the publishers' web pages. |
| [Publisher integration guide, server-side](integration-publisher-server-side.md) | This integration guide is for publishers that do not use the [SDK for JavaScript](../sdks/sdk-ref-javascript.md). |
| [Google Ad Manager Secure Signals integration guide](integration-google-ss.md) | This integration guide covers the additional steps needed for publishers using EUID with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |

### Mobile integrations

The following documentation resources are available for publishers integrating with Android or iOS devices.

| Integration Guide | Content Description |
| :--- | :--- |
| [Mobile integration overview for Android and iOS](integration-mobile-overview.md) | An overview of options for mobile app publishers who want to integrate with EUID using the SDK for Android or the SDK for iOS. |
| [Client-side integration guide for mobile](integration-mobile-client-side.md) | An integration guide for mobile app publishers who want to integrate with EUID with changes only within the mobile app (no server-side changes). |
| [Client-server integration guide for mobile](../guides/integration-mobile-client-server.md) | An integration guide for mobile app publishers who want to integrate with EUID by doing the following:<ol><li>Generating EUID tokens server-side via either a Public or Private Operator.</li><li>Passing the resulting <Link href="../ref-info/glossary-uid#gl-identity">identities</Link> to a mobile app for passing into the bidstream.</li></ol> |
| [Server-side integration guide for mobile](../guides/integration-mobile-server-side.md) | An integration guide for mobile app publishers who want to manage the EUID token entirely on the server side. |

### CTV integrations

The following documentation resources are available for publisher integrations supporting CTV.

| Integration Guide | Content Description |
| :--- | :--- |
| [CTV integration guide](../guides/integration-ctv-guide.md) | A summary of CTV integration options, with links to additional information and instructions. |

### Prebid integrations

The following documentation resources are available for publishers integrating with Prebid.

| Integration Guide | Content Description |
| :--- | :--- |
| [EUID integration overview for Prebid](integration-prebid.md) | An overview of options for publishers who want to integrate with EUID and generate <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> (advertising tokens) to be passed by Prebid.js or the Prebid Mobile SDK in the RTB bidstream. |
| [EUID client-side integration guide for Prebid.js](integration-prebid-client-side.md) | An integration guide for publishers who want to integrate with EUID and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bidstream. This guide is for publishers who want to request EUID tokens client-side, which is the easiest implementation approach. |
| [EUID client-server integration guide for Prebid.js](integration-prebid-client-server.md) | An integration guide for publishers who want to integrate with EUID and generate identity tokens to be passed by Prebid.js or the Prebid Mobile SDK in the RTB bidstream. This guide is for publishers who are using a Private Operator or who want to generate tokens server-side. |
| [EUID mobile integration for Prebid.js](integration-prebid-mobile-summary.md) | A summary of information resources for EUID integration with Prebid.js on mobile devices. |

### Google Ad Manager integrations

The following documentation resources are available for publishers integrating with Google Ad Manager.

| Integration Guide | Content Description |
| :--- | :--- |
| [Google Ad Manager Secure Signals integration guide](integration-google-ss.md) | This integration guide covers the additional steps needed for publishers using EUID with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |
| [EUID GMA plugin for Android integration guide](mobile-plugin-gma-android.md) | The EUID Google Mobile Ads (GMA) Plugin for Android enables publishers that use the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [EUID GMA plugin for iOS integration guide](mobile-plugin-gma-ios.md) | The EUID Google Mobile Ads (GMA) Plugin for iOS enables publishers that use the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |
| [EUID IMA plugin for Android integration guide](mobile-plugin-ima-android.md) | The EUID Interactive Media Ads (IMA) Plugin for Android enables publishers that use the [Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [EUID IMA plugin for iOS integration guide](mobile-plugin-ima-ios.md) | The EUID Interactive Media Ads (IMA) Plugin for iOS enables publishers that use the [Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |

## Advertiser/data provider integrations

The following documentation resources are available for advertisers and data providers integrating with EUID.

| Integration Guide | Content Description |
| :--- | :--- |
| [Advertiser/data provider overview](integration-advertiser-dataprovider-overview.md) | This guide provides an overview of integration options for organizations that collect user data and push it to other EUID participants. |
| [Snowflake integration guide](integration-snowflake.md) | Instructions for generating raw EUIDs from emails within Snowflake. |
| [Advertiser/data provider integration to HTTP endpoints](integration-advertiser-dataprovider-endpoints.md) | This guide covers integration steps for advertisers and data providers to integrate with EUID by writing code to call EUID HTTP endpoints, rather than using another implementation option such as an SDK or Snowflake. |

## DSP integrations

The following documentation resources are available for DSPs integrating with EUID.

| Integration Guide | Content Description |
| :--- | :--- |
| [DSP integration guide](dsp-guide.md) | This integration guide for DSPs covers handling EUIDs for bidding and honoring user opt-outs. |

## Private Operator service integrations

The following documentation resources are available for <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> integrations.
 
| Integration Guide | Content Description |
| :--- | :--- |
| [EUID Private Operator for AWS](operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
