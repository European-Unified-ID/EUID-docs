---
title: SDK for Android
description: Reference information about the Android SDK.
hide_table_of_contents: false
sidebar_position: 12
---

import Link from '@docusaurus/Link';

# SDK for Android Reference Guide

You can use the SDK for Android for the following:

- Generating or establishing client identity using EUID.
- Retrieving advertising tokens for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use.
- Automatically refreshing EUID tokens.

The following Android-related plugin, and associated documentation, is also available.

| Purpose | Product/Documentation |
| :--- | :--- |
| To use the Google Interactive Media Ads (IMA) SDK for Android to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps | [EUID IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) |

For FAQs relating to mobile publisher integrations, see [FAQs for Mobile Integrations](../guides/integration-mobile-overview.md#faqs-for-mobile-integrations).

## Non-Mobile Android Device Support

This SDK for Android can be used for non-mobile devices for Android platforms as well.

## Functionality

This SDK simplifies integration with EUID for any publishers who want to support EUID for apps running on Android devices. The following table shows the functions it supports.
EUID
| Encrypt Raw EUID to EUID Token | Decrypt EUID Token to Raw EUID | Generate EUID Token from Personal Data | Refresh EUID Token | Map Personal Data to Raw EUID |
| :--- | :--- | :--- | :--- | :--- |
| &#8212; | &#8212; | &#9989; | &#9989; | &#8212; |

The SDK for Android is designed to generate and/or manage EUID identity on behalf of Android apps. It enables EUID identity to be persisted across app lifecycles by securely storing the identity on a device via platform-native encryption tools.

By default, the SDK automatically refreshes EUID identity based on expiration dates. However, you can disable this to allow implementing apps to manage the EUID identity lifecycle manually.

## API Permissions

To use this SDK, you'll need to complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.
You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access.

## SDK Version

<!-- As of 10 Sept 2024 -->

This documentation is for the SDK for Android version 1.5.0 or later.

For current and past release notes information, see [https://github.com/IABTechLab/uid2-android-sdk/releases](https://github.com/IABTechLab/uid2-android-sdk/releases).

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk](https://github.com/IABTechLab/uid2-android-sdk)

The binary is published on Sonatype:

- [https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)

## Minimum Requirements

To consume the binary package of this SDK in your app:

- Minimum target Android version: 4.4+ / API 19+ (SDK) 5.0+


To run the development app (see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)) or to build binary from source code, the minimum requirements are as follows:

- Android Studio version: Check the Android Gradle Plugin (AGP) version required by the EUID SDK specified in the [code repository](https://github.com/IABTechLab/uid2-android-sdk/blob/main/gradle/libs.versions.toml) (see the stated `agp` version), and check [the Android Gradle Plugin release notes](https://developer.android.com/build/releases/gradle-plugin) for the corresponding Android Studio version required.
- Minimum target Android version: 4.4+ / API 19+ (SDK) 5.0+ / API 21+ (Dev-App)

<!-- See also: [Requirements](https://github.com/IABTechLab/uid2-android-sdk/blob/main/README.md#requirements). -->

## Installation

There are two options for installing the Android EUID SDK:

-   [Gradle](#installing-with-gradle)

-  [Maven](#installing-with-maven)

### Installing with Gradle

To install with Gradle, add the SDK as a dependency in the build.gradle
file:

```js
implementation 'com.uid2:uid2-android-sdk:1.5.0'
```

### Installing with Maven 

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

``` xml
<dependency> 
  <groupId>com.uid2</groupId> 
  <artifactId>uid2-android-sdk</artifactId> 
  <version>1.5.0</version> 
</dependency> 
```

## Usage Guidelines

The **EUIDManager** singleton is the primary developer API for the SDK for Android. It is responsible for storing, refreshing, and retrieving the EUID Identity including the EUID token.

The EUIDManager singleton must be initialized before use because:

-   It allows for easier access later.
-   It allows the consuming application to potentially provide its own network instance, responsible for making requests.

The initialization can be done during the creation of the application instance, as shown in the following example:

```js
class MyApplication : Application() {
  override fun onCreate() {
    super.onCreate()
   // Initialize the EUIDManager class. Use DefaultNetworkSession rather than providing our own
   // custom implementation. This can be done to allow wrapping something like OkHttp.
   EUIDManager.init(this.applicationContext)
```

There are two ways to establish an initial EUID Identity:

1. Generate the EUID identity using personal data&#8212;email (hashed or unhashed). For integration instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md).

2. Create an EUID identity server-side and then pass it into the EUID SDK. For integration instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md).

The EUID Mobile SDKs can perform refreshes of EUID identities, after an Identity is established. This is because the refresh functionality relies on the refresh tokens that are part of the EUID Identity.

## Code Samples

The following code samples provide examples of performing specific activities relating to managing EUID with the SDK for Android.

Generate an initial EUID Identity (see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)):
``` javascript
EUIDManager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```
Set the EUID Identity (see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)):

```js
EUIDManager.getInstance().setIdentity(identity: UID2Identity)
```

Get the EUID token (advertising token) to pass to the Advertising SDK (for ad request or bidstream use):

```js
EUIDManager.getInstance().getAdvertisingToken()
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

Generate an EUID Identity using <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link>. For instructions, see [Configure the EUID Mobile SDK](../guides/integration-mobile-client-side.md#configure-the-euid-mobile-sdk) in the *Client-Side Integration Guide for Mobile*.

#### setIdentity()

Sets an EUID Identity, created server-side, to be managed by the SDK. For details, see [Configure the EUID Mobile SDK](../guides/integration-mobile-client-side.md#configure-the-euid-mobile-sdk) in the *Client-Server Integration Guide for Mobile*.

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

The Identity variable stores and returns the current UID2Identity data object being managed by the SDK.

#### identityStatus

The identityStatus variable stores and returns the status of the current EUID Identity being managed by the SDK.
