---
title: EUID Client-Server Integration Guide for Mobile
sidebar_label: Client-Server Integration for Mobile
pagination_label: EUID Client-Server Integration Guide for Mobile
description: Setting up a mobile integration with token generate on server and refresh on client.
hide_table_of_contents: false
sidebar_position: 04
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import ExampleAdvertisingToken from '/docs/snippets/_example-advertising-token.mdx';
import EnableLogging from '/docs/snippets/_mobile-docs-enable-logging.mdx';
import GMAIMA_Plugins from '/docs/snippets/_mobile_docs_gmaima-plugin-gss.mdx';
import PrebidMobileSDK from '/docs/snippets/_mobile_docs_prebid-mobile.mdx';
import ErrorResponseStates from '/docs/snippets/_mobile-docs-error-response-states.mdx';

# EUID Client-Server Integration Guide for Mobile

This guide is for mobile app publishers who want to integrate with EUID by generating EUID tokens server-side via a <Link href="../ref-info/glossary-uid#gl-public-operator">Public Operator</Link> or <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> and then passing the tokens and user identities into their mobile apps, which will in turn pass the tokens for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use.  

This is called client-server integration because some integration steps are client-side and some are server-side.

If you want to integrate with EUID via client-side only changes (that is, all integration changes required are within the mobile apps), refer to the [EUID Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) instead.

This page provides a high-level overview of integration steps and links to additional documentation.

EUID provides mobile SDKs for [Android](../sdks/sdk-ref-android.md) and [iOS](../sdks/sdk-ref-ios.md). Each SDK has the following features:

- Takes in an EUID <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (an EUID token and associated values) and persists it in local file storage.
- Automatically refreshes EUID tokens.

:::note
This guide uses the group term **EUID mobile SDKs** to include both the SDK for Android and the SDK for iOS.
:::

