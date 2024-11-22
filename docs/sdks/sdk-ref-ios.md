---
title: SDK for iOS
description: Reference information about the iOS SDK.
hide_table_of_contents: false
sidebar_position: 14
---

import Link from '@docusaurus/Link';

# SDK for iOS Reference Guide

You can use the SDK for iOS to facilitate the process of generating or establishing client identity using EUID, retrieving advertising tokens for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use, and automatically refreshing EUID tokens.

The following iOS-related plugins, and associated documentation, are also available:

| Purpose | Product/Documentation |
| :--- | :--- |
| To use the Google Mobile Ads (GMA) SDK to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS/tvOS apps | [EUID GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md) |
| To use the Google Interactive Media Ads SDK for iOS to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS/tvOS apps | [EUID IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) |

## tvOS Support
Although this page refers to SDK for iOS, this SDK also supports tvOS. For the required tvOS version, see [Minimum Requirements](#minimum-requirements).

## Functionality

This SDK simplifies integration with EUID for any publishers who want to support EUID for apps running on iOS devices. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token to Raw EUID | Generate EUID Token from Personal Data | Refresh EUID Token | Map Personal Data to Raw EUIDs | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#8212; | &#8212; | &#9989; | &#9989; | &#8212; | &#8212; |

The SDK for iOS is designed to generate and/or manage EUID identity on behalf of iOS apps. It enables EUID identity to be persisted across app lifecycles by securely storing the identity on a device via platform-native encryption tools.

By default, the SDK automatically refreshes EUID identity based on expiration dates. However, you can disable this to allow implementing apps to manage the EUID identity lifecycle manually.

## API Permissions

To use this SDK, you'll need to complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.
You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access.

## SDK Version

<!-- Updated 10 Sept 2024 -->

This documentation is for the SDK for iOS version 1.7.0 or later.

For current and past release notes information, see [https://github.com/IABTechLab/uid2-ios-sdk/releases](https://github.com/IABTechLab/uid2-ios-sdk/releases).

## GitHub Open-Source Repository

This SDK is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-ios-sdk](https://github.com/IABTechLab/uid2-ios-sdk)

## Minimum Requirements

Minimum requirements for this SDK are as follows:

- Xcode version: 15.0+
- iOS minimum target version:
  - For full functionality: 13.0+
  - For partial functionality: 12.0+. The app with the SDK integrated can be installed with all devices, but generating or retrieving EUID tokens on the client side will not work with devices running iOS versions below 13.0.
- tvOS minimum target version: 13.0+
- Swift version: 5.0+

<!-- See also: [Requirements](https://github.com/IABTechLab/uid2-ios-sdk/blob/main/README.md#requirements). -->

## Installation

Install the iOS SDK via Swift Package Manager (SPM) or CocoaPods. There are three installation options:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Add the following dependency to Package.swift:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-sdk.git", from: "1.7.0"),
]
```

### Installing with Xcode

In the XCode user interface, under Package Dependencies, add the following entry for your apps:

| Name | Location | Dependency Rule |
| :--- | :--- | :--- |
| uid2-ios-sdk | `git@github.com:IABTechLab/uid2-ios-sdk.git` | Up to next major version: 1.7.0 < 2.0.0 |

### Installing with CocoaPods

Add the following entry in your `Podfile`:

```
pod 'UID2', '~> 1.7'
```

## Usage Guidelines

The **EUIDManager** singleton is the primary developer API for the SDK for iOS. It is responsible for storing, refreshing, and retrieving the EUID Identity including the EUID token.

For iOS, the `EUIDManager` is initialized automatically the first time it is accessed. You can configure it to support automatic or manual refresh capabilities.

There are two ways to establish an initial EUID Identity:

1. Generate the EUID identity using personal data&#8212;email (hashed or unhashed) or phone number (hashed or unhashed). For integration instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md).

2. Create an EUID identity from your server's back end and then pass it to the EUID SDK. For integration instructions, see [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md).

The EUID Mobile SDKs can perform refreshes of EUID identities, after an Identity is established. This is because the refresh functionality relies on the refresh tokens that are part of the EUID Identity.


## Code Samples

The following code samples provide examples of performing specific activities relating to managing EUID with the SDK for iOS.

Generate an initial EUID Identity (for instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md#configure-the-euid-mobile-sdk)):

```js
EUIDManager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```
Set the Initial EUID Identity (for instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md#configure-the-euid-mobile-sdk)):

``` javascript
EUIDManager.shared.setIdentity(_ identity: UID2Identity)
```

Get the EUID token (advertising token) to pass to the Advertising SDK (for ad request or bidstream use):

```js
EUIDManager.shared.getAdvertisingToken()
```

## EUIDManager API

This section includes the functions and variables that are part of the EUIDManager API.

### Functions

The following functions are available as part of the EUIDManager API:
- [generateIdentity()](#generateidentity)
- [setIdentity()](#setidentity)
- [resetIdentity()](#resetidentity)
- [refreshIdentity()](#refreshidentity)
- [getAdvertisingToken()](#getadvertisingtoken)
- [setAutomaticRefreshEnabled()](#setautomaticrefreshenabled)

#### generateIdentity()

Generate an EUID Identity using <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link>. For details, see [Configure the EUID Mobile SDK](../guides/integration-mobile-client-side.md#configure-the-euid-mobile-sdk) in the *Client-Server Integration Guide for Mobile*.
#### setIdentity()

Sets an EUID Identity, created server-side, to be managed by the SDK. For details, see [Configure the EUID Mobile SDK](../guides/integration-mobile-client-server.md#configure-the-euid-mobile-sdk) in the *Client-Server Integration Guide for Mobile*.

#### resetIdentity()

Resets or removes the EUID Identity currently being managed by the SDK.

#### refreshIdentity()

Manually refreshes the EUID Identity being managed by the SDK.

#### getAdvertisingToken()

If the current EUID Identity is valid, this function returns the EUID token (advertising token).

#### setAutomaticRefreshEnabled()

Toggle for automatic refresh functionality.

### Variables

The following variables are available as part of the EUIDManager API:

- [identity](#identity)
- [identityStatus](#identitystatus)

#### identity

The `Identity` variable stores and returns the current `UID2Identity` data object being managed by the SDK.

<!-- ^^^Note UID2Identity is for both UID2 and EUID.^^^ -->

#### identityStatus

The `identityStatus` variable stores and returns the status of the current EUID Identity being managed by the SDK.
