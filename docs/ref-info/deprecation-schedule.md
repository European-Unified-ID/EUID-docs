---
title: Deprecation Schedule
description: Deprecation timeline for versions of EUID APIs and services.
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import UpgradePolicy from '../snippets/_private-operator-upgrade-policy.mdx';

# Deprecation Schedule

The following sections provide information about supported versions and, where applicable, the deprecation timeline.

## Private Operator Versions

The following table shows the Private Operator versions that are currently supported:
- [Private Operator for AWS](#private-operator-for-aws)

:::important
If you're using an older version, refer to the Deprecation Date column for information about the support lifetime for your version. We recommend upgrading to the latest version as soon as possible to take advantage of new and improved features.
:::

### Private Operator Upgrade Policy

<UpgradePolicy />

### Private Operator for AWS

The latest ZIP file is available in the Assets section at the bottom of the linked Release Notes in the following table.

| Version Name | Version&nbsp;#/Release&nbsp;Notes | AWS Version |  Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | [v5.55.9](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.55.9-r1) | 5.55.9 | July 1, 2025 | July 1, 2026 |
| Q1 2025 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | 5.49.7 | Mar 19, 2025 | Mar 31, 2026 |
| Q3 2024 Out-of-band | [v5.41.0](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.41.0) | 5.41.0 | October 29, 2024 | Mar 31, 2026 |
| Q3 2024 | [v5.38.104](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.38.104) | 5.38.104 | September 12, 2024 | Mar 31, 2026 |
| Q2 2024 | [v5.37.12](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.37.12) | 5.37.12 | June 12, 2024 | Sep 30, 2025 |

For documentation, see [EUID Private Operator for AWS Integration Guide](..\guides\operator-guide-aws-marketplace.md).

## Endpoint Versions

Version 2 of the `POST /identity/map` endpoint has been superseded by version 3, which includes the additional advantages listed in [Version 3 Improvements](../endpoints/post-identity-map.md#version-3-improvements).

With version 3 of the `POST /identity/map` endpoint, the `POST /identity/buckets` endpoint is no longer used at all.

The following table shows the deprecation schedule for the v2 endpoints.

Endpoint | Deprecation Date | 
| ------- | ------ |
| `POST /v2/identity/map` | June 30, 2026 |
| `POST /v2/identity/buckets` | June 30, 2026 |
