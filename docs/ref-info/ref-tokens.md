---
title: EUID Tokens and Refresh Tokens
description: Information for publishers about EUID tokens and refresh tokens.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# EUID Tokens and Refresh Tokens

When a publisher sends a user's <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link>&#8212;hashed or unhashed email addresses&#8212;to the EUID Operator, whether via one of the EUID SDKs or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, the EUID Operator converts the personal data to a <a href="glossary-uid#gl-raw-euid">raw EUID</a>, encrypts it into an <a href="glossary-uid#gl-euid-token">EUID token</a>, and returns the EUID token with associated values, including a refresh token. The publisher can then use the EUID token in the bidstream.

## EUID Tokens: Key Information

Here are some key points about EUID tokens:

- The EUID token is a unique value: no two EUID tokens are the same.
- EUID tokens are case sensitive.
- The token value is an <a href="glossary-uid#gl-opaque">opaque</a> string: do not make any assumptions about the format or length of the string.
- EUID tokens representing different instances of user activity, on browsers, CTV, and electronic devices such as phones and tablets, can still be matched to the same raw EUID.
- The token generation logic checks for user opt-out. If the user has opted out of EUID, no EUID token is generated. For details, see [User Opt-Out](../getting-started/gs-opt-out.md).
- The token has a limited life, but can be refreshed using the refresh token.
- You can refresh many times, to get a new EUID token and corresponding new refresh token, as long as the current EUID token is always refreshed before the current refresh token expires.
- If the token has expired, or as an alternative to refreshing an existing token, you can generate a new EUID token from the original hashed or unhashed email address.
- Publishers send EUID tokens in the bidstream.
- Refreshing an EUID token does not invalidate/expire the original or previous EUID token. You can still use the earlier token until it expires.

## Refresh Tokens: Key Information

Here are some key points about refresh tokens:

- A refresh token is a string that is issued along with the <a href="glossary-uid#gl-euid-token">EUID token</a>.
- Refresh tokens are case sensitive.
- The token value is an <a href="glossary-uid#gl-opaque">opaque</a> string: do not make any assumptions about the format or length of the string.
- You can use the refresh token to generate a new EUID token and new refresh token before the current refresh token expires.
- Using refresh tokens is optional: you could choose to generate a new token from personal data each time rather than refreshing an existing token. 
- You can manage token refresh in a variety of ways, such as:
  - With an EUID SDK (see [SDK Functionality](../sdks/summary-sdks.md#sdk-functionality))
  - By calling the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint
  - By using the EUID Prebid.js module (see [EUID Integration Overview for Prebid.js](../guides/integration-prebid.md))
- When a new EUID token is generated and returned in response to the refresh token, a new refresh token is returned along with it.
- In most cases, you can refresh tokens on the client side, even if the token was generated on the server side. For details about refresh functionality for the various SDKs, see [SDK Functionality](../sdks/summary-sdks.md#sdk-functionality) (*Refresh EUID Token* column).
- When the EUID Operator service receives the refresh token with a request for a new EUID token, it checks for user opt-out. If the user has opted out of EUID, no new EUID token is generated. For details, see [User Opt-Out](../getting-started/gs-opt-out.md).

### Recommended Token Refresh Frequency

The recommended refresh interval is hourly.

To determine when to refresh, you can use the timestamp of the `refresh_from` field in the response to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint (see [Successful Response](../endpoints/post-token-generate.md#successful-response)) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint (see [Successful Response With Tokens](../endpoints/post-token-refresh.md#successful-response-with-tokens)). The value of this field is a timestamp in <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> time, expressed in milliseconds.

### Managing Token Refresh with an SDK

An easy way to manage token refresh is to use one of the EUID SDKs that have a function for the purpose: either the Java or Python SDK.

Each of these SDKs includes a publisher class that has a function to determine if a token refresh is needed.

The following examples show how you could first check if the token can be refreshed and then check if refresh is needed, using one of these SDKs. If it's time to refresh, you can then call the refresh function to refresh the token.

<Tabs groupId="language-selection">
<TabItem value='java' label='Java'>

1. Determine if the identity can be refreshed (that is, the refresh token hasn't expired):

    ```java
    if (identity == null || !identity.isRefreshable()) { we must no longer use this identity (for example, remove this identity from the user's session) }
    ```
1. Determine if a refresh is needed:
    ```java
    if (identity.isDueForRefresh()) {..}
    ```
</TabItem>
<TabItem value='py' label='Python'>
1. Determine if the identity can be refreshed (that is, the refresh token hasn't expired):

   ```py
   if not identity or not identity.is_refreshable(): # we must no longer use this identity (for example, remove this identity from the user's session)
   ```
1. Determine if a refresh is needed:
   ```py
    if identity.is_due_for_refresh()):
    ```
</TabItem>
</Tabs>
Before using the code example, check the prerequisites and notes for the language you're using. For details, refer to the doc for the applicable SDK:

- [SDK for Java, Usage for Publishers, Basic Usage Server-Side Integration section](../sdks/sdk-ref-java.md#basic-usage-server-side-integration)
- [SDK for Python, Usage for Publishers, Server-Side Integration section](../sdks/sdk-ref-python.md#server-side-integration)

## FAQs

There are some frequently asked questions relating to token refresh: see [FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers).
