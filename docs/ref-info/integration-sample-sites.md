---
title: Integration Samples and Tools
description: Overview and reference for all EUID sample site examples.
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# Integration Samples and Tools

This page lists all official EUID sample implementations highlighting common integration use cases, along with links to live demo sites, source code, and related documentation. Use this page to quickly identify which sample matches your needs and explore working examples.

All sample sites are also available at [https://samples.integ.euid.eu/](https://samples.integ.euid.eu/).

:::note
The sample implementations on this page demonstrate email-based integrations; however, phone numbers are also supported and follow the same integration patterns, using a different SDK method and requiring an additional normalization step. For a phone number integration example, see the [EUID Hashing Tool](#euid-hashing-tool).
:::

## JavaScript SDK Integrations

This section summarizes sample integrations using the EUID SDK for JavaScript directly, without Prebid.js or Google Secure Signals. For integration options by participant type, see [Web Integration Overview](https://euid.eu/docs/guides/integration-options-publisher-web) or [Advertiser/Data Provider Integration Overview](https://euid.eu/docs/guides/integration-advertiser-dataprovider-overview).

### Client-Side Integration Using EUID SDK for JavaScript

This sample is for publishers who prefer a fully client-side integration using the [SDK for JavaScript Reference Guide](https://euid.eu/docs/sdks/sdk-ref-javascript) to generate and manage tokens directly in the browser. This approach is ideal for fast prototyping with minimal back-end requirements.

- Site: [Client-Side EUID Integration Example using JavaScript SDK](https://js-client-side.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-side)
- Doc: [Client-Side Integration Guide for JavaScript](https://euid.eu/docs/guides/integration-javascript-client-side)

### Client-Server Integration Using EUID SDK for JavaScript

This sample is for publishers who want more control over EUID token creation (handled on your servers), while using the SDK for JavaScript on the client side to manage and refresh tokens in the browser.

- Site: [Client-Server EUID Integration Example using JavaScript SDK](https://js-client-server.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-server)
- Doc: [Client-Server Integration Guide for JavaScript](https://euid.eu/docs/guides/integration-javascript-client-server)

### React Client-Side Integration Using EUID SDK for JavaScript

This sample is for publishers with React apps who want to integrate EUID directly into their component-based architecture using the SDK for JavaScript.

- Site: [React Client-Side EUID Integration Example using JavaScript SDK](https://js-react.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/javascript-sdk/react-client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/react-client-side)
- Doc: [Client-Side Integration Guide for JavaScript](https://euid.eu/docs/guides/integration-javascript-client-side)

### EUID Server-Only (Server-Side)

This sample is for publishers who want all EUID operations to occur on the server side, offering maximum control, security, and flexibility without relying on a client-side SDK.

- Site: [Server-Side EUID Integration Example](https://server-side.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/server-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/server-side)
- Doc: [Publisher Integration Guide, Server-Side](https://euid.eu/docs/guides/integration-publisher-server-side)

## Prebid.js Integrations

This section includes sample pages for generating EUID tokens to be passed by Prebid.js in the RTB bidstream. For details, see [EUID Integration Overview for Prebid](https://euid.eu/docs/guides/integration-prebid).

### Client-Side Integration with Prebid.js

This sample is for publishers who have access to personal data on the client side and want to do front-end development only. Prebid.js handles the entire EUID workflow—token generation, storage, and automatic refresh—with no server-side development required.

- Site: [Client-Side EUID Integration with Prebid.js](https://prebid-client.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side)
- Doc: [EUID Client-Side Integration Guide for Prebid.js](https://euid.eu/docs/guides/integration-prebid-client-side)

### Client-Server Integration with Prebid.js

This sample is for publishers who have access to personal data on the server side and can do server-side development. The server generates the initial EUID token, and Prebid.js continues to manage the token lifecycle—including storage and automatic refresh.

- Site: [Client-Server EUID Integration with Prebid.js](https://prebid-client-server.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-server)
- Doc: [EUID Client-Server Integration Guide for Prebid.js](https://euid.eu/docs/guides/integration-prebid-client-server)

### Deferred Client-Side Integration with Prebid.js

This sample demonstrates how publishers who already have Prebid.js configured can still add the EUID module using functions provided by Prebid. This allows Prebid.js to handle all EUID work even when the module wasn't included in the initial configuration.

- Site: [Deferred Client-Side EUID Integration with Prebid.js](https://prebid-deferred.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-side-deferred](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side-deferred)
- Doc: [EUID Client-Side Integration Guide for Prebid.js](https://euid.eu/docs/guides/integration-prebid-client-side)

### Prebid.js with Secure Signals

This sample demonstrates how to configure Prebid.js with both EUID and Google Secure Signals, enabling the integration between header bidding and Google Ad Manager.

- Site: [Client-Side EUID Integration with Prebid.js (with Google Secure Signals)](https://prebid-secure-signals.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/prebid-secure-signals](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-secure-signals)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://euid.eu/docs/guides/integration-google-ss)

## Google Secure Signals Integrations

This section includes sample pages for passing EUID identity data to Google's advertising systems through their Secure Signals feature. For details, see [Google Ad Manager Secure Signals Integration Guide](https://euid.eu/docs/guides/integration-google-ss).

### Client-Side Secure Signals

This sample is for publishers who want a client-side integration with Google Ad Manager Secure Signals. In this integration, the EUID SDK for JavaScript generates and manages tokens, and the Secure Signals script automatically shares the tokens with Google Ad Manager for ad requests.

- Site: [Client-Side EUID Integration with Google Secure Signals](https://secure-signals-client-side.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/google-secure-signals/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/client-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://euid.eu/docs/guides/integration-google-ss)

### Client-Server Secure Signals

This sample is for publishers who want to generate EUID tokens on the server side while using the SDK for JavaScript on the client to manage tokens. The Secure Signals script automatically shares the token with Google Ad Manager for ad requests.

- Site: [Client-Server EUID SDK Integration Example with Google Secure Signals](https://secure-signals-client-server.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/google-secure-signals/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/client-server)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://euid.eu/docs/guides/integration-google-ss)

### Server-Side Secure Signals

This sample is for publishers who want all EUID token logic handled server-side. The Secure Signals script reads the token and automatically shares it with Google Ad Manager for ad requests.

- Site: [Server-Side EUID Integration with Google Secure Signals](https://secure-signals-server-side.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/google-secure-signals/server-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/server-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://euid.eu/docs/guides/integration-google-ss)

### React Client-Side Secure Signals

This sample is for publishers with React apps who want a client-side integration with Google Secure Signals. It uses the EUID SDK for JavaScript within a React component to generate and manage tokens, while the Secure Signals script automatically shares the token with Google Ad Manager.

- Site: [React Client-Side EUID Integration with Google Secure Signals](https://secure-signals-react.samples.integ.euid.eu/)
- Code: [uid2-examples/web-integrations/google-secure-signals/react-client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/react-client-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://euid.eu/docs/guides/integration-google-ss)

## Tools

### EUID Hashing Tool

This tool is for developers or clients validating data preparation, such as hashing and normalization of emails or phone numbers before token requests. The tool is available at the following links:

- Site: [EUID Hashing Tool](https://hashing-tool.samples.integ.euid.eu/)
- Code: [uid2-examples/tools/hashing-tool](https://github.com/IABTechLab/uid2-examples/tree/main/tools/hashing-tool)
- Doc: [Normalization and Encoding](https://euid.eu/docs/getting-started/gs-normalization-encoding)

:::note
The sample sites on this page highlight some common integrations, but do not represent all available EUID integration options. For a summary of all the integration options available, see [EUID Integration Guides: Summary](https://euid.eu/docs/guides/summary-guides).
:::
