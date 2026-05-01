---
title: EUID Overview
description: Introduction to EUID documentation.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# European Unified ID Overview

European Unified ID (EUID) is a framework that enables deterministic identity for advertising opportunities on the open internet for many [participants](overviews/participants-overview.md#euid-external-participants) across the advertising ecosystem. The EUID framework enables publisher websites, mobile apps, and Connected TV (CTV) apps to monetize through programmatic workflows. Built on the [UID2 framework](https://unifiedid.com/docs/intro), EUID offers privacy controls designed to help participants meet market requirements in many European countries and some other regions such as the UK.

:::note
The term "EUID" can refer to either the framework or an actual identifier. Unless otherwise indicated, this page provides an overview of the EUID framework.
:::

### EUID vs. UID2

EUID is an open-source, standalone solution with its own unique namespace that builds on the [UID2 framework](https://unifiedid.com/docs/intro). The main differences between UID2 and EUID result from more stringent European and UK data protection laws relating to consent practices, rights for data subjects, and obligations between participants. Otherwise, EUID follows the same [guiding principles](#guiding-principles) as UID2.

:::important
Even though it is built on the UID2 framework, EUID is a separate framework.
:::

The following table summarizes the key differences between the two frameworks.

| Comparison Aspect | UID2 | EUID |
| :--- | :--- | :--- |
| Open-sourced framework | Yes | Yes |
| Interoperability | Yes | Yes |
| Personal data used | Email addresses, phone numbers | Email addresses, phone numbers |
| Consent | Based on local regulations such as the California Privacy Rights Act (CPRA) and the California Consumer Privacy Act (CCPA). | Driven by the General Data Protection Regulation (GDPR), the Transparency and Consent Framework (TCF) operated by IAB, and local regulatory guidance. |

## Guiding Principles

The EUID framework has the following principles as its foundation:

- **First-party relationships**: EUID enables advertisers to activate their first-party data on publisher websites across the open internet.

- **Non-proprietary (universal) standard**: All [participants](overviews/participants-overview.md#euid-external-participants) in the advertising ecosystem who execute an appropriate participation agreement can access EUID.

- **Open source**: The source code for the [EUID Component Services](overviews/participants-overview.md#euid-component-services) is publicly available.

- **Interoperable**: The framework allows other identity solutions (commercial and proprietary) to integrate and provide EUID tokens with their offerings.

- **Secure and encrypted data**: EUID leverages multiple layers of security to help protect user and other participant data.

- **Consumer control**: Consumers can opt out of EUID at any time through the [Transparency and Control Portal](https://transparentadvertising.eu).

## Technical Design Principles

The EUID framework is built on the following technical principles:

- **Distributed integration**: Multiple certified integration paths provide options for publishers, advertisers, and third-party data providers to manage and exchange EUID tokens.

- **Decentralized storage**: The framework does not have centralized storage for <Link href="ref-info/glossary-uid#gl-personal-data">personal data</Link> mappings. All participants maintain only their own data.

- **Lean infrastructure**: The EUID system is light and inexpensive to operate.

- **Internet scale**: The EUID infrastructure can scale to address the continuously increasing needs of [participants](overviews/participants-overview.md#euid-external-participants) and to meet performance demands of specific geographic regions.

- **Self-reliant**: EUID does not rely on external services for the processing of real-time bidding (RTB) data.

## Elements of the EUID Infrastructure

For information about key elements of the EUID infrastructure, and other aspects of EUID, refer to the following pages:

- [EUID Identifier Types](ref-info/uid-identifier-types.md)
- [UID2 Components](ref-info/uid-components.md)
- [EUID Participants](overviews/participants-overview.md)
- [EUID Workflows](ref-info/uid-workflows.md)

## FAQs

See [Frequently Asked Questions](getting-started/gs-faqs.md).

## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
