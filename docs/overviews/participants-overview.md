---
title: Overview of EUID Participants
description: An overview of different types of EUID participants.
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Overview of EUID Participants

With its transparent and interoperable approach, EUID provides a collaborative framework for many participants across the advertising ecosystem—advertisers, publishers, DSPs, SSPs, single sign-on (SSO) providers, customer data platforms (CDPs), consent management providers (CMPs), identity providers, third-party data providers, and measurement providers.

The following tables list the key participants and their roles in the [EUID workflows](../ref-info/uid-workflows.md). They are grouped into three categories:

- [EUID Component Services](#euid-component-services)
- [EUID External Participants](#euid-external-participants)
- [EUID Consumers](#euid-consumers)

## EUID Component Services

The following table summarizes information about key participant components of the EUID service.

For a diagram of how the different services work together, see [EUID Workflows](../ref-info/uid-workflows.md).

| Participant | Role Description |
| :--- | :--- |
| **Core Administrator** | An organization (currently, The Trade Desk) that manages the EUID Core Service and other component services. For example, it distributes encryption keys and salts to EUID operators and sends user opt-out requests to operators and DSPs. |
| **Operators** | Organizations that run the <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> (via the EUID APIs). Operators periodically receive and store up-to-date encryption keys and salts from the EUID Core Service, salt and hash <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> to return raw EUIDs, encrypt raw EUIDs to generate EUID tokens, and distribute EUID token decryption keys.<br/>Public Operators (Open Operators) run public instances of the Operator Service. For example, The Trade Desk currently serves as a Public Operator for the EUID framework, available to all participants. If other Public Operators are available, a participant can choose which operator to work with.<br/>Any participant can also choose to become a Private Operator to generate and manage EUIDs. |

## EUID External Participants

The following table summarizes the main types of external participant partners for EUID, with a link to the overview page for more information on each participant type.

| Participant Type | Role Description |
| :--- | :--- |
| [Publishers](overview-publishers.md) | Organizations that propagate EUID tokens to the bidstream via SSPs&#8212;for example, identity providers, publishers, and SSO providers. Publishers can choose to work with an SSO provider or an independent ID provider that is interoperable with EUID. Independent ID providers can handle the EUID integration on behalf of publishers. |
| [Advertisers](overview-advertisers.md) | Organizations that buy impressions across a range of publisher sites and use DSPs to decide which ad impressions to purchase and how much to bid on them. |
| [DSPs](overview-dsps.md) | DSPs integrate with the EUID system to receive EUIDs from advertisers (as first-party data) and third-party data providers (as third-party data) and leverage them to inform bidding on EUIDs in the bidstream. |
| [Data Providers](overview-data-providers.md) | Organizations that collect user data and push it to other EUID participants&#8212;for example, advertisers, identity graph providers, and third-party data providers. |

## EUID Consumers

An EUID consumer is a user who has had an EUID token or raw EUID created from an email address or phone number.

EUID leverages multiple layers of security to help protect user and other participant data. EUID is a privacy-compliant identifier. With EUID, consumers can enjoy more personalized advertising without compromising privacy.

Consumers can opt out of EUID in the [EUID Transparency and Control Portal](https://transparentadvertising.eu).
