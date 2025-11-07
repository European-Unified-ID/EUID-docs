---
title: Environments
description: Information about the environments for EUID.
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Environments

Learn about the different environments available, and tips to reduce latency by choosing the best base URL for your integration.

## EUID Integration and Production Environments

The following table lists all current testing and production environments for EUID.

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| Integration Testing | AWS Europe (London) | `eu-west-2` | `https://integ.euid.eu/v2` |
| Production | AWS Europe (London) | `eu-west-2` | `https://prod.euid.eu/v2` |

For example, `https://integ.euid.eu/v2/token/generate`.

Notes:

- All EUID endpoints use the same base URL.
- The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.
- The expiration time of the <Link href="../ref-info/glossary-uid#gl-euid-token">EUID token</Link> returned by the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints is subject to change, but is always significantly shorter in the integration environment than it is in the production environment.
- The integration environment and the production environments produce different EUID values. You cannot use them interchangeably. Use the integration environment only for testing. When you're ready to go live, generate EUIDs for bidstream use.

## Getting Credentials for Each Environment

If you're using the integration environment as well as the production environment, you'll need to get a separate set of credentials for each environment.

For details about getting the values you need to access each environment, see [Getting Your Credentials](gs-credentials.md#getting-your-credentials).

<!-- uid2_euid_diff: "Specifying the Base URL to Reduce Latency" (section in UID2 docs) not applicable for EUID. -->
