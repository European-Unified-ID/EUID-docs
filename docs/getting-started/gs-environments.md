---
title: Environments
description: Information about the environments for EUID.
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# Environments

The following table lists all current testing and production environments for EUID.

All EUID endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | `https://integ.euid.eu/v2` |
| Production | `https://prod.euid.eu/v2` |

For example, https://integ.euid.eu/v2/token/generate

NOTES:

- All EUID endpoints use the same base URL.
- The integration environment and the production environment require different API keys.
- The expiration time of the EUID token returned by  the [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) endpoints is subject to change, but is always significantly shorter in the integration environment than it is in the production environment.
