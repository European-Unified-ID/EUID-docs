---
title: EUID mobile integration overview for Android and iOS
sidebar_label: integration overview for mobile
pagination_label: Mobile integration overview for Android and iOS
description: Overview of options for EUID mobile integration.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';
import SnptIntegratingWithSSO from '../snippets/_snpt-integrating-with-sso.mdx';
import SnptPreparingEmailsAndPhoneNumbers from '../snippets/_snpt-preparing-emails-and-phone-numbers.mdx';

# EUID mobile integration overview for Android and iOS

This guide is an overview of integration options for mobile app publishers who want to integrate with EUID using the SDK for Android or the SDK for iOS.

:::note
This guide uses the group term **EUID mobile SDKs** to include both the SDK for Android and the SDK for iOS.
:::

## Introduction 

EUID provides SDKs for Android/iOS that support the following:

- Generating the EUID token
- Refreshing the EUID token
- Storing the EUID token

For additional flexibility, EUID also provides alternative methods for some of the features and complementary products, such as EUID Google GMA/IMA Plugins. Available options are described in the individual guides: see [Integration overview: High-level steps](#integration-overview-high-level-steps).

## Integrating with single sign-on (SSO)

<SnptIntegratingWithSSO />

## Preparing personal data for processing

<SnptPreparingEmailsAndPhoneNumbers />

## Integration overview: High-level steps

At a high level, to integrate your mobile app with EUID using the EUID mobile SDKs, you'll need to complete the following steps:

1. Complete the EUID account setup.

1. Client-Server Integration Only: Integrate server-side token generation.

1. Add the SDK for Android or iOS into your mobile app.

1. Configure the SDK.

1. Check that the token was successfully generated and then pass it for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use.

1. Optionally, configure the EUID GMA/IMA plugins for integration with the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) and the [Google IMA SDK](https://developers.google.com/interactive-media-ads/).

For details, refer to one of the following guides:

- [Client-side integration guide for mobile](integration-mobile-client-side.md)
- [Client-server integration guide for mobile](integration-mobile-client-server.md)
- [Client-side integration guide for mobile](integration-mobile-client-side.md)

## Mobile integration paths

To determine the best integration path for your mobile scenario, consider these points:

1. Do you want to retrieve the EUID token on the client side or on the server side? See [Client-side, client-server, or server-side integration?](#client-side-client-server-or-server-side-integration).

1. What do you want to use to retrieve and refresh the EUID token? See [Generating, storing, and refreshing the EUID token](#generating-storing-and-refreshing-the-euid-token).

1. How do you want to use the EUID tokens? See [Sending the token to the bidstream](#sending-the-token-to-the-bidstream).

### Client-side, client-server, or server-side integration?

The options for integrating with EUID using the EUID mobile SDKs are summarized in the following table. Choose the <Link href="../ref-info/glossary-uid#gl-integration-approaches">integration approach</Link> that's best for you.

For details, see [Integration approaches](../ref-info/ref-integration-approaches.md).

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| You have access to <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> (email address or phone number) on the client side/within the mobile app, and want to keep changes within your app only. | Client-side integration | [EUID client-side integration guide for mobile](integration-mobile-client-side.md) |
| You have access to personal data on the server side only and can do the necessary development to generate EUID tokens server-side, but you want to refresh tokens on the client side&#8212;or you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. | Client-Server Integration | [EUID client-server integration guide for mobile](integration-mobile-client-server.md) |
| You have access to personal data on the server side only and can do the necessary development to generate EUID tokens server-side, or you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. | Server-Side Integration | [EUID server-side integration guide for mobile](integration-mobile-server-side.md) |

### Generating, storing, and refreshing the EUID token

The following table summarizes the mobile integration options for managing the EUID token, including generating, storing, and refreshing the token, with links to the documentation for each option.

<table>
  <thead>
    <tr>
      <th>EUID Mobile Implementation Option</th>
      <th>SDK Doc</th>
      <th>Implementation Guide</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>EUID Android SDK</td>
      <td>[SDK for Android reference guide](../sdks/sdk-ref-android.md)</td>
      <td>One of the following:<ul><li>[EUID client-side integration guide for mobile](../guides/integration-mobile-client-side.md)</li><li>[EUID client-server integration guide for mobile](../guides/integration-mobile-client-server.md)</li></ul></td>
    </tr>
    <tr>
      <td>EUID iOS SDK</td>
      <td>[SDK for iOS reference guide](../sdks/sdk-ref-ios.md)</td>
      <td>One of the following:<ul><li>[EUID client-side integration guide for mobile](../guides/integration-mobile-client-side.md)</li><li>[EUID client-server integration guide for mobile](../guides/integration-mobile-client-server.md)</li></ul></td>
    </tr>
  </tbody>
</table>

### Sending the token to the bidstream

There are many options for sending your EUID tokens to the bidstream.

The following table summarizes the options supported by EUID.

| Scenario | Integration Guide |
| :--- | :--- |
| You want to use Google GMA to integrate video, banner, interstitial, or native ads into your Android app | Both of the following, in this sequence:<ol><li>[EUID GMA plugin for Android integration guide](../guides/mobile-plugin-gma-android.md)</li><li>One of the following:<ul><li>Client-side: [Optional: EUID GMA/IMA plugin for gam Secure Signals integration](../guides/integration-mobile-client-side.md#optional-euid-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: EUID GMA/IMA plugin for gam Secure Signals integration](../guides/integration-mobile-client-server.md#optional-euid-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| You want to use Google GMA to integrate video, banner, interstitial, or native ads into your iOS app | Both of the following, in this sequence:<ol><li>[EUID GMA plugin for iOS integration guide](../guides/mobile-plugin-gma-ios.md)</li><li>One of the following:<ul><li>Client-side: [Optional: EUID GMA/IMA plugin for gam Secure Signals integration](../guides/integration-mobile-client-side.md#optional-euid-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: EUID GMA/IMA plugin for gam Secure Signals integration](../guides/integration-mobile-client-server.md#optional-euid-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| You want to use Google IMA to integrate multimedia ads into your Android app | Both of the following, in this sequence:<ol><li>[EUID IMA plugin for Android integration guide](../guides/mobile-plugin-ima-android.md)</li><li>One of the following:<ul><li>Client-side: [Optional: EUID GMA/IMA plugin for gam Secure Signals integration](../guides/integration-mobile-client-side.md#optional-euid-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: EUID GMA/IMA plugin for gam Secure Signals integration](../guides/integration-mobile-client-server.md#optional-euid-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| You want to use Google IMA to integrate multimedia ads into your iOS app | Both of the following, in this sequence:<ol><li>[EUID IMA plugin for iOS integration guide](../guides/mobile-plugin-ima-ios.md)</li><li>One of the following:<ul><li>Client-side: [Optional: EUID GMA/IMA plugin for gam Secure Signals integration](../guides/integration-mobile-client-side.md#optional-euid-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: EUID GMA/IMA plugin for gam Secure Signals integration](../guides/integration-mobile-client-server.md#optional-euid-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| You want to use the Prebid Mobile SDK and Prebid Server to send out ad requests from your Android or iOS app | One of the following:<ul><li>Client-side: [Optional: EUID integration with Prebid Mobile SDK](../guides/integration-mobile-client-side.md#optional-euid-integration-with-prebid-mobile-sdk)</li><li>Client-server: [Optional: EUID integration with Prebid Mobile SDK](../guides/integration-mobile-client-server.md#optional-euid-integration-with-prebid-mobile-sdk)</li></ul> |

### Functionality summary

The following table summarizes the functionality available with the various integration options.

All options support either client-side or server-side integration.

| Implementation Option | Generate Token from Personal Data | Refresh Token | Android/iOS? | Send Token to Bidstream |
| :--- | :--- | :--- | :--- | :--- |
| EUID SDK for Android | &#9989; | &#9989; | Android | &ast; |
| EUID SDK for iOS | &#9989;| &#9989; | iOS | &ast; |
| GMA Plugin for Android<br/>(Requires EUID SDK for Android) | &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| GMA Plugin for iOS<br/>(Requires EUID SDK for iOS) | &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| IMA Plugin for Android <br/>(Requires EUID SDK for Android)| &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| IMA Plugin for iOS<br/>(Requires EUID SDK for iOS)| &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| EUID Integration with Prebid Mobile SDK | &#8212; | &#8212; | Either | &#9989;&ast;&ast;&ast; |

&ast;You can combine the SDK with the IMA/GMA Plugin or the EUID Integration with Prebid Mobile SDK to send the token to the bidstream via Google or Prebid Server, or you can retrieve the token manually from the SDK and pass it to the bidstream in another way, according to your preference.

&ast;&ast;After setup, Google GMA/IMA collects the token automatically and sends it to the bidstream.

&ast;&ast;&ast;After setup, the EUID Integration with Prebid Mobile SDK adds the token into the ad request to Prebid Server.

<!-- &#9989; = Supported | &#8212; = Not Supported -->

## FAQs for mobile integrations

Here is some FAQ information relating to EUID mobile integrations:

- [iOS: Can I use Swift Package Manager and CocoaPods/Podspec together?](#ios-can-i-use-swift-package-manager-and-cocoapodspodspec-together)

#### iOS: Can I use Swift Package Manager and CocoaPods/Podspec together?

For your EUID Mobile integration, you can install the EUID Mobile SDK, the EUID GMA Plugin, and the EUID IMA Plugin by either Swift Package Manager or CocoaPods.

Our recommendation:

- If you already use CocoaPods, particularly if you use it to integrate the Google Ad Frameworks yourself, it's best to use CocoaPods to integrate the EUID SDKs. 
- If you're new to integrating dependencies, or you already have dependencies with Swift Package Manager, we recommend that you use Swift Package Manager for your EUID mobile integration.


:::caution
If you already use CocoaPods, this does not prevent your app from using Swift Package Manager (SPM) to integrate the EUID SDK and plugins. However, there is a potential conflict. If you already have GMA installed with CocoaPods, and you then install the EUID Mobile SDK, which itself includes GMA, with Swift Package Manager, you end up with two copies of GMA in your implementation, which does not work.
:::

Therefore, if you already have GMA installed and want to install EUID, be sure that you first remove GMA from CocoaPods.

:::tip
Podspec is the name of the file in CocoaPods that defines the libraries to be integrated with the app.
:::

## Troubleshooting tips for mobile integrations

Here's some additional information to help you troubleshoot your EUID mobile integrations:

- [Android SDK cannot connect in production environment](#android-sdk-cannot-connect-in-production-environment)

#### Android SDK cannot connect in production environment

A good first step in troubleshooting is to look at the health check endpoint.

From your mobile device or Android emulator, see if you can reach this endpoint:

```
https://prod.euid.eu/ops/healthcheck
```

The response should be `OK`.

Some error responses indicate a networking problem resulting in your app not being able to reach the EUID endpoint. For example:

- `Caused by java.net.UnknownHostException: Unable to resolve host "prod.euid.eu": No address associated with hostname`

   The SDK tries to refresh the EUID token in the background. If an error such as an IOException occurs, the SDK retries multiple times. If retry is not successful, this exception is displayed.

Another good troubleshooting step is to enable logging. For details, see [Enable logging](integration-mobile-client-side.md#enable-logging).
