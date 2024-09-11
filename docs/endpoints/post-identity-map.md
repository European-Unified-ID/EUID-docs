---
title: POST /identity/map
description: Maps personal data to raw EUIDs and salt bucket IDs.
hide_table_of_contents: false
sidebar_position: 08
---

import Link from '@docusaurus/Link';

# POST /identity/map

Maps multiple email addresses or email address hashes to their raw EUIDs and salt bucket IDs. You can also use this endpoint to check for updates to opt-out information.

Used by: This endpoint is used mainly by advertisers and data providers. For details, see [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md).

## Batch Size and Request Parallelization Requirements

Here's what you need to know:

- The maximum request size is 1MB. 
- To map a large number of email addresses or email address hashes, send them in *sequential* batches with a maximum batch size of 5,000 items per batch.
- Unless you are using a Private Operator, do not send batches in parallel. In other words, use a single HTTP connection and map <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> consecutively.
- Be sure to store mappings of email addresses or email address hashes.<br/>Not storing mappings may increase processing time drastically when you have to map millions of email addresses. Recalculating only those mappings that actually need to be updated, however, reduces the total processing time because only about 1/365th of raw EUIDs need to be updated daily. See also [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) and [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).

## Request Format

`POST '{environment}/v2/identity/map'`

:::important
You must encrypt all requests using your secret. For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
:::

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Integration environment: `https://integ.euid.eu`<br/>Production environment: `https://prod.euid.eu`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md). |

:::note
The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.
:::

### Unencrypted JSON Body Parameters

:::important
You must include only **one** of the following two conditional parameters as a key-value pair in the JSON body of the request when encrypting it.
:::

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string array | Conditionally Required | The list of email addresses to be mapped. |
| `email_hash` | string array | Conditionally Required | The list of [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) hashes of [normalized](../getting-started/gs-normalization-encoding.md#email-address-normalization) email addresses to be mapped. |

### Request Examples

The following are unencrypted JSON request body examples for each parameter, one of which you should include in your identity mapping requests:

```json
{
    "email":[
        "user@example.com",
        "user2@example.com"
    ]
}
```
```json
{
    "email_hash":[
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
        "KzsrnOhCq4tqbGFMsflgS7ig1QLRr0nFJrcrEIlOlbU="
    ] 
}
```

Here's an encrypted identity mapping request format with placeholder values:

```sh
echo '[Unencrypted-JSON-Request-Body]' \
  | encrypt_request.py [CLIENT_SECRET] \
  | curl -X POST 'https://prod.euid.eu/v2/identity/map' -H 'Authorization: Bearer [CLIENT_API_KEY]' -d @- \
  | decrypt_response.py [CLIENT_SECRET] 
```

Here's an encrypted identity mapping request example for email addresses:

```sh
echo '{"email": ["user@example.com", "user2@example.com"]}' \
  | encrypt_request.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= \
  | curl -X POST 'https://prod.euid.eu/v2/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -d @- \
  | decrypt_response.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= 
```

For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

:::note
The response is encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.
:::

A successful decrypted response returns the raw EUIDs and salt bucket IDs for the specified email addresses or email address hashes.

```json
{
    "body":{
        "mapped": [
            {
                "identifier": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
                "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "bucket_id": "a30od4mNRd"
            },
            {
                "identifier": "KzsrnOhCq4tqbGFMsflgS7ig1QLRr0nFJrcrEIlOlbU=",
                "advertising_id": "IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=",
                "bucket_id": "ad1ANEmVZ"
            }
        ]
    },
    "status":"success"
}
```

### Response Body Properties

The response body includes the properties shown in the following table.

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `identifier` | string | The email address or email address hash specified in the request body. |
| `advertising_id` | string | The corresponding advertising ID (raw EUID). |
| `bucket_id` | string | The ID of the salt bucket used to generate the EUID. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is anything other than `success`, the `message` field provides additional information about the issue.
