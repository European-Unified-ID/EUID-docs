[EUID Overview](../../../README.md) > [Getting Started](../../getting-started.md) > [v2](../summary-doc-v2.md) > Endpoints

# EUID Endpoints

All EUID endpoints require a client secret for encrypting API requests (except [POST /token/refresh](post-token-refresh.md) requests) and decrypting responses. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Identity Tokens

| Endpoint | Description | Request Encryption |  Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST /token/generate](post-token-generate.md) | Opt in the user to EUID-based targeted advertising and generate a EUID token from their provided email address. | Required | Required |
| [POST /token/validate](post-token-validate.md) | Validate that an advertising token (EUID) matches the specified email address or email address hash. | Required | Required |
| [POST /token/refresh](post-token-refresh.md) | Generate a new token for a user for their refresh token from the [POST /token/generate](post-token-generate.md) response. | N/A | Required |

## Identity Maps

| Endpoint | Description | Request Encryption |  Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST /identity/buckets](post-identity-buckets.md) | Monitor rotated salt buckets using their last updated timestamp. | Required | Required |
| [POST /identity/map](post-identity-map.md) | Retrieve EUIDs and salt bucket IDs for one or more email addresses or email address hashes.  | Required | Required |
