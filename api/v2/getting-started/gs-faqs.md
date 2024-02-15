[EUID Overview](../../../README.md) > [v2](../summary-doc-v2.md) > [Getting Started -- Summary](gs-summary.md) > Frequently Asked Questions

# Frequently Asked Questions

Frequently asked questions for EUID are grouped into general categories by audience.

This page includes:

- [FAQs -- General](#faqs----general)
- [FAQs for Publishers](#faqs-for-publishers)
- [FAQs for Advertisers and Data Providers](#faqs-for-advertisers-and-data-providers)
- [FAQs for DSPs](#faqs-for-dsps)

## FAQs -- General

Here are some frequently asked questions regarding the EUID framework.

   - [Will all integration partners in the UID2 infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with EUID?](#will-all-integration-partners-in-the-uid2-infrastructure-ssps-third-party-data-providers-measurement-providers-be-automatically-integrated-with-euid)
   - [Can users opt out of targeted advertising tied to their EUID?](#can-users-opt-out-of-targeted-advertising-tied-to-their-euid)
   - [How does a user know where to access the opt-out portal?](#how-does-a-user-know-where-to-access-the-opt-out-portal)

#### Will all integration partners in the UID2 infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with EUID?
<!-- FAQ_01 -->
No. EUID has its own framework, which is separate from UID2. As such, paperwork relating to the usage and access to the UID2 framework does not automatically grant usage and access to the EUID framework. New contracts are required to be signed for EUID.

#### Can users opt out of targeted advertising tied to their EUID?
<!-- FAQ_02 -->
Yes. Through the [Transparency and Control Portal](https://transparentadvertising.eu), users can opt out from being served targeted ads tied to their EUID identity. Each request is distributed through the EUID Opt-Out Service, and EUID Operators make the opt-out information available to all relevant participants. 

#### How does a user know where to access the opt-out portal?
<!-- FAQ_03 -->
Publishers, SSO providers, or consent management platforms disclose links to the [Transparency and Control Portal](https://transparentadvertising.eu) in their login flows, consent flows, privacy policies, or by other means.

## FAQs for Publishers

Here are some frequently asked questions for publishers using the EUID framework.

  - [How can I test that the personal data sent and the returned token match up?](#how-can-i-test-that-the-personal-data-sent-and-the-returned-token-match-up)
  - [Do I need to decrypt tokens?](#do-i-need-to-decrypt-tokens)
  - [How will I be notified of user opt-out?](#how-will-i-be-notified-of-user-opt-out)
  - [Where should I make token generation calls&#8212;from the server or client side?](#where-should-i-make-token-generation-calls-from-the-server-or-client-side)
  - [Can I make token refresh calls from the client side?](#can-i-make-token-refresh-calls-from-the-client-side)
  - [How can I test the refresh token workflow?](#how-can-i-test-the-refresh-token-workflow)
  - [What is the uniqueness and rotation policy for EUID tokens?](#what-is-the-uniqueness-and-rotation-policy-for-euid-tokens)

#### How can I test that the personal data sent and the returned token match up?

You can use the [POST /token/validate](../endpoints/post-token-validate.md) endpoint to check whether the personal data you are sending through [POST /token/generate](../endpoints/post-token-generate.md) is valid. `POST /token/validate` is used primarily for testing purposes. 

For details, see [Using POST /token/validate to Test](../endpoints/post-token-validate.md#using-post-tokenvalidate-to-test).

#### Do I need to decrypt tokens?

No, publishers do not need to decrypt EUID tokens.

#### How will I be notified of user opt-out?

If the user has opted out, the API response notifies you in either of these cases:
- When you generate the EUID token by a call to the [POST /token/generate](../endpoints/post-token-generate.md) endpoint, either directly or via one of the EUID SDKs, using the required `optout_check` parameter with a value of `1`.
- When you refresh the EUID token by a call to the [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint, either directly or via one of the EUID SDKs.

#### Where should I make token generation calls, from the server or client side?

EUID tokens must be generated only on the server side after authentication. In other words, to ensure that the API key used to access the service remains secret, the [POST /token/generate](../endpoints/post-token-generate.md) endpoint must be called only from the server side.

#### Can I make token refresh calls from the client side?

Yes. The [POST /token/refresh](../endpoints/post-token-refresh.md) can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

#### How can I test the refresh token workflow?
<!-- FAQ_17 -->
You can use the `refresh-optout@example.com` email address to test your token refresh workflow. Using this email address in a request always generates an identity response with a `refresh_token` that results in a logout response.

The procedure is a little different depending on whether or not you are using an SDK.

##### With SDK:

1. Send a [POST /token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - The `refresh-optout@example.com` as the `email` value.
    - The hash of `refresh-optout@example.com` as the `email_hash` value. 
2. Wait until the SDK's [background auto-refresh](../sdks/client-side-identity.md#background-token-auto-refresh) attempts to refresh the advertising token (this can take several hours) and observe the refresh attempt fail with the OPTOUT status. At this point the SDK also clears the first-party cookie.

##### Without SDK:

1. Send a [POST /token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - The `refresh-optout@example.com` as the `email` value.
    - The hash of `refresh-optout@example.com` as the `email_hash` value. 
2. Store the returned `refresh_token` for use in the following step.
3. Send a [POST /token/refresh](../endpoints/post-token-refresh.md) request with the `refresh_token` (saved in step 2) as the `token` value.

   The body response should be empty, and the `status` value should be set to `optout` because the `refresh-optout@example.com` email always results in a logged out user.

#### What is the uniqueness and rotation policy for EUID tokens?

The EUID service encrypts tokens using random initialization vectors. The encrypted EUID is unique for a given user as they browse the internet. At every refresh, the token re-encrypts. This mechanism ensures that untrusted parties cannot track a user's identity.

## FAQs for Advertisers and Data Providers

Here are some frequently asked questions for advertisers and data providers using the EUID framework.

   - [How do I know when to refresh the EUID due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-euid-due-to-salt-bucket-rotation)
   - [Do refreshed emails get assigned to the same bucket with which they were previously associated?](#do-refreshed-emails-get-assigned-to-the-same-bucket-with-which-they-were-previously-associated)
   - [How often should EUIDs be refreshed for incremental updates?](#how-often-should-euids-be-refreshed-for-incremental-updates)
   - [How should I generate the SHA-256 of personal data for mapping?](#how-should-i-generate-the-sha-256-of-personal-data-for-mapping)
   - [Should I store large volumes of email addresses or their hash mappings? ](#should-i-store-large-volumes-of-email-addresses-or-their-hash-mappings)
   - [How should I handle user opt-outs?](#how-should-i-handle-user-opt-outs)

#### How do I know when to refresh the EUID due to salt bucket rotation?
<!-- FAQ_19 ADP -->
Metadata supplied with the EUID generation request indicates the salt bucket used for generating the EUID. Salt buckets persist and correspond to the underlying personal data used to generate a EUID. Use the  [POST /identity/buckets](../endpoints/post-identity-buckets.md) endpoint to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform you which EUIDs to refresh.

>NOTE: We do not make any promises about when the rotation takes place. To stay as up-to-date as possible, we recommend doing the checks once per hour.

#### Do refreshed emails get assigned to the same bucket with which they were previously associated?
<!-- FAQ_20 ADP -->
Not necessarily. After you remap emails associated with a particular bucket ID, the emails might be assigned to a different bucket ID. To check the bucket ID, [call the mapping function](../guides/advertiser-dataprovider-guide.md#retrieve-a-raw-euid-for-personal-data-using-the-identity-map-endpoints) and save the returned EUID and bucket ID again.

>IMPORTANT: When mapping and remapping emails, be sure not to make any assumptions of the number of buckets, their specific rotation dates, or to which bucket an email gets assigned. 

#### How often should EUIDs be refreshed for incremental updates?
<!-- FAQ_21 ADP -->
The recommended cadence for updating audiences is daily.

Even though each salt bucket is updated roughly once a year, individual bucket updates are spread over the year. This means that about 1/365th of all buckets are rotated daily. If fidelity is critical, consider calling the [POST /identity/buckets](../endpoints/post-identity-buckets.md) endpoint more frequently&#8212;for example, hourly.

#### How should I generate the SHA-256 of personal data for mapping?
<!-- FAQ_22 ADP -->
The system should follow the [email normalization rules](../getting-started/gs-normalization-encoding.md#email-address-normalization) and hash without salting.

#### Should I store large volumes of email addresses or their hash mappings?
<!-- FAQ_23 ADP -->
Yes. Not storing email address or hash mappings may increase processing time drastically when you have to map millions of addresses. Recalculating only those mappings that actually need to be updated, however, reduces the total processing time because only about 1/365th of EUIDs need to be updated daily.

>IMPORTANT: Unless you are using a private operator, you must map email addresses or hashes consecutively, using a single HTTP connection, in batches of  5,000 emails at a time. In other words, do your mapping without creating multiple parallel connections. 

#### How should I handle user opt-outs?
<!-- FAQ_24 ADP -->
When a user opts out of EUID-based targeted advertising through the [Transparency and Control Portal](https://www.transparentadvertising.eu/), the opt-out signal is sent to DSPs and publishers, who handle opt-outs at bid time. We recommend that advertisers and data providers regularly check whether a user has opted out, via the [POST /identity/map](../endpoints/post-identity-map.md) endpoint.

If a user opts out through your website, you should follow your internal procedures for handling the opt-out. For example, you might choose not to generate an EUID for that user.

## FAQs for DSPs

Here are some frequently asked questions for DSPs.

   - [How do I know which decryption key to apply to an EUID?](#how-do-i-know-which-decryption-key-to-apply-to-an-euid)
   - [Where do I get the decryption keys?](#where-do-i-get-the-decryption-keys)
   - [How do I know if/when the salt bucket has rotated?](#how-do-i-know-ifwhen-the-salt-bucket-has-rotated)
   - [Should the DSP be concerned with latency?](#should-the-dsp-be-concerned-with-latency)
   - [How should the DSP maintain proper frequency capping with EUID?](#how-should-the-dsp-maintain-proper-frequency-capping-with-euid)
   - [Will all user opt-out traffic be sent to the DSP?](#will-all-user-opt-out-traffic-be-sent-to-the-dsp)
   - [Is the DSP expected to handle opt-out signals only for the EUID that they already store?](#is-the-dsp-expected-to-handle-opt-out-signals-only-for-the-euid-that-they-already-store)
   - [How long should the DSP keep the opt-out list?](#how-long-should-the-dsp-keep-the-opt-out-list)
   - [Is the EUID of an opted-out user sent to the opt-out endpoint in an encrypted form?](#is-the-euid-of-an-opted-out-user-sent-to-the-opt-out-endpoint-in-an-encrypted-form)
   - [What request type do opt-outs use? ](#what-request-type-do-opt-outs-use)
   - [How strict are the requirements for honoring opt-outs? ](#how-strict-are-the-requirements-for-honoring-opt-outs)
   - [How many decryption keys may be present in memory at any point?](#how-many-decryption-keys-may-be-present-in-memory-at-any-point)
   - [How do SDK errors impact the DSP's ability to respond to a bid?](#how-do-sdk-errors-impact-the-dsps-ability-to-respond-to-a-bid)

#### How do I know which decryption key to apply to an EUID?
<!-- FAQ_25 DSP -->

Each of the server-side SDKs  (see [SDKs](../sdks/summary-sdks.md)) updates decryption keys automatically. Metadata supplied with the EUID token discloses the IDs of the decryption keys to use. 

#### Where do I get the decryption keys?
<!-- FAQ_26 DSP -->
You can use one of the server-side SDKs (see [SDKs](../sdks/summary-sdks.md)) to communicate with the EUID service and fetch the latest keys. To make sure that the keys remain up-to-date, it is recommended to fetch them periodically&#8212;for example, once every hour. 

#### How do I know if/when the salt bucket has rotated?
<!-- FAQ_27 DSP -->
The DSP is not privy to when the EUID salt bucket rotates. This is similar to a DSP being unaware if users cleared their cookies. Salt bucket rotation has no significant impact on the DSP.  

#### Should the DSP be concerned with latency?
<!-- FAQ_28 DSP -->
The EUID service does not introduce latency into the bidding process. Any latency experienced can be attributed to the network, not the EUID service.

#### How should the DSP maintain proper frequency capping with EUID?
<!-- FAQ_29 DSP -->
The EUID has the same chance as a cookie of becoming stale. Hence, the DSP can adapt the same infrastructure currently used for cookie or deviceID-based frequency capping for EUID. For details, see [How do I know when to refresh the EUID due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-euid-due-to-salt-bucket-rotation)

#### Will all user opt-out traffic be sent to the DSP?
<!-- FAQ_30 DSP -->
Yes, all opt-outs from the EUID [Transparency and Control Portal](https://transparentadvertising.eu/) will hit the opt-out endpoint that the DSP must configure to [honor user opt-outs](../guides/dsp-guide.md#honor-user-opt-outs).

#### Is the DSP expected to handle opt-out signals only for the EUID that they already store?
<!-- FAQ_31 DSP -->
In some cases a DSP may receive an EUID token for a newly-stored EUID where the token is generated before the opt-out timestamp. The DSP is not allowed to bid on such tokens. It is therefore recommended to store all opt-out signals regardless of whether the corresponding EUID is currently stored by the DSP or not. For details, see the diagram in [Bidding Opt-Out Logic](#bidding-opt-out-logic).

#### How long should the DSP keep the opt-out list?
<!-- FAQ_32 DSP -->
We recommend that you keep the opt-out information indefinitely.

#### Is the EUID of an opted-out user sent to the opt-out endpoint in an encrypted form?
<!-- FAQ_33 DSP -->
No. It is sent as an unencrypted (raw) EUID.

#### What request type do opt-outs use? 
<!-- FAQ_34 DSP -->
Typically GET requests, but different DSPs may use different types.

#### How strict are the requirements for honoring opt-outs? 
<!-- FAQ_35 DSP -->
Opt-outs must always be respected. It may take some time for an opt-out request to propagate through the system during which time it is expected that some bids may not honor the opt-out.

#### How many decryption keys may be present in memory at any point?
<!-- FAQ_36 DSP -->
There may be thousands of decryption keys present in the system at any given point.

#### How do SDK errors impact the DSP's ability to respond to a bid?
<!-- FAQ_37 DSP-client-v1 -->
If there is an error, the SDK will not decrypt the EUID advertising token into a raw EUID.
