[EUID Overview](../../../README.md) > [Getting Started: Summary](../getting-started/gs-summary.md) > [EUID API Documentation](../summary-doc-v2.md) > [SDKs](./summary-sdks.md) > EUID SDK for C# / .NET (Server-Side) Reference Guide

# EUID SDK for C# / .NET Reference Guide

You can use the EUID SDK for C# / .NET on the server side to facilitate decrypting of EUID tokens to access the raw EUID. 

This guide includes the following information:

- [Functionality](#functionality)
- [API Permissions](#api-permissions)
- [Version](#version)
- [GitHub Repository/Binary](#github-repositorybinary)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Encryption Response Content](#encryption-response-content)
  - [Encryption Response Statuses](#encryption-response-statuses)
  - [Decryption Response Content](#decryption-response-content)
  - [Decryption Response Statuses](#decryption-response-statuses)
- [Usage for DSPs](#usage-for-dsps)
- [FAQs](#faqs)

## Functionality

This SDK simplifies integration with EUID for any DSPs who are using C# / .NET for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token | Generate EUID Token from Personal Data | Refresh EUID Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Not supported | Not supported |

## API Permissions

To use this SDK, you'll need to complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

This documentation is for the UID2 .NET SDK version 5.6.0 and above. The SDK is built for .NET Standard 2.0.

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [EUID SDK for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md)

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

The `SharingClient` class allows you to encrypt raw EUIDs into EUID tokens and decrypt EUID tokens into raw EUIDs.

>NOTE: When you use an SDK, you do not need to store or manage decryption keys.

### Encryption Response Content

When encrypting with the `SharingClient`, the SDK returns the following information:

| Property | Description |
| :--- | :--- |
| `Status` | The encryption result status. For a list of possible values and definitions, see [Encryption Response Statuses](#encryption-response-statuses). |
| `EncryptedData` | The encrypted EUID token. |

### Encryption Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The raw EUID was successfully encrypted and an EUID token was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to use the encryption key. |
| `NotAuthorizedForMasterKey` | The requester does not have authorization to use the master key. |
| `NotInitialized` | The client library is waiting to be initialized. |
| `KeysNotSynced` | The client has failed to synchronize keys from the EUID service. |
| `KeyInactive` | The encryption key is not active. |
| `EncryptionFailure` | A generic encryption failure occurred. |
<!-- `TokenDecryptFailure` intentionally omitted. Does not seem to be used by SharingClient. -->

### Decryption Response Content

Whether decrypting with the `BidstreamClient` or the `SharingClient`, the SDK returns the following information:

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
| `VersionNotSupported` |  The client library does not support the version of the encrypted token. |

## Usage for DSPs

The following instructions provide an example of how you can decode bid stream tokens using the EUID SDK for .NET as a DSP.

1. Create a `BidstreamClient`:

```cs
var client = new BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```cs
client.Refresh();
```

3. Decrypt a token into a raw EUID. Pass the token, and the domain name of the site where the bid originated from. The domain name must be all lower case, without spaces and without subdomain. For example, for `Subdomain.DOMAIN.com` , pass `domain.com` instead:

```cs
var decrypted = client.DecryptTokenIntoRawUid(uidToken, domain);
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
