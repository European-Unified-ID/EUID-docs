---
title: Integration Samples and Tools
description: Overview and reference for all EUID sample site examples.
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# Integration Samples and Tools

This page lists all official EUID sample implementations highlighting common integration use cases, along with links to live demo sites, source code, and related documentation. Use this page to quickly identify which sample matches your needs and explore working examples.

## Web Integrations

This section summarizes the sample integration available for publishers who want to integrate EUID directly into their websites. For a full summary of integration options for websites, see [Web Integration Overview](../guides/integration-options-publisher-web).

### Client-Side Integration Using EUID SDK for JavaScript

This sample is for publishers who prefer a fully client-side integration using the [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript) to generate and manage tokens directly in the browser. This approach is ideal for fast prototyping with minimal back-end requirements.

- Site: [EUID Publisher Client-Side Integration Example using JavaScript SDK](https://euid.eu/examples/cstg-js-sdk-example/)
- Code: [EUID-docs/static/examples/cstg-js-sdk-example](https://github.com/European-Unified-ID/EUID-docs/tree/main/static/examples/cstg-js-sdk-example)
- Doc: [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side)

## Prebid.js Integrations

This section includes a sample page for generating EUID tokens to be passed by Prebid.js in the RTB bidstream. For details, see [EUID Integration Overview for Prebid](../guides/integration-prebid).

### Client-Side Integration with Prebid.js

This sample is for publishers who want to generate EUID tokens on the client side and pass them into header bidding auctions using Prebid.js.

- Site: [EUID Prebid.js Client-Side Integration Example](https://euid.eu/examples/cstg-prebid-example/)
- Code: [EUID-docs/static/examples/cstg-prebid-example](https://github.com/European-Unified-ID/EUID-docs/tree/main/static/examples/cstg-prebid-example)
- Doc: [EUID Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side)

## Google Secure Signals Integrations

This section includes a sample page for passing EUID identity data to Google's advertising systems through their Secure Signals feature. For details, see [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss).

### Client-Side Secure Signals

This sample is for publishers who want a purely client-side integration with GAM Secure Signals.

- Site: [EUID Publisher Client-Side Integration Example using EUID JavaScript SDK, Secure Signals](https://euid.eu/examples/cstg-secure-signals-example/)
- Code: [EUID-docs/static/examples/cstg-secure-signals-example](https://github.com/European-Unified-ID/EUID-docs/tree/main/static/examples/cstg-secure-signals-example)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)

## EUID Hashing Tool

This tool is for developers or clients validating data preparation, such as hashing and normalization of emails before token requests. The tool is available at the following links:

- Site: [EUID Hashing Tool](https://euid.eu/examples/hashing-tool/)
- Code: [EUID-docs/static/examples/hashing-tool](https://github.com/European-Unified-ID/EUID-docs/tree/main/static/examples/hashing-tool)
- Doc: [Normalization and Encoding](../getting-started/gs-normalization-encoding)

:::note
The sample sites in this file highlight some common integrations, but do not represent all available EUID integration options. For a summary of all the integration options available, see [EUID Integration Guides: Summary](../guides/summary-guides).
:::
