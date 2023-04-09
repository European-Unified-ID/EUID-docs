[EUID Overview](../README.md) 

# Getting Started with EUID
For EUID definition, forms, guiding principles, components, differences between UID2 and EUID, and other conceptual details, see [European Unified ID Overview](../README.md). For integration guides, supported SDKs, and endpoint reference, see [EUID API Documentation](v2/summary-doc-v2.md).

This page provides general information required for you to get started with the EUID API.

It includes:

This page provides the following information required for you to get started with the EUID API:
* [Contact Info](#contact-info)
* [API Version](#api-version)
* [Environment](#environment)
* [Authentication and Authorization](#authentication-and-authorization)
* [Email Address Normalization](#email-address-normalization)
* [Email Address Hash Encoding](#email-address-hash-encoding)
* [License](#license)


## Contact Info

To get access to EUID, contact the appropriate team at The Trade Desk listed below. 

| Your Role | Contact Email |
| :--- | :--- |
| App Developer<br/>Publisher | EUIDpublishers@thetradedesk.com |
| Agency<br/>Brand<br/>CDP<br/>Data Provider<br/>DSP<br/>SSP | EUIDpartners@thetradedesk.com |

## API Version

The current version of EUID API is v2.

## Environment 

All EUID endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | `https://integ.euid.eu/v2` |
| Production | `https://prod.euid.eu/v2` |

For example, https://integ.euid.eu/v2/token/generate

## Authentication and Authorization

To authenticate to the EUID endpoints, you need the following:

- A client API key, which is to be included as a bearer token in the request's authorization header. 
  <br/>`Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- A client secret for encrypting API requests and decrypting API responses for all endpoints, except [POST /token/refresh](v2/endpoints/post-token-refresh.md). <br/>For details and Python examples, see [Encrypting Requests and Decrypting Responses](v2/getting-started/gs-encryption-decryption.md).


## Email Address Normalization

If you send unhashed email addresses to the EUID Operator Service, the service normalizes the email addresses and then hashes them. If you want to hash the email addresses yourself before sending them, you must normalize them before you hash them.

> IMPORTANT: Normalization before hashing ensures that the generated EUID value will always be the same, so that the data can be matched. If you do not normalize before hashing, this might result in a different EUID, reducing the effectiveness of targeted advertising.

To normalize an email address, complete the following steps:

1. Remove leading and trailing spaces.
2. Convert all ASCII characters to lowercase.
3. In `gmail.com` email addresses, remove the following characters from the username part of the email address:
    1. The period  (`.` (ASCII code 46)).<br/>For example, normalize `jane.doe@gmail.com` to `janedoe@gmail.com`.
    2. The plus sign (`+` (ASCII code 43)) and all subsequent characters.<br/>For example, normalize `janedoe+home@gmail.com` to `janedoe@gmail.com`.

## Email Address Hash Encoding

Email hashes are base64-encoded SHA256 hashes of a normalized email address.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized email address | `user@example.com` | N/A |
| SHA256 of email address | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | This 64-character string is a hex-encoded representation of 32-byte SHA256.|
| base64-encoded SHA256 of email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | This 44-character string is a base64-encoded representation of 32-byte SHA256.<br/>Use this encoding for `email_hash` values sent in the request body. |


## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
