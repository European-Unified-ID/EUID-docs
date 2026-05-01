---
title: Account Setup
description: Information about setting up an EUID account.
hide_table_of_contents: false
sidebar_position: 02
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Account Setup

This page provides general information required for you to get your account set up with EUID.

## Contact Info

To get access to the EUID framework, contact the appropriate team at The Trade Desk listed below. 

If you have an existing relationship with The Trade Desk (the current EUID Administrator), connect directly with your contact to get started with EUID.

:::note
Contacting The Trade Desk for access is temporary. When the system is moved to independent governance, the governing organizations will manage access requests.
:::

| Your Role | Contact Email |
| :--- | :--- |
| Publisher, App Developer | [dl-EUID-publishers@thetradedesk.com](mailto:dl-EUID-publishers@thetradedesk.com) |
| Agency, Brand, DSP, SSP, customer data platform (CDP), Data Provider | [dl-EUID-partners@thetradedesk.com](mailto:dl-EUID-partners@thetradedesk.com) |

## Account Setup Details

When you've expressed interest in EUID, someone will contact you to help work out the details.

As part of account setup, provide the following information:
* Name
* Email address
* Company name
* Name and contact information for an authorized individual who can sign the contract.

### Client-Side Web Integrations

If you'll be requesting EUID tokens from the client side on the [web](../overviews/overview-publishers.md#web-integrations) rather than in [mobile](../overviews/overview-publishers.md#mobile-integrations) apps, you must also provide a list of **domain names** for your sites. This is a security measure, for client-side implementation only.

:::tip
Only root-level domains are required for account setup. For example, if you're going to implement EUID to generate tokens on the client side on example.eu, shop.example.eu, and example.org, you only need to provide the domain names example.eu and example.org.
:::

### Client-Side Mobile Integrations

If you'll be requesting EUID tokens from the client side in [mobile apps](../guides/integration-mobile-client-side.md), it's important to provide a complete list of all your mobile app IDs, including:

- Android App ID: any that apply.
- iOS/tvOS Bundle ID and corresponding iOS App Store ID: any that apply.

## Credentials

When you've signed a contract for participating in EUID, we'll give you [EUID credentials](gs-credentials.md) and additional information for getting up and running with EUID.

:::note
If you want to use the integration environment as well as the production environment, you'll need a separate set of credentials for each environment. For details about the different environments, see [Environments](gs-environments.md).
:::

## API Version

The current version of the EUID API is v2.
