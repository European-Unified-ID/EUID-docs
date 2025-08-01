---
title: EUID Endpoints - Summary
description: Summary of the endpoints available in the EUID service.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# EUID Endpoints: Summary

All EUID endpoints require a client secret for encrypting API requests (except [POST&nbsp;/token/refresh](post-token-refresh.md) requests) and decrypting responses. For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## EUID Tokens

The following endpoints are for retrieving and managing EUID tokens (identity tokens, advertising tokens), and are used mainly by publishers.

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/token/generate](post-token-generate.md) | Requests an EUID token generated from a user's <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> (email address or phone number). If the personal data is valid, and the user has not opted out of EUID, this operation returns an EUID token and associated values. | Required | Required |
| [POST&nbsp;/token/validate](post-token-validate.md) | Used for testing, to validate that an advertising token (EUID) matches the specified email address, phone number, or the respective hash. | Required | Required |
| [POST&nbsp;/token/refresh](post-token-refresh.md) | Generates a new token for a user for their refresh token from the [POST&nbsp;/token/generate](post-token-generate.md) response. | N/A | Required |

## Identity Map

The following endpoints are used by advertisers and third-party data providers. Publishers do not need to use these endpoints.

### Latest Identity Map Endpoint (v3)

In the latest identity map integration, you only need to call one endpoint, `POST /identity/map`. The `POST /identity/buckets` endpoint is not part of the workflow.

:::important
If you're using the earlier version, we recommend that you upgrade as soon as possible, to take advantage of improvements.
:::

The latest identity map integration uses the following endpoint:

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/identity/map](post-identity-map.md) | Maps raw EUIDs, previous raw EUIDs, and refresh timestamps for one or more email addresses, phone numbers, or their respective hashes.  | Required | Required |

### Earlier Identity Map Endpoints (v2)

The following endpoints are part of the earlier identity map integration (version 2).  

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/identity/buckets](post-identity-buckets.md) | Monitors rotated salt buckets using their last updated timestamp. | Required | Required |
| [POST&nbsp;/identity/map (v2)](post-identity-map-v2.md) | Retrieves raw EUIDs and salt bucket IDs for one or more email addresses, phone numbers, or their respective hashes.  | Required | Required |

## Opt-Out Status

The following endpoint can be used by advertisers, third-party data providers, and DSPs. Publishers do not need to use this endpoint.

For details about the EUID opt-out workflow and how users can opt out, see [User Opt-Out](../getting-started/gs-opt-out.md).

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/optout/status](post-optout-status.md) | Checks the opt-out status of raw EUIDs. This endpoint takes a list of raw EUIDs as input, and returns the raw EUIDs that have opted out, as well as the time that the opt-out took place.  | Required | Required |