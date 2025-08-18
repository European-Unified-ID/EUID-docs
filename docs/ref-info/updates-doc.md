---
title: Documentation Updates
description: A summary of significant EUID documentation updates.
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import CustomTagsFilters from '@site/src/components/CustomTags/CustomTagsFilters';
import CustomTagsContainer from '@site/src/components/CustomTags/CustomTagsContainer';

# Documentation Updates

<CustomTagsFilters />

Check out the latest updates to our EUID documentation resources.

## Q3 2025

The following documents were released in this quarter.

<CustomTagsContainer tags="Endpoints, Guides, SDKs">

### Identity Map v3 (Python SDK, Snowflake)

14 August, 2025

We've released updated versions of two additional docs to reflect adoption of the new version of the Identity Map API (v3), announced on 16 July, which provides significant improvements for advertisers and data providers.

We updated the following additional implementations and corresponding documentation:

- Python SDK: see [SDK for Python Reference Guide](../sdks/sdk-ref-python.md)
- Snowflake: see [Snowflake Integration Guide](../guides/integration-snowflake.md)

<!-- APIDOCS-3346 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Endpoints, Guides, SDKs">

### Identity Map v3

July 16, 2025

We've released a new version of the Identity Map API (v3) that provides significant improvements for advertisers and data providers. This update includes documentation for the [POST /identity/map](../endpoints/post-identity-map.md) endpoint, the [SDK for Java Reference Guide](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers), and the [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md).

<!-- UID2-5558, UID2-5560, UID2-5559, APIDOCS-3318 -->

</CustomTagsContainer>

## Q1 2025

The following documents were released in the first quarter of 2025.

<CustomTagsContainer tags="Guides, Mobile">

### Server-Side Integration Guide for Mobile

March 19, 2025

We've added a guide for mobile app publishers who want to manage the EUID token entirely on the server side.

For details, see [EUID Server-Side Integration Guide for Mobile](../guides/integration-mobile-server-side.md).

<!-- APIDOCS-2932 -->

</CustomTagsContainer>

<CustomTagsContainer tags="SDKs">

### JavaScript SDK Version 4

March 10, 2025

We've added documentation for the recently released update of the EUID SDK for JavaScript, version 4.

For details, see [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md).

<!-- APIDOCS-2924 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### How the EUID Token Is Created

March 7, 2025

We've added a page with high-level information about the steps for creating an EUID token, including steps, roles, and a diagram.

For details, see [How the EUID Token Is Created](../ref-info/ref-how-uid-is-created.md).

<!-- APIDOCS-978 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Snowflake Integration Guide

February 4, 2025

EUID now supports Snowflake, the cloud data warehousing solution.

Using Snowflake, EUID enables advertisers and data providers to securely share consumer identifier data without exposing sensitive personal data.

For details, see [Snowflake Integration Guide](../guides/integration-snowflake.md).

<!-- APIDOCS-2747. 1/31 is doc date, 2/4 is marketplace listing -->

<!-- APIDOCS-2893  custom styling. -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Advertiser/Data Provider Doc

January 30, 2025

We've significantly expanded and restructured the Advertiser/Data Provider documentation. We now have one significantly updated overview doc, and separate docs for each main integration option.

For details, including a summary of all integration options for advertisers and data providers, see [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md).

<!-- APIDOCS-2873 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Publisher SSO Integration Page

January 10, 2025

We've added a new reference page for publishers who integrate with one or more SSO providers to offer SSO login, and want to retrieve the logged-in user's email address from the SSO provider to generate EUID tokens.

For details, see [Publisher Integration with SSO Providers](ref-integration-sso-providers.md).

<!-- APIDOCS-2871 -->

</CustomTagsContainer>

## Q4 2024

The following documents were released in the fourth quarter of 2024.

<CustomTagsContainer tags="Sharing">

### EUID Sharing page

December 13, 2024

We've added a page with information about <Link href="glossary-uid#gl-sharing">sharing</Link> EUIDs.

For details, see [EUID Sharing](../getting-started/gs-sharing.md).

<!-- APIDOCS-2624 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Infrastructure">

### Zoom-In Tool for Images

December 5, 2024

The EUID docs site now includes a zoom-in tool for images.

