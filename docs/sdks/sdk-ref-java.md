---
title: SDK for Java
description: Reference information about the Java server-side SDK.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# SDK for Java Reference Guide

You can use the SDK for Java on the server side to facilitate the process of generating or establishing client identity using EUID, retrieving advertising tokens for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use, and automatically refreshing EUID tokens. If you have the applicable permissions, you can also decrypt EUID tokens to access the raw EUID and map personal data to raw EUIDs.

:::note
This SDK is valid for UID2 and EUID. Some of the code naming and URLs are labelled as UID2. These apply equally to EUID.
:::

## Functionality

This SDK simplifies integration with EUID for any publishers, DSPs, advertisers, and data providers who are using Java for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw EUID to EUID Token | Decrypt EUID Token to Raw EUID | Generate EUID Token from Personal Data | Refresh EUID Token | Map Personal Data to Raw EUIDs | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#9989; | &#9989; | &#9989; | &#8212; |

## API Permissions

To use this SDK, you'll need to complete the EUID account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities that require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The SDK requires Java version 1.8 or later.

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [SDK for Java](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md)

  >NOTE: This SDK is valid for both UID2 and EUID. The SDK, and some of its technical components, are named UID2, but are equally applicable for EUID.

The binary is published on the Maven repository:

- [https://central.sonatype.com/artifact/com.uid2/uid2-client](https://central.sonatype.com/artifact/com.uid2/uid2-client)

## Initialization

The initialization step depends on the role, as shown in the following table.

| Role                                      | Create Instance of Class | Link to Instructions                                                         |
|:------------------------------------------| :--- |:-----------------------------------------------------------------------------|
| Publisher                                 | `PublisherUid2Client` | [Usage for Publishers](#usage-for-publishers)                                |
| Advertiser/Data Provider                  | `IdentityMapClient` | [Usage for Advertisers/Data Providers](#usage-for-advertisersdata-providers) |
| DSP                                       | `BidstreamClient` | [Usage for DSPs](#usage-for-dsps)                                            |
| Sharer (not currently supported for EUID) | `SharingClient` | Not applicable                                                               |

You will need to provide the values necessary for the SDK to authenticate with the EUID service.

| Parameter | Description                                                                                | 
| :--- |:-------------------------------------------------------------------------------------------|
| `baseUrl/uid2BaseUrl` | The endpoint for the EUID service. See [Environments](../getting-started/gs-environments). | 
| `clientApiKey` | The API key. See [EUID Credentials](../getting-started/gs-credentials).                    | 
| `base64SecretKey` | The client secret. See [EUID Credentials](../getting-started/gs-credentials).              | 

### Interface

The `BidstreamClient` class allows you to decrypt EUID tokens into raw EUIDs.

For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

The `SharingClient` class allows you to encrypt raw EUIDs into EUID tokens and decrypt EUID tokens into raw EUIDs.

:::note
When you use an SDK, you do not need to store or manage decryption keys.
:::

### Encryption Response Content

When encrypting with the `SharingClient` class, the SDK returns the information shown in the following table.

| Method               | Description                                                                                                                                     |
|:---------------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| `getStatus()`        | The encryption result status. For a list of possible values and definitions, see [Encryption Response Statuses](#encryption-response-statuses). |
| `getEncryptedData()` | The encrypted EUID token.                                                                                                                       |

### Encryption Response Statuses

Encryption response codes, and their meanings, are shown in the following table.

| Value                           | Description
|:--------------------------------|:-----------------------------------------------------------------------|
| `SUCCESS`                       | The raw EUID was successfully encrypted and an EUID token was returned. |
| `NOT_AUTHORIZED_FOR_KEY`        | The requester does not have authorization to use the <a href="../ref-info/glossary-uid#gl-encryption-key">encryption key</a>.   |
| `NOT_AUTHORIZED_FOR_MASTER_KEY` | The requester does not have authorization to use the master key.       |
| `NOT_INITIALIZED`               | The client library is waiting to be initialized.                       |
| `KEYS_NOT_SYNCED`               | The client has failed to synchronize keys from the EUID service.       |
| `ENCRYPTION_FAILURE`            | A generic encryption failure occurred.                                 |

### Decryption Response Content

Whether decrypting with the `BidstreamClient` class<!--  or the `SharingClient` class -->, the SDK returns the information shown in the following table.

| Methods            | Description                                                                                                                                     |
|:-------------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| `getStatus()`      | The decryption result status. For a list of possible values and definitions, see [Decryption Response Statuses](#decryption-response-statuses). |
| `getSiteId()`      | The raw EUID for the corresponding EUID token.                                                                                                  |
| `getEstablished()` | The timestamp indicating when a user first established the EUID with the publisher.                                                             |

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
| `INVALID_TOKEN_LIFETIME`   | The token has an invalid timestamp.                                     |

## Usage for Publishers

As a publisher, there are two ways to use the SDK for Java: 
1. [**Basic Usage**](#basic-usage) is for publishers who want to use this SDK's HTTP implementation (synchronous [OkHttp](https://square.github.io/okhttp/)).
2. [**Advanced Usage**](#advanced-usage) is for publishers who prefer to use their own HTTP library. 

For an example application that demonstrates both Basic and Advanced usage, see [Java Integration Example](https://github.com/UnifiedID2/uid2-examples/tree/main/publisher/uid2-java-test-site#readme).

### Basic Usage

If you're using the SDK's HTTP implementation, follow these steps.

1. Create an instance of `PublisherUid2Client` as an instance variable:

   ```java
   private final PublisherUid2Client publisherUid2Client = new PublisherUid2Client(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY);
   ```

2. Call a function that takes the user's email address or phone number as input and generates a `TokenGenerateResponse` object. The following example uses an email address:
   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Client.generateTokenResponse(TokenGenerateInput.fromEmail(emailAddress).doNotGenerateTokensForOptedOut());
   ```

   :::important
   - Be sure to call the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> to EUID tokens for targeted advertising.

   - Always apply `doNotGenerateTokensForOptedOut()`. This applies a parameter similar to setting `optout_check=1` in the call to the POST&nbsp;/token/generate endpoint (see [Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)).
   :::

   <!-- uid2_euid_diff re legal basis for admonition above (first bullet not in UID2) -->

#### Basic Usage, Client-Server Integration

If you're using client-server integration (see [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)), follow this step:

* Send this identity as a JSON string back to the client (to use in the [identity field](../sdks/sdk-ref-javascript.md#initopts-object-void)), using the following:

   ```java
   tokenGenerateResponse.getIdentityJsonString()
   ```

   :::note
   If the user has opted out, this method returns `null`, so be sure to handle that case.
   :::

#### Basic Usage, Server-Side Integration

If you're using server-side integration (see [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)), follow these steps:

1. Store this identity as a JSON string in the user's session, using the `tokenGenerateResponse.getIdentityJsonString()` function.

   If the user has opted out, this method returns `null`, so be sure to handle that case.

2. To retrieve the user's EUID token, use the following:

   ```java
   IdentityTokens identity = tokenGenerateResponse.getIdentity();
   if (identity != null) { String advertisingToken = identity.getAdvertisingToken(); }
   ```
3. When the user accesses another page, or on a timer, determine whether a refresh is needed:
   1. Retrieve the identity JSON string from the user's session, and then call the following function that takes the identity information as input and generates an `IdentityTokens` object:

      ```java
      IdentityTokens identity = IdentityTokens.fromJsonString(identityJsonString);
      ```
   2. Determine if the identity can be refreshed (that is, the refresh token hasn't expired):

      ```java
      if (identity == null || !identity.isRefreshable()) { we must no longer use this identity (for example, remove this identity from the user's session) }
      ```
   3. Determine if a refresh is needed:

      ```java
      if (identity.isDueForRefresh()) {..}
      ```
4. If needed, refresh the token and associated values:
 
   ```java
   TokenRefreshResponse tokenRefreshResponse = publisherUid2Client.refreshToken(identity);
   ```
 
5. Store `tokenRefreshResponse.getIdentityJsonString()` in the user's session.

   If the user has opted out, this method returns `null`, indicating that the user's identity should be removed from the session. To confirm optout, you can use the `tokenRefreshResponse.isOptout()` function.

### Advanced Usage

1. Create an instance of `PublisherUid2Helper` as an instance variable:

    ```java
    private final PublisherUid2Helper publisherUid2Helper = new PublisherUid2Helper(EUID_SECRET_KEY);
    ```
2. Call a function that takes the user's email address or phone number as input and creates a secure request data envelope. See [Encrypting requests](../getting-started/gs-encryption-decryption.md#encrypting-requests). The following example uses an email address:

    ```java
    EnvelopeV2 envelope = publisherUid2Helper.createEnvelopeForTokenGenerateRequest(TokenGenerateInput.fromEmail(emailAddress).doNotGenerateTokensForOptedOut());
    ```
3. Using an HTTP client library of your choice, post this envelope to the [POST&nbsp;token/generate](../endpoints/post-token-generate.md) endpoint, including headers and body:
   1. Headers: Depending on your HTTP library, this might look something like the following:  
    
      `.putHeader("Authorization", "Bearer " + EUID_API_KEY)`  
      `.putHeader("X-UID2-Client-Version", PublisherUid2Helper.getVersionHeader())`
   2. Body: `envelope.getEnvelope()`
   :::important
   - Be sure to call the POST&nbsp;/token/generate endpoint only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> to EUID tokens for targeted advertising.

   - Always apply `doNotGenerateTokensForOptedOut()`. This applies a parameter similar to setting `optout_check=1` in the call to the POST&nbsp;/token/generate endpoint (see [Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)).
   :::

<!-- uid2_euid_diff re legal basis for admonition above (first bullet not in UID2) -->

4. If the HTTP response status code is _not_ 200, see [Response Status Codes](../endpoints/post-token-generate.md#response-status-codes) to determine next steps. Otherwise, convert the EUID identity response content into a `TokenGenerateResponse` object:

   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Helper.createTokenGenerateResponse({response body}, envelope);
   ```

#### Advanced Usage, Client-Server Integration

If you're using client-server integration (see [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)), follow this step:

* Send this identity as a JSON string back to the client (to use in the [identity field](../sdks/sdk-ref-javascript.md#initopts-object-void)) using the following:

    ```java
    tokenGenerateResponse.getIdentityJsonString()
    ```

    :::caution
    This method returns null if the user has opted out, so be sure to handle that case.
    :::

#### Advanced Usage, Server-Side Integration

If you're using server-side integration (see [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)):

1. Store this identity as a JSON string in the user's session, using: `tokenGenerateResponse.getIdentityJsonString()`.

   This method returns null if the user has opted out, so be sure to handle that case.
2. To retrieve the user's EUID token, use:

   ```java
   IdentityTokens identity = tokenGenerateResponse.getIdentity();
   if (identity != null) { String advertisingToken = identity.getAdvertisingToken(); }
   ```

3. When the user accesses another page, or on a timer, determine whether a refresh is needed:
   1. Retrieve the identity JSON string from the user's session, and then call the following function that generates an `IdentityTokens` object:
   
       ```java
       IdentityTokens identity = IdentityTokens.fromJsonString(identityJsonString);
       ```
   2. Determine whether the identity can be refreshed (that is, the refresh token hasn't expired): 
    
      ```java
      if (identity == null || !identity.isRefreshable()) { we must no longer use this identity (for example, remove this identity from the user's session) }
      ```
   3. Determine whether a refresh is needed:
   
      ```java
      if (identity.isDueForRefresh()) {..}
      ```
4. If a refresh is needed, call the [POST token/refresh](../endpoints/post-token-refresh.md) endpoint, with the following:
   1. Headers: Depending on your HTTP library, this might look something like the following:
    
      `.putHeader("Authorization", "Bearer " + EUID_API_KEY)`  
      `.putHeader("X-UID2-Client-Version", PublisherUid2Helper.getVersionHeader())`. 
   2. Body: `identity.getRefreshToken()`
5. If the refresh HTTP response status code is 200:

   ```java
   TokenRefreshResponse tokenRefreshResponse = PublisherUid2Helper.createTokenRefreshResponse({response body}, identity);
   ```
6. Store `tokenRefreshResponse.getIdentityJsonString()` in the user's session.

   If the user has opted out, this method returns null, indicating that the user's identity should be removed from the session. To confirm optout, you can use the `tokenRefreshResponse.isOptout()` function.

## Usage for Advertisers/Data Providers

1. Create an instance of IdentityMapClient as an instance variable.
   ```java
   final private IdentityMapClient identityMapClient = new IdentityMapClient(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY);
   ```

2. Call a function that takes email addresses or phone numbers as input and generates an IdentityMapResponse object. The following example uses email addresses:
   ```java
   IdentityMapResponse identityMapResponse = identityMapClient.generateIdentityMap(IdentityMapInput.fromEmails(Arrays.asList("email1@example.com", "email2@example.com")));
   ```

   >Note: The SDK hashes input values before sending them. This ensures that raw email addresses and phone numbers do not leave your server.

3. Retrieve the mapped and unmapped results as follows:
   ```java
   Map<String, IdentityMapResponse.MappedIdentity> mappedIdentities = identityMapResponse.getMappedIdentities();
   Map<String, IdentityMapResponse.UnmappedIdentity> unmappedIdentities = identityMapResponse.getUnmappedIdentities();`
   ```

4. Iterate through the mapped and unmapped results, or do a lookup. The following example does a lookup:
   ```java
   IdentityMapResponse.MappedIdentity mappedIdentity = mappedIdentities.get("email1@example.com");
   if (mappedIdentity != null) {
        String rawUid = mappedIdentity.getRawUid();
   } else {
        IdentityMapResponse.UnmappedIdentity unmappedIdentity = unmappedIdentities.get("email1@example.com");
        String reason = unmappedIdentity.getReason();
   }
   ```

## Usage for DSPs

The following instructions provide an example of how a DSP can decode <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> tokens using the SDK for Java.

1. Create a `BidstreamClient`:

```java
Bidstream client = new BidstreamClient(EUID_BASE_URL, EUID_API_KEY, EUID_SECRET_KEY);
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```java
client.refresh();
```

3. Decrypt a token into a raw EUID. Pass the token, and then do one of the following:
   * If the bid request originated from a publisher's website, pass the domain name. The domain name must be all lower case, without spaces and without subdomain. For example, for `Subdomain.DOMAIN.com`, pass `domain.com` instead.
   * If the bid request originated from a mobile app, pass the <Link href="../ref-info/glossary-uid#gl-app-name">app name</Link>.
   * Otherwise, pass `null`.

```java
DecryptionResponse decrypted = client.decryptTokenIntoRawUid(uidToken, domainOrAppName); 
//If decryption succeeded, use the raw EUID.
if (decrypted.isSuccess()) 
{
    //Use decrypted.getUid()
}
else 
{
    // Check decrypted.getStatus() for the failure reason.
}
```

For a full example, see the `ExampleBidStreamClient` method in [test/IntegrationExamples.java](https://github.com/IABTechLab/uid2-client-java/blob/main/src/test/java/com/uid2/client/test/IntegrationExamples.java).

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
