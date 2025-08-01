---
title: POST /optout/status
description: Checks the opt-out status of raw EUIDs.
hide_table_of_contents: false
sidebar_position: 03
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# POST /optout/status

Checks the opt-out status of <Link href="../ref-info/glossary-uid#gl-raw-euid">raw EUIDs</Link>. Given a list of raw EUIDs, this endpoint returns the raw EUIDs that have opted out, as well as the time that the opt-out took place. For more information, see [User Opt-Out](../getting-started/gs-opt-out.md).

Used by: This endpoint is used by advertisers, data providers, and DSPs. More generally, this is for participants who have access to raw EUIDs but do not have access to the underlying email addresses or phone numbers and want to know opt-out status.

For details, refer to the following documentation, depending on your role:

- [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md)
- [DSP Integration Guide](../guides/dsp-guide.md)

## Batch Size and Request Parallelization Requirements

The key guidelines for managing batches of requests to this endpoint are as follows:

- To check the opt-out status of a large number of EUIDs, send them in sequential batches with a maximum batch size of 5,000 items per batch.
- Unless you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>, do not send batches in parallel. In other words, use a single HTTP connection and send batches of raw EUIDs consecutively, without creating multiple parallel connections.

## Request Format

`POST '{environment}/v2/optout/status'`

For authentication details, see [Authentication and Authorization](../getting-started/gs-auth.md).

:::important
You must encrypt all requests using your secret. For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
:::

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Integration environment: `https://integ.euid.eu`.<br/>Production environment: `https://prod.euid.eu`.<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md). |

:::note
The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.
:::

### Unencrypted JSON Body Parameters

There is a single body parameter.

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `advertising_ids` |	string array |	Required |	The list of raw EUIDs for which you want to check the opt-out status.<br/>Include a maximum of 5,000 entries in one API call. |

### Request Example

The following is an example of an unencrypted JSON request body:

```json
{
  "advertising_ids": [
    "ufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc=",
    "zstfu9RG/Ih5trR6hlaHP6hw5yt9mYd5TKg2mRpWVng=",
    "VZqcve81+ImeoNUsizTFLEMOvREptJo1ROZvKw9ibSM="
  ]
}
```

The following is an encrypted opt-out status request example:

```json
echo '{"advertising_ids": ["Eufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc"]}' | python3 uid2_request.py https://prod.euid.eu/v2/optout/status [Your-Client-API-Key] [Your-Client-Secret]
```

:::note
Even though the script is named for UID2, it is applicable to EUID also.
:::

For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

:::note
The response is encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.
:::

A successful decrypted response returns the raw EUIDs that have opted out. For each, it includes the time at which the opt-out request was made. EUIDs that have not opted out are not included in the response.

```json
{
  "body": {
    "opted_out": [
      {
        "advertising_id": "Eufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc",
        "opted_out_since": 1633643601000
      },
      {
        "advertising_id": "Fzstfu9RG/Ih5trR6hlaHP6hw5yt9mYd5TKg2mRpWVng",
        "opted_out_since": 1709764087000
      }
    ]
  },
  "status": "success"
}
```

### Response Body Properties

The response body includes the following properties.

| Property | Format | Description |
| :--- | :--- | :--- |
| `advertising_id` | string | The <Link href="../ref-info/glossary-uid#gl-advertising-id">advertising ID</Link> (raw EUID). |
| `opted_out_since` | number | The <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> timestamp (in milliseconds) that indicates when the raw EUID was opted out. |

### Response Status Codes

The following table lists the status property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the status value is anything other than `success`, the message field provides additional information about the issue.
