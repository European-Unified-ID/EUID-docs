[EUID Overview](../../../README.md) > [v2](../summary-doc-v2.md) > [Getting Started: Summary](gs-summary.md) > EUID Credentials

# EUID Credentials

This page provides information about the different types of credentials you'll need to participate in EUID. It includes:

* [Overview](#overview)
* [API Key and Client Secret](#api-key-and-client-secret)
  * [Security of API Key and Client Secret](#security-of-api-key-and-client-secret)
* [Refreshing Credentials](#refreshing-credentials)

## Overview

Each EUID <a href="../../../README.md#participants">participant</a> gets a set of unique credentials, as shown in the following table.

| Audience | Credentials | Integration |
| :--- | :--- | :--- |
| Participants using a server-side endpoint | Both of the following:<ul><li>API key, also called a client key</li><li>Client secret, a value known only to the participant and the EUID service</li></ul> | Any integration using one of these endpoints: <ul><li>[POST&nbsp;/identity/map](../endpoints/post-identity-map.md)</li><li>[POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md)</li><li>[POST&nbsp;/token/generate](../endpoints/post-token-generate.md)</li></ul> |

If you're using the integration environment as well as the production environment, you'll get a separate set of credentials for each environment.

## API Key and Client Secret

Here is some information about API keys and client secrets:
- One EUID participant can have multiple keys.
- Each key has a set of permissions<!-- (link removed for EUID) --> that determine the endpoints you can use it on.
- Each key has a corresponding client secret.
- Most API endpoints require both API key and client secret for authentication. For details, see [Authentication and Authorization](gs-auth.md).
- If you're using the integration environment as well as the production environment, you'll receive separate API keys for each environment.
- The client secret is valid for a specific [environment](gs-environments.md). If you're using both the integration and production environments, you'll get a client secret for each environment.

As part of getting your EUID account set up, one or more API keys, each with a corresponding client secret, will be issued to you. For details of who to talk to, see [Contact Info](gs-account-setup.md#contact-info).

### Security of API Key and Client Secret

Security of keys and client secrets is very important. Follow these guidelines:

- When you receive your API key and client secret, store them in a secure location.
- Keep track of all places where these values are stored and used, so that if you need to rotate the key you can do it quickly.
- Establish a process for replacing the key and secret with new values if the existing ones are compromised.

It's best to refresh your API key and client secret on a regular cadence&#8212;for example, yearly&#8212;to help reduce the risk of your credentials being compromised.

## Refreshing Credentials

To request new credentials at any time, ask your EUID contact.
