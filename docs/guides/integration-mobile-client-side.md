---
title: EUID Client-Side Integration Guide for Mobile
sidebar_label: Client-Side Integration for Mobile
pagination_label: EUID Client-Side Integration Guide for Mobile
description: Setting up a mobile integration with token generate and refresh both on the client side.
hide_table_of_contents: false
sidebar_position: 04
---
import Link from '@docusaurus/Link';
import IntegratingWithSSO from '/docs/snippets/_integrating-with-sso.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ExampleAdvertisingToken from '/docs/snippets/_example-advertising-token.mdx';
import EnableLogging from '/docs/snippets/_mobile-docs-enable-logging.mdx';
import GMAIMA_Plugins from '/docs/snippets/_mobile_docs_gmaima-plugin-gss.mdx';
import PrebidMobileSDK from '/docs/snippets/_mobile_docs_prebid-mobile.mdx';
import ErrorResponseStates from '/docs/snippets/_mobile-docs-error-response-states.mdx';

# EUID Client-Side Integration Guide for Mobile

This guide is for mobile app publishers who want to integrate with EUID with changes only within their mobile app.

These instructions do not apply to publishers who want to use a Private Operator, or who want to generate tokens server-side. Those publishers should follow the [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md).

This page provides a high-level overview of integration steps and links to additional documentation.

EUID provides mobile SDKs for [Android](../sdks/sdk-ref-android.md) and [iOS](../sdks/sdk-ref-ios.md). Each SDK has the following features:

- Generates an EUID <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (an EUID token and associated values) and persists it in local file storage.
- Automatically refreshes EUID tokens.

:::note
This guide uses the group term **EUID mobile SDKs** to include both the SDK for Android and the SDK for iOS.
:::

