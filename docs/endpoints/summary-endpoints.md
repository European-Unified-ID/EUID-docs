---
title: EUID Endpoints - Summary
description: Summary of the endpoints available in the EUID service.
hide_table_of_contents: false
sidebar_position: 01
---

import Link from '@docusaurus/Link';

# EUID Endpoints

All EUID endpoints require a client secret for encrypting API requests (except [POST /token/refresh](post-token-refresh.md) requests) and decrypting responses. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## EUID Tokens

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST /token/generate](post-token-generate.md) | Requests an EUID token generated from the email address provided by a user with their authorization for EUID-based targeted advertising. If the email address is valid, and the user has not opted out of EUID, this operation returns an EUID token and associated values. | Required | Required |
| [POST /token/validate](post-token-validate.md) | Used for testing, to validate that an advertising token (EUID) matches the specified email address or email address hash. | Required | Required |
| [POST /token/refresh](post-token-refresh.md) | Generate a new token for a user for their refresh token from the [POST /token/generate](post-token-generate.md) response. | N/A | Required |

## Identity Maps

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST /identity/buckets](post-identity-buckets.md) | Monitor rotated salt buckets using their last updated timestamp. | Required | Required |
| [POST /identity/map](post-identity-map.md) | Retrieve raw EUIDs and salt bucket IDs for one or more email addresses or email address hashes.  | Required | Required |