Just hover over the image and the tool appears as a magnifying glass, then click to view a magnified version of the image.

<!-- APIDOCS-2237 for both -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### EUID Hashing Tool

November 26, 2024

We've added a new EUID hashing tool so that you can check that you're normalizing and encoding correctly.

For details, see [EUID Hashing Tool](../getting-started/gs-normalization-encoding#euid-hashing-tool) in the *Normalization and Encoding* documentation.

<!-- APIDOCS-2772 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### EUID Phone Number Support

November 22, 2024

EUID now supports phone numbers, as well as email addresses, as valid <Link href="glossary-uid#gl-personal-data">personal data</Link>.

All the EUID documentation has been updated to reflect this support, including reference information, procedures, and code samples. 

<!-- APIDOCS-2691 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### LiveRamp Integration Tips

November 14, 2024

We've added a new reference page with tips for publishers who are using LiveRamp's Authenticated Traffic Solution (ATS) to generate EUID tokens to be passed in the bid request.

For details, see [LiveRamp Integration Tips](../guides/integration-liveramp-tips.md).

<!-- APIDOCS-2699 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### GMA Android Doc

October 24, 2024

We've added the following new document to support EUID integration with GMA Android for mobile ads:

- [EUID GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android)

<!-- APIDOCS-2390 -->

</CustomTagsContainer>

## Q3 2024

The following documents were released in the third quarter of 2024.

### Mobile Docs

<CustomTagsContainer tags="Guides, CTV, Mobile, Prebid, SDKs">

September 16, 2024

We've added the following new documents to support EUID integration for mobile devices:

SDK doc:
- [SDK for Android Reference Guide](../sdks/sdk-ref-android)

Mobile plugin guides:
- [EUID GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios)
- [EUID IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android)
- [EUID IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios)

Mobile integration guides:
- [EUID Mobile Integration Overview for Android and iOS](../guides/integration-mobile-overview)
- [EUID Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side)
- [EUID Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server)

Additional resources:
- [CTV Integration Guide](../guides/integration-ctv-guide)
- [EUID Mobile Integration for Prebid Mobile SDK](../guides/integration-prebid-mobile-summary)

<!-- APIDOCS-2554 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator Integration Overview

September 13, 2024

We've added a new page with information about Private Operator integrations.

For details, see [EUID Private Operator Integration Overview](../guides/integration-options-private-operator).

<!-- APIDOCS-2594 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Tokens Page

September 12, 2024

We've added a new reference page with information about tokens.

For details, see [EUID Tokens and Refresh Tokens](../ref-info/ref-tokens.md).

<!-- APIDOCS-2534 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Google Ad Manager Secure Signals Integration Guide

September 11, 2024

We've added a guide with integration steps for publishers using EUID with the Google Ad Manager secure signals feature.

For details, see [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss.md).

<!-- APIDOCS-2495 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### iOS SDK Guide

August 29, 2024

A new guide for publishers that provides information about the SDK for iOS, an SDK that facilitates the process of establishing client identity using EUID and retrieving EUID tokens for publishers who need to support iOS apps.

For details, see [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md).

<!-- APIDOCS-2526 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Server-Side Token Generation Page

July 26, 2024

We've added a new reference page with information for publishers generating the EUID token on the server side.

For details, see [Server-Side Token Generation](ref-server-side-token-generation.md).

<!-- APIDOCS-2436 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Integration Approaches Page

July 25, 2024

We've added a new page with information about the different integration approaches: client-side, client-server, and server-side.

For details, see [Integration Approaches](ref-integration-approaches.md).

<!-- APIDOCS-2424 -->

</CustomTagsContainer>

## Q2 2024

The following documents were released in the second quarter of 2024.

<CustomTagsContainer tags="Opt-Out">

### Opt-Out API

May 24, 2024

We added documentation for a new API call that checks the opt-out status of raw EUIDs.

Given a list of raw EUIDs, this endpoint returns the raw EUIDs that have opted out, as well as the time that the opt-out took place.

For details, see [POST&nbsp;/optout/status](../endpoints/post-optout-status.md).

<!-- APIDOCS-2252 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Infrastructure">

### EUID Documentation Website Release

April 8, 2024

On 8 April 2024, this documentation website was released!

<!-- PR #79 -->

</CustomTagsContainer>
