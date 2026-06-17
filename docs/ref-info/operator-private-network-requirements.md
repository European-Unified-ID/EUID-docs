---
title: Private Operator network egress
sidebar_label: Private Operator network egress
pagination_label: Private Operator network egress
description: Outbound network destinations a Private Operator must reach, for configuring egress firewall allowlists.
hide_table_of_contents: false
sidebar_position: 16
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Private Operator network egress

A <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> connects to the EUID <Link href="../ref-info/glossary-uid#gl-core-service">Core</Link> and <Link href="../ref-info/glossary-uid#gl-opt-out-service">Opt-Out</Link> services, and downloads data files directly from AWS S3 using URLs that the Core service provides. For details, see [Private Operator workflow](../guides/integration-options-private-operator.md#private-operator-workflow).

If your environment restricts outbound network traffic, you must allow outbound HTTPS (port 443) to all of the destinations below, or the operator cannot start.

## Integration

| Hostname | Purpose |
| --- | --- |
| `core.integ.euid.eu` | Core Service (attestation, keys, salts, configuration) |
| `optout.integ.euid.eu` | Opt-Out Service |
| `euid-core-integ-store.s3.eu-west-2.amazonaws.com` | Core data storage |
| `euid-optout-integ-store.s3.eu-west-2.amazonaws.com` | Opt-out data storage |

## Production

| Hostname | Purpose |
| --- | --- |
| `core.prod.euid.eu` | Core Service (attestation, keys, salts, configuration) |
| `optout.prod.euid.eu` | Opt-Out Service |
| `euid-core-prod-store.s3.eu-west-2.amazonaws.com` | Core data storage |
| `euid-optout-prod-store.s3.eu-west-2.amazonaws.com` | Opt-out data storage |

Allow these by hostname rather than by IP address, because the underlying addresses might change.
