---
title: GMA Plugin for iOS
description: A guide for publishers using GMA for ad requests on iOS apps.
hide_table_of_contents: false
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# GMA Plugin for iOS integration guide

The EUID Google Mobile Ads (GMA) Plugin for iOS enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Mobile Ads (GMA) for any publishers who want to support EUID for apps running on iOS devices.

## Version

<!-- As of 2026-06-12 -->

This documentation is for the EUID GMA Plugin for iOS version 3.1.0 or later.

### Version compatibility

The following table shows which versions of the EUID GMA Plugin for iOS are compatible with each version of the Google Mobile Ads SDK and the SDK for iOS, and the minimum iOS target version that each plugin version requires.

| GMA Plugin version | GMA SDK version | SDK for iOS version | Minimum iOS version |
| :--- | :--- | :--- | :--- |
| 3.1.0 (latest) | 13.x | 1.7.0 – 3.x | 13.0 |
| 3.0.0 | 13.x | 1.7.0 – 2.x | 13.0 |
| 2.0.2 | 12.x | 1.7.0 – 2.x | 12.0 |
| 2.0.0 – 2.0.1 | 12.x | 1.7.0 – 1.x | 12.0 |
| 1.0.0 – 1.0.1 | 10.7.0 – 11.x | 1.7.0 – 1.x | 12.0 |

## GitHub repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-gma](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Requirements 

The EUID GMA Plugin for iOS v3.1.0 requires an iOS minimum target version of 13.0+.

To run this plugin, install the following:

1. Google Mobile Ads SDK v13.x:
   - [SDK](https://developers.google.com/admob/ios)
   - [Release Notes](https://developers.google.com/admob/ios/rel-notes)
1. SDK for iOS v1.7.0 – v3.x:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [SDK for iOS reference guide](../sdks/sdk-ref-ios.md)
1. [EUID GMA Plugin for iOS v3.1.0](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Installation

Prerequisite: Install the Google Mobile Ads SDK and the SDK for iOS.

Install the EUID iOS GMA Plugin via Swift Package Manager or CocoaPods to an existing app with the SDK for iOS and the Google Mobile Ads SDK installed.

There are three installation options:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Add the following dependency to Package.swift:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-plugin-google-gma.git", exact: "3.1.0")
]
```

### Installing with Xcode

In the Xcode user interface, under Package Dependencies, add the following entry for your apps:

| Name | Location | Dependency rule |
| :--- | :--- | :--- |
| uid2-ios-plugin-google-gma | `git@github.com:IABTechLab/uid2-ios-plugin-google-gma.git` | Exact Version: 3.1.0 |

### Installing with CocoaPods

Add the following entry in your `Podfile`:

```
pod 'UID2GMAPlugin', '3.1.0'
```
