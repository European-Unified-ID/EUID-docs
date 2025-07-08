---
title: Environments
description: Information about the environments for EUID.
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Environments

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
