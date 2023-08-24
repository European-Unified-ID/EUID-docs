[EUID Overview](../../../README.md) > [v2](../summary-doc-v2.md) > [Getting Started -- Summary](gs-summary.md) > Normalization and Encoding

# Normalization and Encoding

This page provides information about normalizing and encoding personal information. It's important that, in working with EUID, normalizing and encoding are performed correctly.

It includes the following sections:
- [Introduction](#introduction)
- [Types of Personal Information](#types-of-personal-information)
- [Email Address Normalization](#email-address-normalization)
- [Email Address Hash Encoding](#email-address-hash-encoding)

## Introduction
When you're taking user information such as email addresses, and following the steps to create a raw EUID and/or an EUID advertising token, it's very important that you follow the required steps exactly. Whether you need to normalize the information or not, whether you hash it or not, follow the steps exactly. By doing so, you can ensure that the EUID value you create can be securely and anonymously matched up with other instances of online behavior by the same user.

>Note: Raw EUIDs, and their associated EUID tokens, are case sensitive. When working with EUID, it's important to pass all IDs and tokens without changing the case. Mismatched IDs can cause ID parsing or token decryption errors.

## Types of Personal Information
EUID supports the following type of personal information:
- Email address

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

Email hashes are Base64-encoded SHA-256 hashes of a normalized email address.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized email address | `user@example.com` | N/A |
| SHA-256 of email address | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | This 64-character string is a hex-encoded representation of 32-byte SHA-256.|
| Base64-encoded SHA-256 of email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | This 44-character string is a base64-encoded representation of 32-byte SHA-256.<br/>Use this encoding for `email_hash` values sent in the request body. |
