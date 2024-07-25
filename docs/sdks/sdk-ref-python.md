---
title: EUID SDK for Python
description: Reference information about the Python server-side SDK.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# EUID SDK for Python (Server-Side) Reference Guide

You can use the EUID SDK for Python (Server-Side) to facilitate:

- Generating EUID advertising tokens
- Refreshing EUID advertising tokens
- Decrypting EUID tokens to access the raw EUIDs

:::note
This SDK is valid for UID2 and EUID. Some of the code naming and URLs are labelled as UID2. These apply equally to EUID.
:::

## Functionality

This SDK simplifies integration with EUID for any DSPs who are using Python for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token | Generate EUID Token from Personal Data | Refresh EUID Token | Map Personal Data to a Raw EUID |
| :--- | :--- | :--- | :--- | :--- |
| Not Supported | Supported | Supported | Supported | Supported |

## API Permissions

To use this SDK, you'll need to complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities that require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The SDK supports Python 3.6 and above.

## GitHub Repository/Package

This SDK is in the following open-source GitHub repository:

- [EUID SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md)

The package is published in this location:

- [https://pypi.org/project/uid2-client/](https://pypi.org/project/uid2-client/)

## Initialization

The initialization step depends on the role, as shown in the following table.

| Role                                      | Create Instance of Class | Link to Instructions                                                         |
|:------------------------------------------|:-------------------------|:-----------------------------------------------------------------------------|
| Publisher                                 | `Uid2PublisherClient`    | [Usage for Publishers](#usage-for-publishers)                                |
| Advertiser/Data Provider                  | `IdentityMapClient`      | [Usage for Advertisers/Data Providers](#usage-for-advertisersdata-providers) |
| DSP                                       | `BidstreamClient`        | [Usage for DSPs](#usage-for-dsps)                                            |
| Sharer (not currently supported for EUID) | `SharingClient`          | Not applicable                                                               |

You will need to provide the values necessary for the SDK to authenticate with the EUID service.

| Parameter    | Description                                                                                |
|:-------------|:-------------------------------------------------------------------------------------------|
| `base_url`   | The endpoint for the EUID service. See [Environments](../getting-started/gs-environments). |
| `auth_key`   | The API key. See [EUID Credentials](../getting-started/gs-credentials).                    |
| `secret_key` | The client secret. See [EUID Credentials](../getting-started/gs-credentials).              |

## Interface
The `BidstreamClient` class allows you to decrypt EUID tokens into raw EUIDs.

For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

:::note
When you use an SDK, you do not need to store or manage decryption keys.
:::

### Decryption Response Content

Whether decrypting with the `BidstreamClient` class<!--  or the `SharingClient` class -->, the SDK returns the information shown in the following table.

| Methods       | Description                                                                                                                                     |
|:--------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| `status`      | The decryption result status. For a list of possible values and definitions, see [Decryption Response Statuses](#decryption-response-statuses). |
| `uid`         | The raw EUID for the corresponding EUID token.                                                                                                  |
| `established` | The timestamp indicating when a user first established the EUID with the publisher.                                                             |


### Decryption Response Statuses

Decryption response codes, and their meanings, are shown in the following table.

| Value                      | Description                                                             |
|:---------------------------|:------------------------------------------------------------------------|
| `SUCCESS`                  | The EUID token was decrypted successfully and a raw EUID was returned.  |
| `NOT_AUTHORIZED_FOR_KEY`   | The requester does not have authorization to decrypt this EUID token.   |
| `NOT_INITIALIZED`          | The client library is waiting to be initialized.                        |
| `INVALID_PAYLOAD`          | The incoming EUID token is not a valid payload.                         |
| `EXPIRED_TOKEN`            | The incoming EUID token has expired.                                    |
| `KEYS_NOT_SYNCED`          | The client has failed to synchronize keys from the EUID service.        |
| `VERSION_NOT_SUPPORTED`    | The client library does not support the version of the encrypted token. |
| `DOMAIN_NAME_CHECK_FAILED` | The domain name doesn't match the domain of the encrypted token.        |
| `INVALID_TOKEN_LIFETIME`   | The token has an invalid timestamp.                                     |


## Usage for Publishers

1. Create an instance of Uid2PublisherClient:

   ```py
   client = Uid2PublisherClient(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY)
   ```

2. Call a function that takes the user's email address as input and generates a `TokenGenerateResponse` object<!-- . The following example uses an email address -->:

   ```py
   token_generate_response = client.generate_token(TokenGenerateInput.from_email(emailAddress).do_not_generate_tokens_for_opted_out())
   ```

   :::important
   - Be sure to call the POST&nbsp;/token/generate endpoint only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> to EUID tokens for targeted advertising.

   - Always apply `do_not_generate_tokens_for_opted_out()`. This applies a parameter similar to setting `optout_check=1` in the call to the POST&nbsp;/token/generate endpoint (see [Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)).
   :::

   <!-- uid2_euid_diff re legal basis for admonition above (not in UID2) -->

#### Client-Server Integration

If you're using client-server integration (see [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)), follow this step:

* Send this identity as a JSON string back to the client (to use in the [identity field](../sdks/sdk-ref-javascript.md#initopts-object-void)) using the following:

  ```py
  token_generate_response.get_identity_json_string()
  ```

  :::note
  If the user has opted out, this method returns None, so be sure to handle that case.
  :::

### Server-Side Integration

If you're using server-side integration (see [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)):

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

## Usage for Advertisers/Data Providers
1. Create an instance of `IdentityMapClient` as an instance variable.
   ```py
   client = IdentityMapClient(base_url, api_key, client_secret)
   ```

2. Call a function that takes email addresses as input and generates an `IdentityMapResponse` object<!-- . The following example uses email addresses -->:
   ```py
   identity_map_response = client.generate_identity_map(IdentityMapInput.from_emails(["email1@example.com", "email2@example.com"]))
   ```

:::note
The SDK hashes input values before sending them. This ensures that raw email addresses do not leave your server.
:::

3. Retrieve the mapped and unmapped results as follows:
   ```py
   mapped_identities = identity_map_response.mapped_identities
   unmapped_identities = identity_map_response.unmapped_identities
    ```

4. Iterate through the mapped and unmapped results, or do a lookup. The following example does a lookup:
   ```py
    mapped_identity = mapped_identities.get("email1@example.com")
    if mapped_identity is not None:
        raw_uid = mapped_identity.get_raw_uid()
    else:
        unmapped_identity = unmapped_identities.get("email1@example.com")
        reason = unmapped_identity.get_reason()
   ```

## Usage for DSPs

The following instructions provide an example of how you can decode <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> tokens using the EUID SDK for Python as a DSP.

1. Create a `BidstreamClient`:

```py
client = BidstreamClient(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY)
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```py
client.refresh()
```

3. Decrypt a token into a raw EUID. Pass the token, and then do one of the following:
* If the bid request originated from a publisher's website, pass the domain name. The domain name must be all lower case, without spaces and without subdomain. For example, for `Subdomain.DOMAIN.com`, pass `domain.com` instead.
<!-- * If the bid request originated from a mobile app, pass the <Link href="../ref-info/glossary-uid#gl-app-name">app name</Link>. -->
* Otherwise, pass `null`.

```py
decrypted = client.decrypt_token_into_raw_uid(uid_token, domainOrAppName)
# If decryption succeeded, use the raw EUID.
if decrypted.success:
    #  Use decrypted.uid
else:
   # Check decrypted.status for the failure reason.
```

For a full example, see the `sample_bidstream_client.py` in [examples/sample_bidstream_client.py](https://github.com/IABTechLab/uid2-client-python/blob/main/examples/sample_bidstream_client.py).

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
