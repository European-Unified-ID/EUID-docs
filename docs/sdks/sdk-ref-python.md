---
title: SDK for Python
description: Reference information about the Python server-side SDK.
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SDKsSameUID2EUID from '../snippets/_euid-sdk-same-for-all.mdx';

# SDK for Python Reference Guide

You can use the SDK for Python on the server side to facilitate the process of generating or establishing client identity using EUID, retrieving advertising tokens for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use, and automatically refreshing EUID tokens. If you have the applicable permissions, you can also decrypt EUID tokens to access the raw EUID and map personal data to raw EUIDs.

## Functionality

This SDK simplifies integration with EUID for any DSPs who are using Python for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token to Raw EUID | Generate EUID Token from Personal Data | Refresh EUID Token | Map Personal Data to Raw EUIDs | Monitor Rotated Salt Buckets&ast; |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#9989; | &#9989; | &#9989; | &#9989; |

&ast; Only applicable to SDK versions referencing versions of the `POST /identity/map` endpoint prior to version 3.

## API Permissions

To use this SDK, you'll need to complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities that require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The SDK supports Python 3.6 and above.

## GitHub Repository/Package

This SDK is in the following open-source GitHub repository:

- [SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md)

The package is published in this location:

- [https://pypi.org/project/uid2-client/](https://pypi.org/project/uid2-client/)

<SDKsSameUID2EUID/>

## Installation

You can use the [Pip](https://packaging.python.org/en/latest/guides/tool-recommendations/#installing-packages) package manager to install the SDK.

```
pip install uid2-client
```

## Initialization

The initialization step depends on the role, as shown in the following table.

| Role                                      | Create Instance of Class | Link to Instructions                                                         |
|:------------------------------------------|:-------------------------|:-----------------------------------------------------------------------------|
| Publisher                                 | `Uid2PublisherClient`    | [Usage for Publishers](#usage-for-publishers)                                |
| Advertiser/Data Provider                  | `IdentityMapV3Client`      | [Usage for Advertisers/Data Providers](#usage-for-advertisersdata-providers) |
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

| Property      | Description                                                                                                                                     |
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

2. Call a function that takes the user's email address or phone number as input and generates a `TokenGenerateResponse` object. The following example uses an email address:

   ```py
   token_generate_response = client.generate_token(TokenGenerateInput.from_email("user@example.com").do_not_generate_tokens_for_opted_out())
   ```

   :::important
   - Be sure to call this function only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> to EUID tokens for targeted advertising.

   - Always apply `do_not_generate_tokens_for_opted_out()`. This applies a parameter similar to setting `optout_check=1` in the call to the POST&nbsp;/token/generate endpoint (see [Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)).
   :::

<!-- uid2_euid_diff re legal basis for admonition above (not in UID2) -->

### Client-Server Integration

If you're using client-server integration (see [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)), follow this step:

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

   ```py
   identity = token_generate_response.get_identity()
   if identity:
      advertising_token = identity.get_advertising_token()
   ```
3. Periodically check if the user's EUID token should be refreshed. This can be done at fixed intervals using a timer, or can be done whenever the user accesses another page:
   1. Retrieve the identity JSON string from the user's session, and then call the following function that takes the identity information as input and generates an `IdentityTokens` object:

       ```py
       identity = IdentityTokens.from_json_string(identityJsonString)
       ```

    2. Determine if the identity can be refreshed (that is, the refresh token hasn't expired):

       ```py
       if not identity or not identity.is_refreshable(): 
          # we must no longer use this identity (for example, remove this identity from the user's session)
      ```

   3. Determine if a refresh is needed:

      ```py
      if identity.is_due_for_refresh():
      ```

4. If needed, refresh the token and associated values:

   ```py
   token_refresh_response = client.refresh_token(identity)
   ```

5. Store `token_refresh_response.get_identity_json_string()` in the user's session.

   If the user has opted out, this method returns `None`, indicating that the user's identity should be removed from the session. To confirm optout, you can use the `token_refresh_response.is_optout()` function.

## Usage for Advertisers/Data Providers

The following instructions provide an example of how to map personal data to raw EUIDs using the latest version of the `POST /identity/map` endpoint.

For the earlier version, see [Previous Version (v2 Identity Map)](#previous-version-v2-identity-map). For migration steps to the latest version, see [Migration From Version Using v2 Identity Map](#migration-from-version-using-v2-identity-map).

### Map Personal Data to Raw EUIDs

To map personal data to raw EUIDs, follow these steps:

1. Create an `IdentityMapV3Client` as an instance variable:
   ```py
    identity_map_v3_client = IdentityMapV3Client(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY)
   ```

2. Create an `IdentityMapV3Input` object. You can use emails, phone numbers, or their hashed forms:
   ```py
   input = IdentityMapV3Input.from_emails(["user@example.com", "user2@example.com"])
   ```
   Or combine multiple identity types:
      ```py
      input = IdentityMapV3Input()
          .with_email("user@example.com")
          .with_phone("+12345678901")
          .with_hashed_email("pre_hashed_email")
          .with_hashed_phone("pre_hashed_phone")
      ```

3. Call a function that takes the `input` and generates an `IdentityMapV3Response` object:
   ```py
   identity_map_response = identity_map_v3_client.generate_identity_map(input)
   ```

4. Retrieve the mapped and unmapped results:
   ```py
   mapped_identities = identity_map_response.mapped_identities
   unmapped_identities = identity_map_response.unmapped_identities
   ```

5. Process the results for successfully mapped identities:
   ```py
   mapped_identity = mapped_identities.get("user@example.com")
   if mapped_identity is not None:
       current_uid = mapped_identity.current_raw_uid        # Current raw EUID
       previous_uid = mapped_identity.previous_raw_uid      # Previous raw EUID (of type Optional, only available for 90 days after rotation, otherwise is None)
       refresh_from = mapped_identity.refresh_from          # When to refresh this identity (of type datetime)
   else:
       unmapped_identity = unmapped_identities.get("user@example.com")
       reason = unmapped_identity.reason # OPTOUT, INVALID_IDENTIFIER, or UNKNOWN
   ```

:::note
The SDK automatically handles email normalization and hashing, ensuring that raw email addresses and phone numbers do not leave your server.
:::

#### Usage Example

```py
client = IdentityMapV3Client(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY)

# Example 1: Single identity type
email_input = IdentityMapV3Input.from_emails(["user@example.com", "optout@example.com"])
email_response = client.generate_identity_map(email_input)

# Process email results
for email, identity in email_response.mapped_identities.items():
    print("Email: " + email)
    print("Current UID: " + identity.current_raw_uid)
    print("Previous UID: " + identity.previous_raw_uid)
    print("Refresh from: " + str(identity.refresh_from))

for email, identity in email_response.unmapped_identities.items():
    print("Unmapped email: " + email + " - Reason: " + identity.reason)

# Example 2: Mixed identity types in single request
mixed_input = IdentityMapV3Input()
    .with_email("user1@example.com")
    .with_phone("+12345678901")
    .with_hashed_email("pre_hashed_email_value")
    .with_hashed_phone("pre_hashed_phone_value")

mixed_response = client.generate_identity_map(mixed_input)
```

## Migration From Version Using v2 Identity Map

The following sections provide general information and guidance for migrating to the latest version of this SDK, which references `POST /identity/map` version 3, including:

- [Version 3 Improvements](#version-3-improvements)
- [Upgrading Client Version](#upgrading-client-version)
- [Updating Personal Data Mapping](#updating-personal-data-mapping)

### Version 3 Improvements

The `POST /v3/identity/map` provides the following improvements over v2:

- **Simplified Refresh Management**: You can monitor for EUIDs reaching `refresh_from` timestamps instead of polling <Link href="../ref-info/glossary-uid#gl-salt-bucket-id">salt buckets</Link> for rotation.
- **Previous EUID Access**: You have access to previous raw EUIDs for 90 days after rotation for campaign measurement.
- **Single Endpoint**: You use only one endpoint, `/v3/identity/map`, instead of both `/v2/identity/map` and `/v2/identity/buckets`.
- **Multiple Identity Types in One Request**: You can process both emails and phone numbers in a single request.
- **Improved Performance**: The updated version uses significantly less bandwidth to process the same amount of personal data.

### Upgrading Client Version

To upgrade your client to the latest version (version 3), follow these steps:

1. **Update dependency version**:
   ```bash
   pip install --upgrade "uid2-client>=2.6.0"
   ```

2. **Change client class**:
   ```py
   # Before
   client = IdentityMapClient(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY)

   # After
   client = IdentityMapV3Client(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY)
   ```

3. **Update import statements**:
   ```py
   from uid2_client import IdentityMapV3Client, IdentityMapV3Input, IdentityMapV3Response, UnmappedIdentityReason
   ```

### Updating Personal Data Mapping

To update personal data mapping from version 2 to version 3 of the `POST /identity/map` endpoint, follow these steps:

1. **Update input construction**:
   ```py
   # Before
   input = IdentityMapInput.from_emails(["user@example.com"])

   # After - single identity type
   input = IdentityMapV3Input.from_emails(["user@example.com"])

   # Alternatively - mix identity types (new capability)
   input = IdentityMapV3Input()
       .with_email("user@example.com")
       .with_phone("+12345678901")
   ```

2. **Update response handling**:
   ```py
   # Before
   response = client.generate_identity_map(input)
   mapped = response.mapped_identities.get("user@example.com")
   uid = mapped.get_raw_uid()

   # After
   response = client.generate_identity_map(input)
   mapped = response.mapped_identities.get("user@example.com")
   current_uid = mapped.current_raw_uid
   previous_uid = mapped.previous_raw_uid
   refresh_from = mapped.refresh_from
   ```

3. **Update error handling**:
   ```py
   # Before
   unmapped = response.unmapped_identities.get("user@example.com")
   reason = unmapped.get_reason()

   # After - structured error reasons
   unmapped = response.unmapped_identities.get("user@example.com")
   reason = unmapped.reason # Enum - OPTOUT, INVALID_IDENTIFIER, UNKNOWN

   # Alternatively, you can retrieve the reason as a string. Values match v2 unmapped values.
   raw_reason = unmapped.raw_reason
   ```

### Previous Version (v2 Identity Map)

:::note
The v2 Identity Map SDK is an earlier version maintained for backwards compatibility. Migrate to the current SDK for improved performance, multi-identity type support, and better EUID rotation management.

New integrations should not use this version.

For instructions, see [Migration From Version Using v2 Identity Map](#migration-from-version-using-v2-identity-map).
:::

To map email addresses, phone numbers, or their respective hashes to their raw EUIDs and salt bucket IDs, if you're using an earlier SDK version that uses `POST /identity/map` version 2, follow these steps.

#### Monitor Rotated Salt Buckets

To monitor salt buckets, follow these steps.

1. Create an instance of `IdentityMapClient` as an instance variable or reuse the one from [Map Personal Data to Raw EUIDs:](#map-personal-data-to-raw-euids)

   ```py
   client = IdentityMapClient(base_url, api_key, client_secret)
   ```

2. Call a function that takes the timestamp string as input and generates an `IdentityBucketsResponse` object. The timestamp string should be in ISO 8601 format: `YYYY-MM-DD[*HH[:MM[:SS[.fff[fff]]]][+HH:MM[:SS[.ffffff]]]]`.
The following examples are valid timestamp strings:
   - Date in local timezone: `2024-08-18`
   - Date and time in UTC: `2024-08-18T14:30:15.123456+00:00`
   - Date and time in CEST: `2024-08-18T14:30:15.123456+02:00`

   ```py
      since_timestamp = '2024-08-18T14:30:15+00:00'
      identity_buckets_response = client.get_identity_buckets(datetime.fromisoformat(since_timestamp))
   ```

3. The `IdentityBucketsResponse` object contains the `bucket_id` and the `last_updated` timestamp which is in UTC. Iterate through the list of rotated salt buckets and extract the `bucket_id` and `last_updated` timestamp as follows:

   ```py
   if identity_buckets_response.buckets:
       for bucket in identity_buckets_response.buckets:
           bucket_id = bucket.get_bucket_id()         # example "bucket_id": "a30od4mNRd"
           last_updated = bucket.get_last_updated()   # example "last_updated" "2024-08-19T22:52:03.109"
   else:
       print("No bucket was returned")
   ```

## Usage for DSPs

The following instructions provide an example of how you can decode <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> tokens using the SDK for Python as a DSP.

1. Create a `BidstreamClient`:

```py
client = BidstreamClient(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY)
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```py
client.refresh()
```

3. Decrypt a token into a raw EUID. Pass the token, and then do one of the following:
   * If the bid request originated from a publisher's website, pass the domain name. The domain name must be all lower case, without spaces and without subdomain. For example, for `Subdomain.DOMAIN.com`, pass `domain.com` instead. <!--    * If the bid request originated from a mobile app, pass the <Link href="../ref-info/glossary-uid#gl-app-name">app name</Link>. -->
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
