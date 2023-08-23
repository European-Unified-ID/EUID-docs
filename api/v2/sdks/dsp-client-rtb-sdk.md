[EUID Overview](../../../README.md) > [Getting Started -- Summary](../getting-started/gs-summary.md) > [v2](../summary-doc-v2.md) > SDKs](./summary-sdks.md) > Server-Side SDK Guide

# Server-Side SDK Guide

You can use EUID server-side SDKs to facilitate decrypting EUID advertising tokens to access the raw EUID. 

This guide includes the following information:

- [Overview](#overview)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
* [FAQs](#faqs)

## Overview

The following functions define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined below.

Libraries are currently available in the following languages. More languages are in development.

>NOTE: The libraries below are for EUID as well as UID2.

| Language | Link to SDK Repo |
| :--- | :--- |
| C#  | [UID2 SDK for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md) |
| C++ | [UID2 SDK for C++](https://github.com/IABTechLab/uid2-client-cpp11/blob/master/README.md) |
| Java | [UID2 SDK for Java](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md) |
| Python | [UID2 SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md) |

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the EUID service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | The endpoint for the EUID service. | N/A |
| `authKey` | The authentication token that belongs to the client. For access to EUID, see [Contact Info](../getting-started/gs-account-setup.md#contact-info). | N/A |
| `refreshIntervalMs` | The refresh cadence, in milliseconds, for fetching the decryption keys.| `300,000` milliseconds (5 minutes) |
| `retryIntervalMs` | The retry cadence, in millisecond, for retrying the request if there is an error.  | `30,000` milliseconds (30 seconds) |

## Interface 

The interface allows you to decrypt EUID advertising tokens and return the corresponding raw EUID. 

>NOTE: When you use an SDK, you do not need to store or manage decryption keys.

If you're a DSP, for bidding, call the interface to decrypt an EUID advertising token and return the EUID. For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

```java
public Response Decrypt(String encryptedToken)
```

Available information returned through the SDK is outlined in the following table.

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of possible values and definitions, see [Response Statuses](#response-statuses). |
| `EUID` | The raw EUID for the corresponding EUID advertising token. |
| `Established` | The timestamp when a user first established the EUID with the publisher. |

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

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for Demand-Side Platforms (DSPs)](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps).

For a full list, see [Frequently Asked Questions](../getting-started/gs-faqs.md).
