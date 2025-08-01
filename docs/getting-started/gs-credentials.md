---
title: EUID Credentials
description: Learn about the credentials you'll need and how to get them.
hide_table_of_contents: false
sidebar_position: 03
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# EUID Credentials

Each EUID <a href="../overviews/participants-overview">participant</a> gets a set of unique credentials. The set of credentials you get is determined by how you are participating in EUID, as shown in the following table.

| Audience | Credentials | Integration |
| :--- | :--- | :--- |
| Participants using a client-side implementation | Both of the following: <ul><li><Link href="../ref-info/glossary-uid#gl-subscription-id">Subscription ID</Link></li><li><Link href="../ref-info/glossary-uid#gl-public-key">Public key</Link></li></ul>These two, together, are sometimes called <Link href="../ref-info/glossary-uid#gl-client-keypair">client keypair</Link>. | Integrations using one of these: <ul><li>[EUID Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)</li><li>[Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)</li><li>[EUID Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li></ul> |
| Participants using a client-server implementation | Both of the following:<ul><li><Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>, also called a client key</li><li><Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>, a value known only to the participant and the EUID service</li></ul> | Integrations using one of these: <ul><li>[Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)</li><li>[EUID Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)</li><li>[EUID Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul> |
| Participants using a server-side implementation | Both of the following:<ul><li><Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>, also called a client key</li><li><Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>, a value known only to the participant and the EUID service</li></ul> | Integrations using one of these: <ul><li>[Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)</li><li>[Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md)</li></ul> |

If you're using the integration environment as well as the production environment, you'll get a separate set of credentials for each environment.

## Getting Your Credentials

To get your credentials, ask your EUID contact.

## Subscription ID and Public Key

If you're using a client-side implementation (see [EUID Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) or [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)), you'll receive the following credentials:
- **Subscription ID**: This value identifies your site to the EUID service.
- **Public key**: This value is used for encryption.

**Client keypair** is a group term we use for these two values, which are used to uniquely define an account that's using an implementation that generates the token on the client side.

When you're implementing EUID on the client side, by using the EUID JavaScript SDK, Client-Side Integration for Mobile, or Prebid.js, provide the values to the SDK or to Prebid.js as part of configuration.

Notes:

- Unlike the API key and client secret, the Subscription ID and public key do not have to be kept secure.

- The values are valid for a specific [environment](gs-environments.md). If you're using both the integration and production environments, you'll get a set of credentials for each environment.

- Subscription ID and public key credentials can be used only to generate client-side tokens. If you need any additional roles (see [API Permissions](gs-permissions.md)), request API Key and Client Secret for those roles. 

## API Key and Client Secret

If you're using a client-server or server-side implementation (see [EUID Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md) or [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)), the API key and client secret allow you to connect to the <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> and call API endpoints. These values identify you to the service.

Here is some information about API keys and client secrets:
- It's important that you keep these values secure. For details, see [Security of API Key and Client Secret](#security-of-api-key-and-client-secret).
- One EUID participant can have multiple keys.
- Each key has a set of [permissions](gs-permissions.md) that determine the endpoints you can use it on.
- Each key has a corresponding client secret.
- Most API endpoints require both API key and client secret for authentication. For details, see [Authentication and Authorization](gs-auth.md).
- If you're using the integration environment as well as the production environment, you'll receive separate API keys for each environment.
- The client secret is valid for a specific [environment](gs-environments.md). If you're using both the integration and production environments, you'll get a client secret for each environment.

As part of getting your EUID account set up, we'll give you one or more API keys, each with a corresponding client secret. For details of who to talk to, see [Contact Info](gs-account-setup.md#contact-info).

### Security of API Key and Client Secret

Security of keys and client secrets is very important. Follow these guidelines:

- When you receive your API key and client secret, store them in a secure location.
- Keep track of all places where these values are stored and used, so that if you need to rotate the key you can do it quickly.
- Establish a process for replacing the key and secret with new values if the existing ones are compromised.

It's best to refresh your API key and client secret on a regular cadence&#8212;for example, yearly&#8212;to help reduce the risk of your credentials being compromised.

## Separate Credentials for Each Environment

If you want to use the integration environment as well as the production environment, you'll need a separate set of credentials for each environment. For details about the different environments, see [Environments](gs-environments.md).

## Refreshing Credentials

To request new credentials at any time, ask your EUID contact.
