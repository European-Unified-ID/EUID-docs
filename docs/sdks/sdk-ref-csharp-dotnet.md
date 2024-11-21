---
title: SDK for C# / .NET
description: Reference information about the C# / .NET server-side SDK.
hide_table_of_contents: false
sidebar_position: 08
---

import Link from '@docusaurus/Link';

# SDK for C# / .NET Reference Guide

You can use the SDK for C# / .NET on the server side to decrypt EUID tokens to access the raw EUID.

## Overview

The functions outlined here define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined here.

## Functionality

This SDK simplifies integration with EUID for any DSPs who are using C# / .NET for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token to Raw EUID | Generate EUID Token from Personal Data | Refresh EUID Token | Map Personal Data to Raw EUIDs | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#8212; | &#8212; | &#8212; | &#8212; |

## API Permissions

To use this SDK, you'll need to complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The library uses .NET Standard 2.1. unit tests. The sample app uses .NET 5.0.

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [SDK for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md)

  >NOTE: This SDK is valid for both UID2 and EUID. The SDK, and some of its technical components, are named UID2, but are equally applicable for EUID.

The binary is published in this location:

- [https://www.nuget.org/packages/UID2.Client](https://www.nuget.org/packages/UID2.Client)

## Initialization

DSPs should create an instance of the `BidstreamClient` class.

You will need to provide the values necessary for the SDK to authenticate with the EUID service.

| Parameter | Description |
| :--- | :--- |
| `endpoint` | The endpoint for the EUID service. See [Environments](../getting-started/gs-environments). | 
| `authKey` | The API key. See [EUID Credentials](../getting-started/gs-credentials). |
| `secretKey` | The client secret. See [EUID Credentials](../getting-started/gs-credentials). |

## Interface 

The `BidstreamClient` class allows you to decrypt EUID tokens into raw EUIDs.

For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

:::note
When you use an SDK, you do not need to store or manage decryption keys.
:::

### Decryption Response Content

Whether decrypting with the `BidstreamClient`, the SDK returns the following information:

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of possible values and definitions, see [Decryption Response Statuses](#decryption-response-statuses). |
| `Uid` | The raw EUID for the corresponding EUID token. |
| `Established` | The timestamp indicating when a user first established the EUID with the publisher. |

### Decryption Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The EUID token was decrypted successfully and a raw EUID was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to decrypt this EUID token.|
| `NotInitialized` | The client library is waiting to be initialized. |
| `InvalidPayload` | The incoming EUID token is not a valid payload. |
| `ExpiredToken` | The incoming EUID token has expired. |
| `KeysNotSynced` | The client has failed to synchronize keys from the EUID service. |
| `VersionNotSupported` | The client library does not support the version of the encrypted token. |

## Usage for DSPs

The following instructions provide an example of how you can decode bidstream tokens using the SDK for .NET as a DSP.

1. Create a `BidstreamClient`:

```cs
var client = new BidstreamClient(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY);
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```cs
client.Refresh();
```

3. Decrypt a token into a raw EUID. Pass the token, and then do one of the following: 
 * If the bid request originated from a publisher's website, pass the domain name. The domain name must be all lower case, without spaces and without subdomain. For example, for `Subdomain.DOMAIN.com`, pass `domain.com` instead.
 * If the bid request originated from a mobile app, pass the <Link href="../ref-info/glossary-uid#gl-app-name">app name</Link>.
 * Otherwise, pass `null`.


```cs
var decrypted = client.DecryptTokenIntoRawUid(uidToken, domainOrAppName);
// If decryption succeeded, use the raw EUID.
if (decrypted.Success) 
{
    // Use decrypted.Uid.
} 
else 
{
    // Check decrypted.Status for the failure reason.
}
```

For a full example, see the `ExampleBidStreamClient` method in [SampleApp/Program.cs](https://github.com/IABTechLab/uid2-client-net/blob/main/src/SampleApp/Program.cs).

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
