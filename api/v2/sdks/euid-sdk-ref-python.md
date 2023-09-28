[EUID Overview](../../../README.md) > [Getting Started -- Summary](../getting-started/gs-summary.md) > [v2](../summary-doc-v2.md) > SDKs](./summary-sdks.md) > EUID SDK for Python (Server-Side) Reference Guide

# EUID SDK for Python (Server-Side) Reference Guide

You can use the EUID SDK for Python (Server-Side) to facilitate:

- Generating UID2 advertising tokens
- Refreshing UID2 advertising tokens

This guide includes the following information:

- [Overview](#overview)
- [Functionality](#functionality)
- [Version](#version)
- [GitHub Repository/Package](#github-repositorypackage)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
- [FAQs](#faqs)
- [Usage for Publishers](#usage-for-publishers)

## Overview

The functions outlined here define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined here.

## Functionality

This SDK simplifies integration with EUID for any DSPs who are using Python for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token | Generate EUID Token from Personal Data | Refresh EUID Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported |

## Version

The SDK supports Python 3.6 and above.

## GitHub Repository/Package

This SDK is in the following open-source GitHub repository:

- [EUID SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md)

The package is published in this location:

- [https://pypi.org/project/uid2-client/](https://pypi.org/project/uid2-client/)

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the EUID service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | The endpoint for the EUID service. | N/A |
| `authKey` | The authentication token that belongs to the client. For access to EUID, see [Contact Info](../getting-started/gs-account-setup.md#contact-info). | N/A |

## Interface 

The interface allows you to decrypt EUID advertising tokens and return the corresponding raw EUID. 

>NOTE: When you use an SDK, you do not need to store or manage decryption keys.

If you're a DSP, for bidding, call the interface to decrypt an EUID advertising token and return the EUID. For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

The following example calls the decrypt method in Python:(**GWH_JN do we need to update the below code?**)

```python
from uid2_client import Uid2ClientFactory
client = Uid2ClientFactory.create(base_url, auth_key, secret_key)
decrypt_result = client.decrypt(ad_token)
```

### Response Content

Available information returned through the SDK is outlined in the following table.

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of possible values and definitions, see [Response Statuses](#response-statuses). |
| `UID2` | The raw EUID for the corresponding EUID advertising token. (**GWH_JN do we need to update?**)|
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

## Usage for Publishers

1. Create an instance of Uid2PublisherClient:(**GWH_JN do we need to update these mentions of UID2?**)

   `client = Uid2PublisherClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY)`

2. Call a function that takes the user's email address as input and generates a `TokenGenerateResponse` object. The following example uses an email address:

   `token_generate_response = client.generate_token(TokenGenerateInput.from_email(emailAddress).do_not_generate_tokens_for_opted_out())`

   >IMPORTANT: Be sure to call this function only when you have obtained legal basis to convert the user’s personal data to EUID tokens for targeted advertising.

   >`do_not_generate_tokens_for_opted_out()` applies `policy=1` in the [POST /token/generate](../endpoints/post-token-generate.md#token-generation-policy) call. Without this, `policy` is omitted to maintain backwards compatibility.

### Standard Integration

If you're using standard integration (client and server) (see [EUID SDK for JavaScript Integration Guide](../guides/publisher-client-side.md)), follow this step:

* Send this identity as a JSON string back to the client (to use in the [identity field](../sdks/client-side-identity.md#initopts-object-void)) using the following:

  `token_generate_response.get_identity_json_string()` 
  
  Note: If the user has opted out, this method returns None, so be sure to handle that case.

### Server-Only Integration

If you're using server-only integration (see [Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md)):

1. Store this identity as a JSON string in the user's session, using the `token_generate_response.get_identity_json_string()` function.

   If the user has opted out, this method returns `None`, so be sure to handle that case.
2. To retrieve the user's EUID token, use the following:

   ```
   identity = token_generate_response.get_identity()
   if identity:
      advertising_token = identity.get_advertising_token()
   ```
3. Periodically check if the user's EUID token should be refreshed. This can be done at fixed intervals using a timer, or can be done whenever the user accesses another page:
   1. Retrieve the identity JSON string from the user's session, and then call the following function that takes the identity information as input and generates an `IdentityTokens` object:

      `identity = IdentityTokens.from_json_string(identityJsonString)`
   2. Determine if the identity can be refreshed (that is, the refresh token hasn't expired):

      `if not identity or not identity.is_refreshable(): # we must no longer use this identity (for example, remove this identity from the user's session) `
   3. Determine if a refresh is needed:

      `if identity.is_due_for_refresh()):`
4. If needed, refresh the token and associated values:

   `token_refresh_response = client.refresh_token(identity)`

5. Store `token_refresh_response.get_identity_json_string()` in the user's session.

   If the user has opted out, this method returns `None`, indicating that the user's identity should be removed from the session. To confirm optout, you can use the `token_refresh_response.is_optout()` function.

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
