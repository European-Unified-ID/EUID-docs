---
title: EUID IMA Plugin for iOS
description: A guide for publishers using IMA for ad requests on iOS apps.
hide_table_of_contents: false
sidebar_position: 15
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# EUID IMA Plugin for iOS Integration Guide

The EUID Interactive Media Ads (IMA) Plugin for iOS enables publishers that use the [Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) to send <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Interactive Media Ads (IMA) for any publishers who want to support EUID for apps running on iOS devices.

## Version

<!-- Updated 10 Sept 2024 -->

This documentation is for the EUID IMA Plugin for iOS version 1.0.0 or later.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-ima](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Requirements 

To run this plugin, install the following:

1. Google IMA SDK v3.19.1 or later:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side/history)
1. SDK for iOS v1.7.0 or later:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md)
1. [EUID IMA Plugin for iOS v1.0.0](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Installation

Prerequisite: Install the Google Interactive Ads SDK and the SDK for iOS.

Install the EUID iOS IMA Plugin via Swift Package Manager or CocoaPods to an existing app with the SDK for iOS and the Google Interactive Ads SDK installed.

There are three installation options:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Add the following dependency to Package.swift:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-plugin-google-ima.git", exact: "1.0.0")
]
```

### Installing with Xcode

In the XCode user interface, under Package Dependencies, add the following entry for your apps:

| Name | Location | Dependency Rule |
| :--- | :--- | :--- |
| uid2-ios-plugin-google-ima | `git@github.com:IABTechLab/uid2-ios-plugin-google-ima.git` | Exact Version: 1.0.0 |

### Installing with CocoaPods

Add the following entry in your `Podfile`:

```
pod 'UID2IMAPlugin', '1.0.0'
```
