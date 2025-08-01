---
title: POST /token/refresh
description: Uses the refresh token to generate an updated EUID token.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import IdentityGenerateResponse from '../snippets/_example-identity-generate-response.mdx';

# POST /token/refresh

Generates a new <Link href="../ref-info/glossary-uid#gl-euid-token">EUID token</Link> by sending the corresponding unexpired refresh token, returned by the [POST&nbsp;/token/generate](post-token-generate.md) endpoint.

Used by: This endpoint is used mainly by publishers.

You can call this endpoint from the client side (for example, a browser or a mobile app) because it does not require using an <Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>.

:::note
Rather than calling this endpoint directly, you could use one of the EUID SDKs to manage it for you. For a summary of options, see [SDKs: Summary](../sdks/summary-sdks.md).
:::

## Request Format 

`POST '{environment}/v2/token/refresh'`

Add the content of the `refresh_token` value, returned in the response from the previous [POST&nbsp;/token/generate](post-token-generate.md) or `POST /token/refresh` operation, as the POST body.

Here's what you need to know about this endpoint:

- No encryption is required for requests to the `POST /token/refresh` endpoint.
- If the request is successful, with an HTTP status code of 200, a new EUID token or opt-out information is returned.
- Successful responses, whether the response includes a new token or opt-out information, are encrypted. Error responses are not encrypted.
- To decrypt responses, use the most recent `refresh_response_key` value for this token. The `refresh_response_key` value is returned in the response to the [POST&nbsp;/token/generate](post-token-generate.md) and `POST /token/refresh` operations. Each time a token is refreshed, a new `refresh_response_key` is returned. Be sure to use the most recent one to decrypt the current response.

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing (integration) environment: `https://integ.euid.eu`<br/>Production environment: `https://prod.euid.eu`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md).<br/>Notes:<ul><li>The `integ` environment and the `prod` environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.</li><li>Token expiration time is subject to change, but is always significantly shorter in the `integ` environment than it is in the `prod` environment.</li></ul> |

#### Testing Notes

Using either of the following parameters in a [POST&nbsp;/token/generate](post-token-generate.md) request always generates an identity response with a `refresh_token` that results in a logout response when used with the `POST /token/refresh` endpoint:

- The `refresh-optout@example.com` email address
- The `+00000000002` phone number

### Request Example

For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

A decrypted successful response includes a new EUID token (`advertising_token`) and associated values for the user, or indicates that the user has opted out. 

:::note
The response is encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.
:::

This section includes the following sample responses:

* [Successful Response With Tokens](#successful-response-with-tokens)
* [Successful Response With Opt-Out](#successful-response-with-opt-out)
* [Error Response](#error-response)

#### Successful Response With Tokens

If all values are valid and the user has not opted out, the response is successful and a new EUID token is returned, with associated values. The following example shows a decrypted successful response with tokens:

<IdentityGenerateResponse />

#### Successful Response With Opt-Out

If the user has opted out, the response is successful but a new EUID token is not returned. The following example shows a decrypted opt-out response:

```json
{
  "status": "optout"
}
```

#### Error Response

An error response might look like the following:

```json
{
  "status": "client_error",
  "message": "Client Error"
}
```

### Response Body Properties

The response body includes the properties shown in the following table.

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | The <Link href="../ref-info/glossary-uid#gl-euid-token">EUID token</Link> (also known as advertising token) for the user. |
| `refresh_token` | string | An encrypted token that can be exchanged with the EUID Service for the latest set of identity tokens. |
| `identity_expires` | number | The <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> timestamp (in milliseconds) that indicates when the EUID token expires. |
| `refresh_from` | number | The Unix timestamp (in milliseconds) that indicates when the SDK for JavaScript (see [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md)) will start refreshing the EUID token, if the SDK is in use.<br/>TIP: If you are not using the SDK, consider refreshing the EUID token from this timestamp, too. |
| `refresh_expires` | number | The Unix timestamp (in milliseconds) that indicates when the refresh token expires. |
| `refresh_response_key` | string | A key to be used in a new [POST&nbsp;/token/refresh](post-token-refresh.md) request for response decryption. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful and a new EUID token, with associated values, is returned in the response. The response is encrypted. |
| `optout` | 200 | The user opted out. This status is returned only for authorized requests. The response is encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `invalid_token` | 400 | The `refresh_token` value specified in the request was invalid. This status is returned only for authorized requests. |
| `expired_token` | 400 | The `refresh_token` value specified in the request was an expired token. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is anything other than `success` or `optout`, the `message` field provides additional information about the issue.
