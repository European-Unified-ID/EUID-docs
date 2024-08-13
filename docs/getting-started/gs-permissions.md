---
title: API Permissions
description: Information about EUID API permissions
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# API Permissions

The EUID ecosystem includes several different API permissions that allow access to complete specific activities. This approach is part of the overall secure design of EUID.

For each EUID participant that has API Key and Client Secret, the permissions are linked to the participant's API credentials (see [Account Setup](gs-account-setup.md) and [EUID Credentials](gs-credentials.md)).

:::note
If you're a publisher and are implementing EUID on the client side, API permissions do not apply to you. Instead, you'll receive a different set of credentials that are specifically for generating a client-side token request. For details, see [Subscription ID and Public Key](gs-credentials.md#subscription-id-and-public-key).
:::

A participant can have one or several sets of API credentials with associated permissions. In cases where you have more than one API permission, you have the option to have a separate set of credentials for each permission or have a single set of credentials for all permissions. We recommend having a separate set of credentials for each permission. 

The following table lists the key permissions, the types of participants that commonly use them, and a summary of the key associated activities.

| Name | Participant Type | Permissions |
| :--- | :--- | :--- |
| Generator | Publishers | Permission to call the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md), [POST&nbsp;/token/validate](../endpoints/post-token-validate.md), and [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints, to generate EUID tokens from <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> and to refresh them, using one of these integration methods:<ul><li>A Prebid integration</li><li>The SDK for JavaScript</li><li>An integration that directly calls the applicable API endpoints for retrieving and managing EUID tokens.</li></ul> |
| Bidder | DSPs | Permission to decrypt EUID tokens coming in from the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> from publishers into raw EUIDs for bidding purposes. |
| Mapper | Advertisers<br/>Data Providers | Permission to use the [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) endpoint to monitor rotated salt buckets and to use the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint to map multiple email addresses or their respective hashes to their raw EUIDs and salt bucket IDs. |