For FAQs relating to mobile publisher integrations, see [FAQs for Mobile Integrations](integration-mobile-overview.md#faqs-for-mobile-integrations).

You'll need to complete the following steps:

1. [Complete the EUID account setup](#complete-the-euid-account-setup).
2. [Implement server-side token generation](#implement-server-side-token-generation).
3. [Add the EUID mobile SDK to your mobile app](#add-the-euid-mobile-sdk-to-your-mobile-app).
4. [Configure the EUID mobile SDK](#configure-the-euid-mobile-sdk).
5. [Check that the token was successfully generated and then pass it for bidstream use](#pass-generated-token-for-bidstream-use).
6. [Optionally, integrate the EUID GMA/IMA Plugin for GAM Secure Signals integration](#optional-euid-gmaima-plugin-for-gam-secure-signals-integration).

## Mobile SDK Version

This guide provides instructions for using either of these EUID mobile SDKs:

- SDK for Android (version 1.6.0 or later)
- SDK for iOS (version 1.7.0 or later)

For instructions for installing the correct SDK/version into your mobile app, see [Add the EUID Mobile SDK to Your Mobile App](#add-the-euid-mobile-sdk-to-your-mobile-app).

## Complete the EUID Account Setup

To set up your account, follow the steps described in [Account Setup](../getting-started/gs-account-setup.md).

When account setup is complete, you'll receive your unique API key and client secret. These values are unique to you, and it's important to keep them secure. For details, see [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret).

## Client-Server Mobile Integration Data Flow Overview

The following diagram shows the data flow that the publisher must implement for EUID client-server mobile integration.

This example uses the [SDK for Android](../sdks/sdk-ref-android.md) in the client-side mobile app and the [SDK for Java](../sdks/sdk-ref-java.md) on the server side.

![Mobile Client-Server Integration Example](images/integration-mobile-client-server-euid.png)

<!-- (**GWH_ https://ttdcorp-my.sharepoint.com/:p:/r/personal/RA_FILLINNAME_thetradedesk_com/_layouts/15/Doc.aspx?sourcedoc=%7BDF894943-3D6A-4A60-A1E2-176ACD0BBBCC%7D&file=Sample%20Data%20Flow.pptx&wdLOR=c8FEF9DB2-E2FD-4F07-B411-B094C4813ACE&fromShare=true&action=edit&mobileredirect=true**) -->

## Implement Server-Side Token Generation

For a client-server EUID integration for mobile, the first step is to be able to generate the EUID token on your server. Then, you can pass the token into your mobile apps for sending to the RTB bidstream.

For details, including instructions and examples, see [Server-Side Token Generation](../ref-info/ref-server-side-token-generation.md).

You will need to pass the `Identity` response into the mobile app: see [Configure the EUID Mobile SDK](#configure-the-euid-mobile-sdk).

:::warning
For security reasons, the API key and secret used in token generation must be called server-side. Do not store these values inside a mobile app.
:::

## Server-Side Token Refresh

<a href="../ref-info/glossary-uid#gl-token-refresh">Token refresh</a> is automatically enabled inside the EUID mobile SDKs; you don't need to manage it explicitly on the server side.

You might decide to do server-side token refresh if you want to keep your changes in the mobile apps as simple as possible.

If you want to manage token refresh on the server side and not the client/mobile side, you can do so using one of the following:

- Call the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint.
- Use one of the Publisher Client classes, in one of the EUID server-side SDKs. These classes simplify the request into a single method call. 

  For instructions, see [SDK for Java, Usage for Publishers, Basic Usage Server-Side Integration section](../sdks/sdk-ref-java.md#basic-usage-server-side-integration) or [SDK for Python, Usage for Publishers, Server-Side Integration section](../sdks/sdk-ref-python.md#server-side-integration).

Then, pass the newly refreshed `Identity` value to the mobile app by following the rest of this guide.

## Add the EUID Mobile SDK to Your Mobile App

For installation instructions, refer to one of the following:

- [SDK for Android Reference Guide](../sdks/sdk-ref-android.md)
- [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md)

At this point, you are ready to use the EUID Identity generated server-side in the mobile SDK.

### Using the EUID Integration Environment

By default, the SDK is configured to work with the EUID production environment: `https://prod.euid.eu/v2`. If you want to use the EUID integration environment instead, provide the following URL in your call to EUIDManager initialization:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.init(
  context = this,
  EUIDManager.Environment.Custom("https://integ.euid.eu/v2"),
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
// Must be set before EUIDManager.shared is accessed
UID2Settings.shared.euidEnvironment = .custom(
  url: URL(string: "https://integ.euid.eu/v2")!
)
```

</TabItem>
</Tabs>

:::note
Bear in mind the following differences between environments:
- Tokens from the EUID integration environment are not valid for passing to the bidstream.
- You'll have a different set of API key and client secret values for each environment (integration and production). Be sure to use the correct values for each environment.
:::

### Optional: Specifying the API Base URL to Reduce Latency

By default, this SDK makes calls to an EUID production environment server in the USA.

For information about how to choose the best URL for your use case, and a full list of valid base URLs, see [Environments](../getting-started/gs-environments.md).

To specify an EUID server that is not the default, you can change it in the `init` call:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.init(
  context = this,
  EUIDManager.Environment.Custom("https://prod.euid.eu/v2")
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Settings.shared.euidEnvironment = .london
// or
UID2Settings.shared.euidEnvironment = .custom(
  url: URL(string: "https://prod.euid.eu/v2")!
)
```

</TabItem>
</Tabs>

## Configure the EUID Mobile SDK

After you've instantiated `EUIDManager` correctly in your mobile app, you'll need to pass an EUID <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> generated server-side (see [Implement server-side token generation](#implement-server-side-token-generation)), and then pass it into the mobile app using the `setIdentity` method, as shown in the following:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().setIdentity()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
EUIDManager.shared.setIdentity()
```

</TabItem>
</Tabs>

## Token Storage

After you call the `setIdentity` method, the EUID identity is persisted in local file storage.

:::warning
The format of the file stored in the local file storage, or the filename itself, could change without notice. We recommend that you do not read or update the file directly.
:::

## Pass Generated Token for Bidstream Use

To retrieve the token, in your mobile app, call the following:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
EUIDManager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

If a successful identity was added into the EUIDManager, this method returns a string such as the following:

<ExampleAdvertisingToken />

You can use this identity to pass downstream for sending in the RTB bidstream.

If the `getAdvertisingToken()` method call returns `null`, there was no identity or valid token generated. Some possible reasons for this, and some things you could do to troubleshoot, are as follows:

- The identity is invalid. In this scenario there are a couple of options:
  - Check to see whether there are any errors from the previous `setIdentity()` call.
  - Check the status of the identity, using one of the following:
    - **Android Java**: `EUIDManager.getInstance().getCurrentIdentityStatus()` 
    - **Android Kotlin**: `EUIDManager.getInstance().currentIdentityStatus()` 
    - **iOS**: `EUIDManager.shared.identityStatus`
- You could enable logging to get more information: see [Enable Logging](#enable-logging).
- The advertising token inside the EUID identity has expired, and the refresh token has also expired, so the SDK cannot refresh the token.

If there is no identity, follow the instructions in [Implement Server-Side Token Generation](#implement-server-side-token-generation) again, generate a new identity, and pass the result into your mobile app's EUIDManager again.

## When to Pass a new EUID Identity/Token into the SDK

The best way to determine whether a new EUID identity is required by the EUID SDK again is to call the `getAdvertisingToken()` method in all cases:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
EUIDManager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

On startup/resumption of the app, if `getAdvertisingToken()` returns `null`, it is time to generate new identity on the server by following the instructions in [Implement Server-Side Token Generation](#implement-server-side-token-generation). Then, pass the result into the mobile app’s EUIDManager again: see [Configure the EUID mobile SDK](#configure-the-euid-mobile-sdk).

## Enable Logging

<EnableLogging />

## Enable Automatic Token Refresh in Mobile App/Client Side

By default, after a valid EUID identity has been passed into the EUIDManager, it performs automatic token refresh. If for any reason token refresh was disabled, you can enable it with the following method call:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

**Android Java**:

```java
EUIDManager.getInstance().setAutomaticRefreshEnabled(false)
```

**Android Kotlin**:

```kotlin
EUIDManager.getInstance().automaticRefreshEnabled = false
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
EUIDManager.shared.automaticRefreshEnabled = false
```

</TabItem>
</Tabs>

## Optional: EUID GMA/IMA Plugin for GAM Secure Signals integration

<GMAIMA_Plugins />

## Optional: EUID Integration with Prebid Mobile SDK

:::important
The EUID integration with Prebid Mobile SDK requires version 1.6.0 or later of the EUID SDK for Android, or version 1.7.0 or later of the EUID SDK for iOS.
:::

<PrebidMobileSDK />

## Error Response States

<ErrorResponseStates />
