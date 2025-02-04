---
title: Documentation Updates
description: A summary of significant EUID documentation updates.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# Documentation Updates

Check out the latest updates to our EUID documentation resources.

### New: Snowflake Integration Guide

February 4, 2025

EUID now supports Snowflake, the cloud data warehousing solution.

Using Snowflake, EUID enables advertisers and data providers to securely share consumer identifier data without exposing sensitive personal data.

For details, see [Snowflake Integration Guide](../guides/integration-snowflake.md).

<!-- APIDOCS-2747. 1/31 is doc date, 2/4 is marketplace listing -->

<!-- APIDOCS-2893  custom styling. -->

### New: Expanded and Restructured Advertiser/Data Provider Doc

January 30, 2025

We've significantly expanded and restructured the Advertiser/Data Provider documentation. We now have one significantly updated overview doc, and separate docs for each main integration option.

For details, including a summary of all integration options for advertisers and data providers, see [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md).

<!-- APIDOCS-2873 -->

### New: Publisher SSO Integration Page

January 10, 2025

We've added a new reference page for publishers who integrate with one or more SSO providers to offer SSO login, and want to retrieve the logged-in user's email address from the SSO provider to generate EUID tokens.

For details, see [Publisher Integration with SSO Providers](ref-integration-sso-providers.md).

<!-- APIDOCS-2871 -->

### New: EUID Sharing page

December 13, 2024

We've added a page with information about <Link href="glossary-uid#gl-sharing">sharing</Link> EUIDs.

For details, see [EUID Sharing](../getting-started/gs-sharing.md).

<!-- APIDOCS-2624 -->

### New: Zoom-In Tool for Images

December 5, 2024

The EUID docs site now includes a zoom-in tool for images.

Just hover over the image and the tool appears as a magnifying glass... click to view a magnified version of the image.

<!-- APIDOCS-2237 for both -->

### New: EUID Hashing Tool

November 26, 2024

We've added a new EUID hashing tool so that you can check that you're normalizing and encoding correctly.

For details, see [EUID Hashing Tool](../getting-started/gs-normalization-encoding#euid-hashing-tool) in the *Normalization and Encoding* documentation.

<!-- APIDOCS-2772 -->

### New: EUID Phone Number Support

November 22, 2024

EUID now supports phone numbers, as well as email addresses, as valid <Link href="glossary-uid#gl-personal-data">personal data</Link>.

All the EUID documentation has been updated to reflect this support, including reference information, procedures, and code samples. 

<!-- APIDOCS-2691 -->

### New: LiveRamp Integration Tips

November 14, 2024

We've added a new reference page with tips for publishers who are using LiveRamp's Authenticated Traffic Solution (ATS) to generate EUID tokens to be passed in the bid request.

For details, see [LiveRamp Integration Tips](../guides/integration-liveramp-tips.md).

<!-- APIDOCS-2699 -->

### New: GMA Android Doc

October 24, 2024

We've added the following new document to support EUID integration with GMA Android for mobile ads:

- [EUID GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android)

<!-- APIDOCS-2390 -->

### New: Mobile Docs

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

### New: Private Operator Integrations Page

September 13, 2024

We've added a new page with information about Private Operator integrations.

For details, see [EUID Private Operator Integration Overview](../guides/integration-options-private-operator).

<!-- APIDOCS-2594 -->

### New: Tokens Page

September 12, 2024

We've added a new reference page with information about tokens.

For details, see [EUID Tokens and Refresh Tokens](../ref-info/ref-tokens.md).

<!-- APIDOCS-2534 -->

### New: Google Ad Manager Secure Signals Integration Guide

September 11, 2024

We've added a guide with integration steps for publishers using EUID with the Google Ad Manager secure signals feature.

For details, see [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss.md).

<!-- APIDOCS-2495 -->

### New: iOS SDK Guide

August 29, 2024

A new guide for publishers that provides information about the SDK for iOS, an SDK that facilitates the process of establishing client identity using EUID and retrieving EUID tokens for publishers who need to support iOS apps.

For details, see [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md).

<!-- APIDOCS-2526 -->

### New: Server-Side Token Generation Page

July 26, 2024

We've added a new reference page with information for publishers generating the EUID token on the server side.

For details, see [Server-Side Token Generation](ref-server-side-token-generation.md).

<!-- APIDOCS-2436 -->

### New: Integration Approaches Page

July 25, 2024

We've added a new page with information about the different integration approaches: client-side, client-server, and server-side.

For details, see [Integration Approaches](ref-integration-approaches.md).

<!-- APIDOCS-2424 -->

### New: Opt-Out API

May 24, 2024

We added documentation for a new API call that checks the opt-out status of raw EUIDs.

Given a list of raw EUIDs, this endpoint returns the raw EUIDs that have opted out, as well as the time that the opt-out took place.

For details, see [POST&nbsp;/optout/status](../endpoints/post-optout-status.md).

<!-- APIDOCS-2252 -->

### EUID Documentation Website Release

April 8, 2024

On 8 April 2024, this documentation website was released!

<!-- PR #79 -->
