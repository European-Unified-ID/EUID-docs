---
title: FAQs
description: Common questions about implementing EUID.
hide_table_of_contents: false
sidebar_position: 20
---

import Link from '@docusaurus/Link';
import ExampleTokenInBidstream from '../snippets/_example-token-in-bidstream.mdx';

# Frequently Asked Questions

Frequently asked questions for EUID are grouped into general categories by audience.

## FAQs&#8212;General

Here are some frequently asked questions regarding the EUID framework.

- [Will all integration partners in the UID2 infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with EUID?](#will-all-integration-partners-in-the-uid2-infrastructure-ssps-third-party-data-providers-measurement-providers-be-automatically-integrated-with-euid)
- [Can users opt out of targeted advertising tied to their EUID?](#can-users-opt-out-of-targeted-advertising-tied-to-their-euid)
- [When I send personal data to EUID, does EUID store the information?](#when-i-send-personal-data-to-euid-does-euid-store-the-information)
- [Should I use a Public Operator or a Private Operator?](#should-i-use-a-public-operator-or-a-private-operator)

:::note
For FAQs relating to mobile publisher integrations, see [FAQs for Mobile Integrations](../guides/integration-mobile-overview.md#faqs-for-mobile-integrations).
:::

#### Will all integration partners in the UID2 infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with EUID?

No. EUID has its own framework, which is separate from UID2. As such, paperwork relating to accessing and using the UID2 framework does not automatically grant usage and access to the EUID framework. New contracts are required to be signed for EUID.

#### Can users opt out of targeted advertising tied to their EUID?

Yes. Through the [Transparency and Control Portal](https://transparentadvertising.eu), users can opt out from being served targeted ads tied to their EUID. Each request is distributed through the EUID Opt-Out Service, and EUID Operators make the opt-out information available to all relevant participants. 

#### When I send personal data to EUID, does EUID store the information?

No. None of the components of the <Link href="../ref-info/glossary-uid#gl-euid-service">EUID service</Link> store any personal information.

In addition, in almost all cases, EUID doesn't store any values at all once the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md), [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md), or [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) call is complete. A necessary exception is the case where a user has opted out. In this scenario, EUID stores a hashed, opaque value to indicate the opted-out user. The stored value cannot be reverse engineered back to the original value of the personal data, but can be used to identify future requests for an EUID generated from the same personal data, which are therefore denied.

#### Should I use a Public Operator or a Private Operator?

For most participants, <Link href="../ref-info/glossary-uid#gl-public-operator">Public Operator</Link> is the simplest solution. A Public Operator integration is a much easier option than hosting your own <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. Having a Private Operator instance has some advantages, but adds extra complexities and costs.

The best choice depends on your unique scenario and needs. For more information to help you arrive at a decision, refer to the following:

- [The EUID Operator](../ref-info/ref-operators-public-private.md)

- [EUID Private Operator Integration Overview](../guides/integration-options-private-operator.md)

## FAQs for Publishers

Here are some frequently asked questions for publishers using the EUID framework.

- [How can I test that the personal data sent and the returned token match up?](#how-can-i-test-that-the-personal-data-sent-and-the-returned-token-match-up)
- [Do I need to decrypt tokens?](#do-i-need-to-decrypt-tokens)
- [How will I be notified of user opt-out?](#how-will-i-be-notified-of-user-opt-out)
- [Where should I make token generation calls&#8212;from the server side or the client side?](#where-should-i-make-token-generation-callsfrom-the-server-side-or-the-client-side)
- [Can I make token refresh calls from the client side?](#can-i-make-token-refresh-calls-from-the-client-side)
- [If I choose to manually refresh the token, how will I know when to refresh the token?](#if-i-choose-to-manually-refresh-the-token-how-will-i-know-when-to-refresh-the-token)
- [How can I test the refresh token workflow?](#how-can-i-test-the-refresh-token-workflow)
- [What is the uniqueness and rotation policy for EUID tokens?](#what-is-the-uniqueness-and-rotation-policy-for-euid-tokens)
- [What does an EUID token look like in the bidstream?](#what-does-an-euid-token-look-like-in-the-bidstream)
- [Can I integrate EUID with Single Sign-On (SSO)?](#can-i-integrate-euid-with-single-sign-on-sso)

#### How can I test that the personal data sent and the returned token match up?

You can use the [POST&nbsp;/token/validate](../endpoints/post-token-validate.md) endpoint to check whether the <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> that you are sending through [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) is valid. `POST /token/validate` is used primarily for testing purposes. 

For details, see [Using POST&nbsp;/token/validate to Test](../endpoints/post-token-validate.md#using-post-tokenvalidate-to-test).

#### Do I need to decrypt tokens?

No, publishers do not need to decrypt <Link href="../ref-info/glossary-uid#gl-euid-token">EUID tokens</Link>.

#### How will I be notified of user opt-out?

If the user has opted out, the API response notifies you in either of these cases:
- When you generate the EUID token by a call to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, either directly or via one of the EUID SDKs, using the required `optout_check` parameter with a value of `1`.
- When you refresh the EUID token by a call to the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint, either directly or via one of the EUID SDKs.

#### Where should I make token generation calls&#8212;from the server side or the client side?

You can generate EUID tokens from either the client side or the server side. For more information, see:
- Generating tokens from the client side using Prebid.js: [EUID Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md).
- Generating tokens from the server side using Prebid.js: [EUID Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md).
- Other server-side options: [Publisher Integrations](../guides/summary-guides.md#publisher-integrations).

#### Can I make token refresh calls from the client side?

Yes. The [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

#### If I choose to manually refresh the token, how will I know when to refresh the token?

The recommended refresh interval is hourly.

To determine when to refresh, you can use the timestamp of the `refresh_from` field in the response to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint (see [Successful Response](../endpoints/post-token-generate.md#successful-response)) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint (see [Successful Response With Tokens](../endpoints/post-token-refresh.md#successful-response-with-tokens)).

You could also use one of the SDKs that has a function to check if <a href="../ref-info/glossary-uid#gl-token-refresh">token refresh</a> is needed.

For details, see [Recommended Token Refresh Frequency](../ref-info/ref-tokens.md#recommended-token-refresh-frequency) and [Managing Token Refresh with an SDK](../ref-info/ref-tokens.md#managing-token-refresh-with-an-sdk).

#### How can I test the refresh token workflow?

You can use the `refresh-optout@example.com` email address or the `+00000000002` phone number to test your token refresh workflow. Using either parameter value in a request always generates an identity response with a `refresh_token` that results in a logout response.

:::tip
To get the normalized, hashed, and Base64-encoded hashed values for any email address, or the hashed and Base64-encoded hashed values for a phone number, you can use the hashing tool: see [EUID Hashing Tool](gs-normalization-encoding.md#euid-hashing-tool).
:::

The procedure is a little different depending on whether or not you are using an SDK.

##### With SDK:

1. Depending on whether the personal data is an email address or a phone number, send a [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - `email` value: `refresh-optout@example.com`.
    - `email_hash` value: The hashed and Base64-encoded value for `refresh-optout@example.com`, which is `NaNI8RU0bL1Jpp1jJLC5aJO/lchc6gGhgXQIAwJ7cV4=`. 
    - `phone` value: `+00000000002`.
    - `phone_hash` value: The hashed and Base64-encoded value for `+00000000002`, which is `0VoxsIuk88qt7TnZaTC//C9Vur3pR1zBMIr1cJe7xjE=`.

2. Wait until the SDK's [background auto-refresh](../sdks/sdk-ref-javascript.md#background-token-auto-refresh) attempts to refresh the advertising token (this can take several hours) and observe the refresh attempt fail with the `OPTOUT` status. At this point the SDK also clears the first-party cookie.

##### Without SDK:

1. Depending on whether the <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> is an email address or a phone number, send a [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - `email` value: `refresh-optout@example.com`.
    - `email_hash` value: The hashed and Base64-encoded value for `refresh-optout@example.com`, which is `NaNI8RU0bL1Jpp1jJLC5aJO/lchc6gGhgXQIAwJ7cV4=`. 
    - `phone` value: `+00000000002`.
    - `phone_hash` value: The hashed and Base64-encoded value for `+00000000002`, which is `0VoxsIuk88qt7TnZaTC//C9Vur3pR1zBMIr1cJe7xjE=`.

2. Store the returned `refresh_token` for use in the following step.

3. Send a [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) request with the `refresh_token` (saved in step 2) as the `token` value.<br/>The body response should be empty, and the `status` value should be set to `optout` because the `refresh-optout@example.com` email and the `+00000000002` phone number always result in a logged-out user.

#### What is the uniqueness and rotation policy for EUID tokens?

The EUID service encrypts EUID tokens using random initialization vectors. The EUID token is unique for a given user as the user browses the internet. This means that every time an EUID token is generated, the token is always different, even for the same underlying raw EUID. Every time the token is refreshed, a new token is generated and encrypted.

#### What does an EUID token look like in the bidstream?

There are many ways to approach EUID implementation. Here is one example of a code snippet showing how an EUID token is passed in the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>:

<ExampleTokenInBidstream />

#### Can I integrate EUID with Single Sign-On (SSO)?

Yes. With popular <a href="../ref-info/glossary-uid#gl-sso">SSO</a> integration options such as Sign in with Google, Facebook Login, Sign in with Apple, or OpenPass, you can retrieve the email address and use it to generate an EUID.

For details, see [Publisher Integration with SSO Providers](/docs/ref-info/ref-integration-sso-providers.md).

## FAQs for Advertisers and Data Providers

Here are some frequently asked questions for advertisers and data providers using the EUID framework.

- [How do I know when to refresh the EUID due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-euid-due-to-salt-bucket-rotation)
- [Do refreshed emails get assigned to the same bucket with which they were previously associated?](#do-refreshed-emails-get-assigned-to-the-same-bucket-with-which-they-were-previously-associated)
- [How often should EUIDs be refreshed for incremental updates?](#how-often-should-euids-be-refreshed-for-incremental-updates)
- [How should I generate the SHA-256 of personal data for mapping?](#how-should-i-generate-the-sha-256-of-personal-data-for-mapping)
- [Should I store mapping of email addresses, phone numbers, or corresponding hashes to raw EUIDs in my own datasets?](#should-i-store-mapping-of-email-addresses-phone-numbers-or-corresponding-hashes-to-raw-euids-in-my-own-datasets)
- [How should I handle user opt-outs?](#how-should-i-handle-user-opt-outs)
- [Does the same personal data always result in the same raw EUID?](#does-the-same-personal-data-always-result-in-the-same-raw-euid)
- [If two operators process the same personal data, are the results the same?](#if-two-operators-process-the-same-personal-data-are-the-results-the-same)

#### How do I know when to refresh the EUID due to salt bucket rotation?

Metadata supplied with the EUID generation request indicates the <Link href="../ref-info/glossary-uid#gl-salt-bucket">salt bucket</Link> used for generating the EUID. Salt buckets persist and correspond to the underlying personal data used to generate an EUID. Use the [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) endpoint to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform you which EUIDs to refresh.

:::note
We do not make any promises about when the rotation takes place. To stay as up-to-date as possible, we recommend doing the checks once per hour.
:::

#### Do refreshed emails get assigned to the same bucket with which they were previously associated?

Not necessarily. After you remap emails associated with a particular bucket ID, the emails might be assigned to a different bucket ID. To check the bucket ID, see [Generate Raw EUIDs from Personal Data](../guides/integration-advertiser-dataprovider-overview.md#1-generate-raw-euids-from-personal-data) and save the returned raw EUID and bucket ID again.

:::info
When mapping and remapping emails, do not make any assumptions about the number of buckets, their rotation dates, or the specific bucket that an email gets assigned to.
:::

#### How often should EUIDs be refreshed for incremental updates?

The recommended cadence for updating audiences is daily.

Even though each salt bucket is updated roughly once a year, individual bucket updates are spread over the year. This means that about 1/365th of all buckets are rotated daily. If fidelity is critical, consider calling the [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) endpoint more frequently&#8212;for example, hourly.

#### How should I generate the SHA-256 of personal data for mapping?

The system should follow the [email normalization rules](../getting-started/gs-normalization-encoding.md#email-address-normalization) and hash without salting.

#### Should I store mapping of email addresses, phone numbers, or corresponding hashes to raw EUIDs in my own datasets?

Yes. Not storing mappings may increase processing time drastically when you have to map millions of email addresses or phone numbers. Recalculating only those mappings that actually need to be updated, however, reduces the total processing time because only about 1/365th of EUIDs need to be updated daily.

:::important
Unless you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>, you must map email addresses, phone numbers, or hashes consecutively, using a single HTTP connection, with a maximum batch size of 5,000 items per batch. In other words, do your mapping without creating multiple parallel connections.
:::

#### How should I handle user opt-outs?

When a user opts out of EUID-based targeted advertising through the [Transparency and Control Portal](https://www.transparentadvertising.eu/), the opt-out signal is sent to DSPs and publishers, who handle opt-outs at bid time. We recommend that advertisers and data providers regularly check whether a user has opted out, via the [POST /identity/map](../endpoints/post-identity-map.md) endpoint.

Advertisers and data providers can also check the opt-out status of raw EUIDs using the [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) endpoint.

If a user opts out through your website, you should follow your internal procedures for handling the opt-out. For example, you might choose not to generate an EUID for that user.

#### Does the same personal data always result in the same raw EUID?

In general yes, the process of generating a raw EUID from personal data is the same, and results in the same value, no matter who sent the request. If two EUID participants were to send the same email address to the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint at the same time, they would both get the same raw EUID in response.

However, there is a variable factor, which is the <Link href="../ref-info/glossary-uid#gl-salt">salt</Link> value that's used in generating the raw EUID. The salt values are rotated roughly once per year (for details, see [How often should EUIDs be refreshed for incremental updates?](#how-often-should-euids-be-refreshed-for-incremental-updates)). If the salt value changes between one request and another, those two requests result in two different raw EUIDs, even when the personal data is the same.

For more information, see [Monitor for Salt Bucket Rotations for Your Stored Raw EUIDs](../guides/integration-advertiser-dataprovider-overview.md#5-monitor-for-salt-bucket-rotations-for-your-stored-raw-euids) in the *Advertiser/Data Provider Integration Guide*.

#### If two operators process the same personal data, are the results the same?

Yes, if the request is for a <Link href="../ref-info/glossary-uid#gl-raw-euid">raw EUID</Link>. As covered in the previous FAQ, [Does the same personal data always result in the same raw EUID?](#does-the-same-personal-data-always-result-in-the-same-raw-euid), if an advertiser or data provider sends the same personal data to the EUID Operator, by using an SDK or the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint, at the same time, the same raw EUID is created.

The result is the same, regardless of the <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link> and whether it's a Private Operator or a Public Operator.

The timing is important only because of salt bucket rotation. If the salt value changes between one request and another, the result is a different raw EUID.

However, if a publisher sends personal data in a request for an <Link href="../ref-info/glossary-uid#gl-euid-token">EUID token</Link>, via the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint or via an SDK, the resulting EUID token contains the same encrypted raw EUID, but the token itself is always unique.

## FAQs for DSPs

Here are some frequently asked questions for demand-side platforms (DSPs).

- [How do I know which decryption key to apply to an EUID?](#how-do-i-know-which-decryption-key-to-apply-to-an-euid)
- [Where do I get the decryption keys?](#where-do-i-get-the-decryption-keys)
- [How many decryption keys may be present in memory at any point?](#how-many-decryption-keys-may-be-present-in-memory-at-any-point)
- [How do I know if/when the salt bucket has rotated?](#how-do-i-know-ifwhen-the-salt-bucket-has-rotated)
- [Should the DSP be concerned with latency?](#should-the-dsp-be-concerned-with-latency)
- [How should the DSP maintain proper frequency capping with EUID?](#how-should-the-dsp-maintain-proper-frequency-capping-with-euid)
- [Will all user opt-out traffic be sent to the DSP?](#will-all-user-opt-out-traffic-be-sent-to-the-dsp)
- [Is the DSP expected to handle opt-out signals only for the EUID that they already store?](#is-the-dsp-expected-to-handle-opt-out-signals-only-for-the-euid-that-they-already-store)
- [How long should the DSP keep the opt-out list?](#how-long-should-the-dsp-keep-the-opt-out-list)
- [Is the EUID of an opted-out user sent to the opt-out endpoint in an encrypted form?](#is-the-euid-of-an-opted-out-user-sent-to-the-opt-out-endpoint-in-an-encrypted-form)
- [In what format is the EUID of an opted-out user sent to the webhook?](#in-what-format-is-the-euid-of-an-opted-out-user-sent-to-the-webhook)
- [What request type do opt-outs use? ](#what-request-type-do-opt-outs-use)
- [How strict are the requirements for honoring opt-outs? ](#how-strict-are-the-requirements-for-honoring-opt-outs)
- [How can I check if a user has opted out?](#how-can-i-check-if-a-user-has-opted-out)
- [How do SDK errors impact the DSP's ability to respond to a bid?](#how-do-sdk-errors-impact-the-dsps-ability-to-respond-to-a-bid)

#### How do I know which decryption key to apply to an EUID?

Each of the server-side SDKs (see [SDKs: Summary](../sdks/summary-sdks.md)) updates decryption keys automatically. Metadata supplied with the EUID token discloses the IDs of the decryption keys to use. 

#### Where do I get the decryption keys?

You can use one of the server-side SDKs (see [SDKs: Summary](../sdks/summary-sdks.md)) to communicate with the EUID service and fetch the latest keys. To make sure that the keys remain up-to-date, it is recommended to fetch them periodically; for example, once every hour. 

#### How many decryption keys may be present in memory at any point?

There may be thousands of decryption keys present in the system at any given point.

#### How do I know if/when the salt bucket has rotated?

The DSP is not privy to when the EUID salt bucket rotates. This is similar to a DSP being unaware if users cleared their cookies. Salt bucket rotation has no significant impact on the DSP.

#### Should the DSP be concerned with latency?

The EUID service does not introduce latency into the bidding process. Any latency experienced can be attributed to the network, not the EUID service.

#### How should the DSP maintain proper frequency capping with EUID?

The EUID has the same chance as a cookie of becoming stale. Hence, the DSP can adapt the same infrastructure currently used for cookie or deviceID-based frequency capping for EUID. For details, see [How do I know when to refresh the EUID due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-euid-due-to-salt-bucket-rotation)

#### Will all user opt-out traffic be sent to the DSP?

Yes, all opt-outs from the EUID [Transparency and Control Portal](https://transparentadvertising.eu/) hit the opt-out endpoint, which the DSP must configure to [honor user opt-outs](../guides/dsp-guide.md#honor-user-opt-outs).

#### Is the DSP expected to handle opt-out signals only for the EUID that they already store?

In some cases a DSP may receive an EUID token for a newly-stored EUID where the token is generated before the opt-out timestamp. The DSP is not allowed to bid on such tokens. It is therefore recommended to store all opt-out signals regardless of whether the corresponding EUID is currently stored by the DSP or not. For details, see the diagram in [Bidding Opt-Out Logic](../guides/dsp-guide.md#bidding-opt-out-logic).

#### How long should the DSP keep the opt-out list?

We recommend that you keep the opt-out information indefinitely.

#### Is the EUID of an opted-out user sent to the opt-out endpoint in an encrypted form?

No. It is sent as an unencrypted (raw) EUID.

#### In what format is the EUID of an opted-out user sent to the webhook?

If a user has opted out, the EUID Operator returns the raw EUIDs as URL-encoded query parameters.

For details about the opt-out process for DSPs, see [Honor User Opt-Outs](../guides/dsp-guide.md#honor-user-opt-outs).

#### What request type do opt-outs use? 

Typically GET requests, but different DSPs may use different types.

#### How strict are the requirements for honoring opt-outs? 

Opt-outs must always be respected. It may take some time for an opt-out request to propagate through the system during which time it is expected that some bids may not honor the opt-out.

#### How can I check if a user has opted out?

DSPs can check the opt-out status of raw EUIDs using the [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) endpoint.

#### How do SDK errors impact the DSP's ability to respond to a bid?

If there is an error, the SDK will not decrypt the EUID token into a raw EUID.
