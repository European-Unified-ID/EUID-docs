[EUID API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > POST /identity/map

# POST /identity/map

Map multiple email addresses or email address hashes to their EUIDs and salt bucket IDs. This endpoint is intended for use by [Advertisers and Data Providers](../guides/advertiser-dataprovider-guide.md).

Here's what you need to know:
- The maximum request size is 1MB. 
- To map a large number of email addresses or email address hashes, send them in *sequential* batches with a maximum batch size of 5,000 items per batch.
- Do not send batches in parallel.


## Request Format

```POST '{environment}/v1/identity/map'```

>IMPORTANT: You must encrypt all request using your secret. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../encryption-decryption.md).

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.euid.eu`<br/>Production environment: `https://prod.euid.eu` |

###  Unencrypted JSON Body Parameters

>IMPORTANT: You must include only one of the following parameters as a key-value pair in the JSON body of a request when encrypting it.

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string array | Conditionally Required | The list of email addresses to be mapped. |
| `email_hash` | string array | Conditionally Required | The list of [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hashes of [normalized](../../README.md#email-address-normalization) email addresses. |


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
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
    ]    
}
```


Here's an encrypted identity mapping request format with placeholder values:

```sh
echo '[Unencrypted-JSON-Request-Body]' \
  | encrypt_request.py [CLIENT_SECRET] \
  | curl -X POST 'https://prod.uidapi.com/v2/identity/map' -H 'Authorization: Bearer [CLIENT_API_KEY]' \
  | decrypt_response.py [CLIENT_SECRET] 
```

Here's an encrypted identity mapping request example for email addresses:

```sh
echo '{"email": ["user@example.com", "user2@example.com"]}' \
  | encrypt_request.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= \
  | curl -X POST 'https://prod.uidapi.com/v2/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' \
  | decrypt_response.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= 
```

For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../encryption-decryption.md).

## Decrypted JSON Response Format

>NOTE: The responses are encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.

A successful decrypted response returns the EUIDs and salt bucket IDs for the specified email addresses email address hashes.

```json
{
    "body":{
        "mapped": [
            {
                "identifier": "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
                "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "bucket_id": "a30od4mNRd"
            },
            {
                "identifier": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
                "advertising_id": "IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=",
                "bucket_id": "ad1ANEmVZ"
            }
        ]
    },
    "status":"success"
}
```

### Response Body Properties

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

If the `status` value is other than `success`, the `message` field provides additional information about the issue.