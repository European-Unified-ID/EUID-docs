---
title: EUID Tokens and Refresh Tokens
description: Information for publishers about EUID tokens and refresh tokens.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# EUID Tokens and Refresh Tokens

When a publisher sends a user's <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> (email address) to the EUID Operator, whether via one of the EUID SDKs or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, the EUID Operator returns an <a href="glossary-uid#gl-euid-token">EUID token</a> with associated values. The token is an opaque alphanumeric string, and is pseudonymous: this means that different instances of activity, on browsers, CTV, and electronic devices such as phone and tablets, can be matched to the same pseudonymous value without compromising the privacy of the individual. The token is designed so that it cannot be reverse engineered to arrive at the original email address.

For security reasons, the EUID token has a short life. Along with the EUID token, the EUID Operator sends a <a href="glossary-uid#gl-refresh-token">refresh token</a> that the publisher can use to generate a new EUID token. If the token is not refreshed before it expires, it becomes invalid and cannot be used for targeted advertising.

## EUID Tokens: Key Information

Here are some key points about EUID tokens:

- The EUID token is a unique value: no two EUID tokens are the same.
- EUID tokens are case sensitive.
- The token value is opaque: do not make any assumptions about the format or about the length of the string.
- The token has a limited life, but can be refreshed using the refresh token.
- The token can be refreshed many times as long as it's always refreshed before expiration.
- Publishers send EUID tokens in the bidstream.
- Refreshing an EUID token does not invalidate/expire the original or previous EUID token. You can still use the earlier token until it expires.
- When the EUID Operator service receives the refresh token with a request for a new EUID token, it checks for user opt-out. If the user has opted out of EUID, no new EUID token is generated. For details, see [User Opt-Out](../getting-started/gs-opt-out.md).

## Refresh Tokens: Key Information

Here are some key points about refresh tokens:

- A refresh token is an opaque string that is issued along with the <a href="glossary-uid#gl-euid-token">EUID token</a>.
- Refresh tokens are case sensitive.
- The token value is opaque: do not make any assumptions about the format or about the length of the string.
- You can use the refresh token to generate a new EUID token before the old one expires.
- Token refresh can be managed in a variety of ways, such as:
  - With an EUID SDK (see [SDK Functionality](../sdks/summary-sdks.md#sdk-functionality))
  - By calling the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint
  - By using the EUID Prebid.js module (see [EUID Integration Overview for Prebid.js](../guides/integration-prebid.md))
- The [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint does not require authentication with your EUID credentials.
- When a new EUID token is generated and returned, a new refresh token is returned along with it.
- As long as you refresh the token before it expires, you can refresh many times. There is no limit as long as the EUID token and corresponding refresh token are valid.
- If you refresh the token, and get a new token before the old one has expired, you can use either the new token or the old one, as long as you use a token that is still valid/has not expired.
- In most cases, you can refresh tokens on the client side, even if the token was generated on the server side. For details about refresh functionality for the various SDKs, see [SDK Functionality](../sdks/summary-sdks.md#sdk-functionality) (Refresh EUID Token column).

## Recommended Token Refresh Frequency

The recommended refresh interval is hourly.

To determine when to refresh, you can use the timestamp of the `refresh_from` field in the response to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint (see [Successful Response](../endpoints/post-token-generate.md#successful-response)) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint (see [Successful Response With Tokens](../endpoints/post-token-refresh.md#successful-response-with-tokens)). The value of this field is a timestamp in <a href="glossary-uid#gl-utc">UTC</a> format.

## FAQs

There are some frequently asked questions relating to token refresh: see [FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers).
