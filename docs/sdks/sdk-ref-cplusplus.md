---
title: SDK for C++
description: Reference information about the C++ server-side SDK.
hide_table_of_contents: false
sidebar_position: 10
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SDKsSameUID2EUID from '../snippets/_euid-sdk-same-for-all.mdx';

# SDK for C++ Reference Guide

You can use the SDK for C++ on the server side to decrypt EUID tokens to access the raw EUID.

## Overview

The functions outlined here define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined here.

## Functionality

This SDK simplifies integration with EUID for any DSPs who are using C++ for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token to Raw EUID | Generate EUID Token from Personal Data | Refresh EUID Token | Map Personal Data to Raw EUIDs | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#8212; | &#8212; | &#8212; | &#8212; |

## API Permissions

To use this SDK, you'll need to complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities that require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The SDK requires C++ version 11.

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [SDK for C++](https://github.com/IABTechLab/uid2-client-cpp11/blob/master/README.md).

Release tags are available in the following GitHub location, but you must build your own binaries:

- https://github.com/IABTechLab/uid2-client-cpp11/tags

<SDKsSameUID2EUID/>

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the EUID service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | The endpoint for the EUID service. | N/A |
| `authKey` | The authentication token that belongs to the client. For access to EUID, see [Contact Info](../getting-started/gs-account-setup.md#contact-info). | N/A |

## Interface 

The interface allows you to decrypt EUID advertising tokens and return the corresponding raw EUID. 

:::note
When you use an SDK, you do not need to store or manage decryption keys.
:::

If you're a DSP, for bidding, call the interface to decrypt an EUID advertising token and return the EUID. For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

The following is the decrypt method in C++:

```cpp
#include <uid2/uid2client.h>
using namespace uid2;
 
const auto client = EUIDClientFactory::Create(baseUrl, apiKey, secretKey);
client->Refresh(); //Note that Refresh() should be called once after create(), and then once per hour
const auto result = client->Decrypt(adToken);
```

### Response Content

Available information returned through the SDK is outlined in the following table.

| Function | Description |
| :--- | :--- |
| `GetStatus()` | The decryption result status. For a list of possible values and definitions, see [Response Statuses](#response-statuses). |
| `GetUid()` | The raw EUID for the corresponding EUID advertising token. |
| `GetEstablished()` | The timestamp indicating when a user first established the EUID with the publisher. |

### Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The EUID advertising token was decrypted successfully and a raw EUID was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to decrypt this EUID advertising token.|
| `NotInitialized` | The client library is waiting to be initialized. |
| `InvalidPayload` | The incoming EUID advertising token is not a valid payload. |
| `ExpiredToken` | The incoming EUID advertising token has expired. |
| `KeysNotSynced` | The client has failed to synchronize keys from the EUID service. |
| `VersionNotSupported` | The client library does not support the version of the encrypted token. |
