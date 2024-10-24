---
title: EUID IMA Plugin for Android
description: A guide for publishers using GIA for ad requests on Android apps.
hide_table_of_contents: false
sidebar_position: 14
---

import Link from '@docusaurus/Link';

# EUID IMA Plugin for Android Integration Guide

The EUID Interactive Media Ads (IMA) Plugin for Android enables publishers that use the [Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Interactive Media Ads (IMA) for any publishers who want to support EUID for apps running on Android devices.

## Version

<!-- Updated 10 Sept 2024 -->

This documentation is for the EUID IMA Plugin for Android version 1.6.0 or later.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima)

## Requirements 

To run this plugin, install the following:

1. Google IMA SDK v3.30.3 or later:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/history)
1. SDK for Android v1.6.0 or later:
   - [SDK](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)
   - [SDK for Android Reference Guide](../sdks/sdk-ref-android.md)
1. [EUID IMA Plugin for Android v1.6.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-ima)
1. If you are using R8 or Proguard, add the applicable option specified in [Notes for Using R8 or ProGuard](#notes-for-using-r8-or-proguard)

## Installation

Prerequisite: Install the Google Interactive Media Ads SDK and the SDK for Android.

Install the EUID Android IMA Plugin to an existing app with the SDK for Android and Google IMA SDK installed. There are two installation options:

- [Gradle](#gradle)
- [Maven](#maven)


### Gradle 
To install with Gradle, add the SDK as a dependency in the `build.gradle` file:

```js
implementation 'com.uid2:uid2-android-sdk-ima:1.6.0'
```

### Maven

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

``` xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-ima</artifactId>
  <version>1.6.0</version>
</dependency>
```

## Notes for Using R8 or ProGuard

If you are using R8, the shrinking and obfuscation rules are included automatically.

If you are using ProGuard, you must manually add the option specified in [uid2-ima.pro](https://github.com/IABTechLab/uid2-android-sdk/blob/main/securesignals-ima/uid2-ima.pro).
