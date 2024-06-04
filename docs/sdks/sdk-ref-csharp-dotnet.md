---
title: EUID SDK for C# / .NET
description: Reference information about the C# / .NET server-side SDK.
hide_table_of_contents: false
sidebar_position: 08
---

import Link from '@docusaurus/Link';

# EUID SDK for C# / .NET (Server-Side) Reference Guide

You can use the EUID SDK for C# / .NET (Server-Side) to facilitate decrypting of EUID tokens to access the raw EUID. 

## Overview

The functions outlined here define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined here.

## Functionality

This SDK simplifies integration with EUID for any DSPs who are using C# / .NET for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token | Generate EUID Token from Personal Data | Refresh EUID Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Not supported | Not supported |

## Version

The library uses .NET Standard 2.1. unit tests. The sample app uses .NET 5.0.

## GitHub Repository/Binary


This SDK is in the following open-source GitHub repository:

- [EUID SDK for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md)

The binary is published in this location:

- [https://www.nuget.org/packages/UID2.Client](https://www.nuget.org/packages/UID2.Client)

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

The following is the decrypt method in C#:

```cs
using UID2.Client.IUID2Client
 
var client = EUIDClientFactory.Create(_baseUrl, _authKey, _secretKey);
client.Refresh(); //Note that Refresh() should be called once after create(), and then once per hour
var result = client.Decrypt(_advertisingToken);
```

### Response Content

Available information returned through the SDK is outlined in the following table.

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of possible values and definitions, see [Response Statuses](#response-statuses). |
| `Uid` | The raw EUID for the corresponding EUID advertising token.|
| `Established` | The timestamp indicating when a user first established the EUID with the publisher. |

### Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The EUID advertising token was decrypted successfully and a raw EUID was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to decrypt this EUID advertising token.|
| `NotInitialized` | The client library is waiting to be initialized. |
| `InvalidPayload` | The incoming EUID advertising token is not a valid payload. |
| `ExpiredToken` | The incoming EUID advertising token has expired. |
| `KeysNotSynced` | The client has failed to synchronize keys from the EUID service. |
| `VersionNotSupported` |  The client library does not support the version of the encrypted token. |

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
