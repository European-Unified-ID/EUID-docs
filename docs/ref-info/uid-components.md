---
title: EUID Components
description: Summary of key components of the EUID technical infrastructure.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# EUID Components

The EUID framework consists of the following components, all of which are currently managed by The Trade Desk.

| Component | Description |
| :--- | :--- |
| **Core Service** | A centralized service that manages access to <a href="glossary-uid#gl-salt">salts</a>, <a href="glossary-uid#gl-encryption-key">encryption keys</a>, and other relevant data in the EUID ecosystem. |
| **Operator Service** | A service that enables the management and storage of encryption keys and salts from the EUID Core Service, hashing of users' personal data, encryption of raw EUIDs, and decryption of EUID tokens. There can be multiple instances of the service (public or private) operated by multiple [participants](../overviews/participants-overview.md#euid-component-services), known as operators.<br/><Link href="glossary-uid#gl-public-operator">Public Operators</Link> run publicly available instances of the <Link href="glossary-uid#gl-operator-service">Operator Service</Link> and make them available to all relevant EUID participants. There might also be <Link href="glossary-uid#gl-private-operator">Private Operators</Link> that run private instances of the Operator Service exclusively for their own use. All instances are designed with protections to keep critical EUID data secure and interoperable, regardless of who operates the service. |
| **Opt-Out Service** | A global service that manages and stores user opt-out requests and disseminates them to publishers, operator service instances, and DSPs. |
| **Transparency and Control Portal** | A user-facing website, [https://transparentadvertising.eu](https://transparentadvertising.eu), that allows consumers to opt out of EUID at any time. |