For FAQs relating to mobile publisher integrations, see [FAQs for Mobile Integrations](integration-mobile-overview.md#faqs-for-mobile-integrations).

To integrate with EUID client-side, you'll need to complete the following steps:

1. [Complete the EUID account setup](#complete-the-euid-account-setup).

1. [Add the EUID mobile SDK to your mobile app](#add-the-euid-mobile-sdk-to-your-mobile-app).

1. [Configure the EUID mobile SDK](#configure-the-euid-mobile-sdk).

1. [Check that the token was successfully generated and then pass it for bidstream use](#pass-generated-token-for-bidstream-use).

1. [Optionally, integrate the EUID GMA/IMA Plugin for GAM Secure Signals integration](#optional-euid-gmaima-plugin-for-gam-secure-signals-integration).

## Mobile SDK Version

This guide provides instructions for using either of these EUID mobile SDKs:

- SDK for Android (version 1.6.0 or later)
- SDK for iOS (version 1.7.0 or later)

For instructions for installing the correct SDK/version into your mobile app, see [Add the EUID Mobile SDK to Your Mobile App](#add-the-euid-mobile-sdk-to-your-mobile-app).

## Client-Side Integration Example

For an example of how to configure an EUID mobile SDK, and how to generate tokens using client-side integration for mobile, you can try out the EUID development app.

Follow the applicable instructions, for Android or iOS:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

1. Check out the main branch of the [SDK for Android source code repository on GitHub](https://github.com/IABTechLab/uid2-android-sdk/tree/main).
1. In Android Studio (check the version required in the [Minimum Requirements](../sdks/sdk-ref-android.md#minimum-requirements) section in the SDK for Android Reference Guide), open the directory that you checked out.
1. In [AndroidManifest.xml](https://github.com/IABTechLab/uid2-android-sdk/blob/main/dev-app/src/main/AndroidManifest.xml), set `uid2_environment_euid` to `true`.
1. Run the **dev-app** app.
1. When you've started the app, make sure that the **Client Side** checkbox is checked.
1. Enter an email address or phone number, and then click the arrow to the right.

</TabItem>
<TabItem value='ios' label='iOS'>
EUID
1. Check out the [main branch of the EUID SDK For iOS source code repository on GitHub](https://github.com/IABTechLab/uid2-ios-sdk/tree/main).
1. In Xcode, open this project file:

   ```js
   Development/UID2SDKDevelopmentApp/UID2SDKDevelopmentApp.xcodeproj
   ```
1. In `Development/UID2SDKDevelopmentApp/UID2SDKDevelopmentApp/Info.plist` in Xcode's editor, set the `UID2EnvironmentEUID` key to `YES`. Alternatively, you can use `plutil` from the command line: 
   ```console
   plutil -replace UID2EnvironmentEUID -bool YES Development/UID2SDKDevelopmentApp/UID2SDKDevelopmentApp/Info.plist
   ```
   to revert back to using a UID2 environment:
   ```console
   plutil -replace UID2EnvironmentEUID -bool NO Development/UID2SDKDevelopmentApp/UID2SDKDevelopmentApp/Info.plist
   ```
1. Run the **UID2SDKDevelopmentApp** app scheme.
1. When you've started the app, make sure that the **Client Side** checkbox is checked.
1. Enter an email or phone number, and then click the arrow to the right.

</TabItem>
</Tabs>

Behind the scenes, the development app makes the following EUID SDK API call. This call sends a request to the EUID service to generate an <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (an EUID token and associated values) for the email/phone input:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
EUIDManager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```

</TabItem>
</Tabs>

When the API call is successful, the app displays the resulting identity and persists it inside the `EUIDManager` class.

The identity includes the generated EUID advertising token value, which you can retrieve using the `getAdvertisingToken()` method call:

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

This method call returns the value that you need to make an ad request: see [Pass Generated Token for Bidstream Use](#pass-generated-token-for-bidstream-use).

### Testing With Your Own Configuration

By default, the development app uses default values for Subscription ID and public key, which are stored in the following object:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
com.uid2.dev.ui.MainScreenViewModel.Companion
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
RootViewModel
```

</TabItem>
</Tabs>

By default, the development app is configured to connect to the EUID integration environment, as specified in the following Android method call/iOS file:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
com.uid2.EUIDManager.Companion#init
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
see UID2SDKDevelopmentApp/UID2SDKDevelopmentApp/Info.plist
```

</TabItem>
</Tabs>

If necessary, you can also change the default Subscription ID and public key to values assigned to you, and connect to the EUID Production environment. For details, see [Optional: Specifying the API Base URL to Reduce Latency](#optional-specifying-the-api-base-url-to-reduce-latency).

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Complete the EUID Account Setup

To set up your account, follow the steps described in [Account Setup](../getting-started/gs-account-setup.md). As part of the account setup process, you'll need to provide a list of <Link href="../ref-info/glossary-uid#gl-app-name">app names</Link> for all the mobile apps that you'll be integrating with the EUID mobile SDKs, including any of these values that apply:

- Android Application ID
- iOS Bundle Identifier
- iOS App Store ID

When account setup is complete, you'll receive a client keypair consisting of two values that identify you to the EUID servers: Subscription ID and public key. These values are unique to you, and you'll use them when you [configure the EUID mobile SDK](#configure-the-euid-mobile-sdk). For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key).

## Add the EUID Mobile SDK to Your Mobile App

To add the mobile SDK to your app, follow the applicable documentation:

- [SDK for Android Reference Guide](../sdks/sdk-ref-android.md)
- [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md)

At this point, you are ready to start generating EUID tokens using the SDK.

### Using the EUID Integration Environment

By default, the SDK is configured to work with the EUID production environment: `https://prod.euid.eu/v2`. If you want to use the integration environment instead, provide the following URL in your call to initialize `EUIDManager`:

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
- Tokens from the EUID integration environment are not valid for passing to the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.
- You'll have a different set of Subscription ID and public key values for each environment (integration and production). Be sure to use the correct values for each environment.
:::

### Optional: Specifying the API Base URL to Reduce Latency

By default, this SDK makes calls to an EUID production environment server in the USA.

For information about how to choose the best URL for your use case, and a full list of valid base URLs, see [Environments](../getting-started/gs-environments.md).

To specify an EUID server that is not the default, you can make config changes, as shown in the following examples:

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
// Must be set before EUIDManager.shared is accessed
UID2Settings.shared.euidEnvironment = .custom(
  url: URL(string: "https://prod.euid.eu/v2")!
)
// or use a named environment
UID2Settings.shared.euidEnvironment = .london
```

</TabItem>
</Tabs>

## Configure the EUID Mobile SDK

EUID provides the publisher with the following values, which are needed for generating the EUID token on the client side:

- Subscription ID
- Public key

You'll have one set of these values for your Integration environment, and a separate set for your production environment.

To configure the SDK, you must pass in the Subscription ID and public key that you received during account setup, as well as the user’s hashed or unhashed directly identifying information (<Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link>) (email address or phone number), into the following method call:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
EUIDManager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```

</TabItem>
</Tabs>

Once it's configured, the EUID mobile SDK does the following:

- Generates an EUID identity, including token, for the user.
- Stores the token locally on the user’s device.
- Automatically refreshes the token as required while your app is open.

:::tip
You can pass the user’s <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> to the EUID mobile SDK either hashed or unhashed. If you pass the personal data unhashed, the SDK hashes it for you. If you want to pass the personal data to the SDK already hashed, you must normalize it before hashing. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).
:::

### Format Examples for Personal Data

The SDK encrypts the hashed personal data before sending it to the EUID service.

You can invoke the `generateIdentity` method using one of the two accepted formats for personal data, for any specific user. The personal data format might vary per user, but you can only send one value per user.

The following examples demonstrate the different ways that you can configure the EUID mobile SDK and list the requirements for the personal data passed into the SDK:

- Email, Unhashed
- Email, Normalized and Hashed
- Phone Number, Unhashed
- Phone Number, Normalized and Hashed

If the `generateIdentity` method is called multiple times, the EUID mobile SDK uses the most recent configuration values.

<Tabs>
<TabItem value='example_email_unhashed' label='Email, Unhashed'>

The following example configures the EUID mobile SDK with an email address.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().generateIdentity(
    IdentityRequest.Email("test@example.com"),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
struct InvalidEmailError: Error, LocalizedError {
    var errorDescription: String = "Invalid email address"
}
Task<Void, Never> {
    do {
        guard let normalizedEmail = IdentityType.NormalizedEmail(string: "test@example.com") else {
            throw InvalidEmailError() // email is invalid and cannot be normalized, handle error
        }
        try await EUIDManager.shared.generateIdentity(
            .email(normalizedEmail),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

In this scenario:

- No normalization or hashing is required by the publisher.
- The EUID mobile SDK normalizes and hashes the email address before sending the encrypted hash to the EUID service.

</TabItem>
<TabItem value='example_email_hash' label='Email, Normalized and Hashed'>

The following example configures the EUID SDK with a hashed email address.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().generateIdentity(
    IdentityRequest.EmailHash(
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="
    ),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
Task<Void, Never> {
    do {
        try await EUIDManager.shared.generateIdentity(
            .emailHash("EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

In this scenario:

- The publisher is responsible for normalizing and hashing the email address. For details, see [Email Address Normalization](../getting-started/gs-normalization-encoding.md#email-address-normalization).
- The EUID mobile SDK encrypts the hashed personal data before sending it to the EUID service.

</TabItem>
<TabItem value='example_phone_unhashed' label='Phone Number, Unhashed'>

The following example configures the EUID mobile SDK with a phone number.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().generateIdentity(
    IdentityRequest.Phone("+12345678901"),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
struct InvalidPhoneError: Error, LocalizedError {
    var errorDescription: String = "Invalid phone number"
}
Task<Void, Never> {
    do {
        guard let normalizedPhone = IdentityType.NormalizedPhone(normalized: "+12345678901") else {
            throw InvalidPhoneError() // Phone number is not normalized according to ITU E.164.
        }
        try await EUIDManager.shared.generateIdentity(
            .phone(normalizedPhone),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

In this scenario:

- The publisher is responsible for normalizing the phone number. For details, see [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization).
- The EUID mobile SDK hashes the phone number before sending the encrypted hash to the EUID service.

</TabItem>
<TabItem value='example_phone_hash' label='Phone Number, Normalized and Hashed'>

The following example configures the EUID mobile SDK with a hashed and Base64-encoded phone number.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().generateIdentity(
    IdentityRequest.PhoneHash(
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="
    ),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
Task<Void, Never> {
    do {
        try await EUIDManager.shared.generateIdentity(
            .phoneHash("EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

In this scenario: 

- The publisher is responsible for normalizing and hashing the phone number. For details, see [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding).
- The EUID mobile SDK encrypts the hashed personal data before sending it to the EUID service.

</TabItem>
</Tabs>

## Token Storage and Refresh

After a call to the applicable method listed in [Format Examples for Personal Data](#format-examples-for-personal-data) is successful, an identity is generated and stored in local file storage. The EUID mobile SDK refreshes the EUID token periodically.

:::warning
The format of the file stored in the local file storage, or the filename itself, could change without notice. We recommend that you do not read or update the file directly.
:::
 
## Pass Generated Token for Bidstream Use

In your mobile app, if the call to `generateIdentity` was successful, it returned an identity. The next step is to call the `getAdvertisingToken()` method, as follows:

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

If successful, this method call returns the token&#8212;a non-null string object such as the following: 

<ExampleAdvertisingToken />

You can use this token to pass downstream for sending in the RTB bidstream.

If the `getAdvertisingToken()` method call returns `null`, there was no identity or valid token generated.

Some possible reasons for this, and some things you could do to troubleshoot, are as follows:

- The identity is invalid. In this scenario there are a couple of options:
  - Check to see whether there are any errors from the previous `generateIdentity` call.
  - Check the status of the identity, using one of the following:
    - **Android Java**: `EUIDManager.getInstance().getCurrentIdentityStatus()`
    - **Android Kotlin**: `EUIDManager.getInstance().currentIdentityStatus()`
    - **iOS**: `EUIDManager.shared.identityStatus`

    It's possible that the personal data has been opted out of EUID: for details, see [When to Pass Personal Data into the SDK](#when-to-pass-personal-data-into-the-sdk).
- You could enable logging (set `isLoggingEnabled` to `true`) to get more information: see [Enable Logging](#enable-logging).
- The advertising token inside the EUID identity has expired, and the refresh token has also expired, so the SDK cannot refresh the token.

If there is no identity, you'll need to call the `generateIdentity` method again: see [Configure the EUID Mobile SDK](#configure-the-euid-mobile-sdk).

For more information, see [When to Pass Personal Data into the SDK](#when-to-pass-personal-data-into-the-sdk) (next section).

## When to Pass Personal Data into the SDK

The first time a new user opens the app, no EUID identity exists. You'll need to call the `generateIdentity` method, with the personal data, to start the token generation:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
EUIDManager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
EUIDManager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```

</TabItem>
</Tabs>

When this method call completes successfully, the advertising token (EUID token) is available for you to send to the bidstream.

If the EUID identity stored in local file storage has expired and cannot be refreshed, you must call the `generateIdentity` method again to generate a new identity and get the resulting EUID token. The only exception is when the response to the following Android method/iOS object indicates that the personal data was opted out of EUID:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

**Android Java**:

```java
EUIDManager.getInstance().getCurrentIdentityStatus()
```

**Android Kotlin**:

```kotlin
EUIDManager.getInstance().currentIdentityStatus()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
EUIDManager.shared.identityStatus
```

</TabItem>
</Tabs>

A response status of `OPT_OUT` for Android, or `optOut` for iOS, indicates that the personal data has been opted out of EUID and no identity/token should be generated for it. You might want to avoid making repeated `generateIdentity` calls: if the personal data has a status of opted out, the EUID token is not generated.

The best way to determine if personal data is required by the EUID mobile SDKs is to always call the `getAdvertisingToken()` method when the app starts up or resumes:

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

If `getAdvertisingToken()` returns null, and the identity status is not `OPT_OUT`/`optOut`, you'll need to generate a new token. To do this, pass the personal data into the `generateIdentity` method again. For details, see [Configure the EUID mobile SDK](#configure-the-euid-mobile-sdk).

## Enable Logging

<EnableLogging />

## Optional: EUID GMA/IMA Plugin for GAM Secure Signals integration

<GMAIMA_Plugins />

## Optional: EUID Integration with Prebid Mobile SDK

:::important
The EUID integration with Prebid Mobile SDK requires version 1.6.0 or later of the EUID SDK for Android, or version 1.7.0 or later of the EUID SDK for iOS.
:::

<PrebidMobileSDK />

## Error Response States

<ErrorResponseStates />
