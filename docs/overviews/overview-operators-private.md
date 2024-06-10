---
title: Private Operators
description: Information summary for private Operators.
hide_table_of_contents: false
use_banner: true
banner_title: EUID Overview for Private Operators
banner_description: Own the process of generating EUIDs from personal data in a private environment.
---

import Link from '@docusaurus/Link';

Private Operators of EUID send first-party <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> to a secure environment for translation, and control the destinations for those identifiers. A participant that chooses to become a private Operator (previously known as closed Operator) can generate and manage EUIDs, running an EUID Operator service in a private environment.

Learn about what the EUID framework offers to private Operators, including benefits, hosting options, documentation and other resources, and how to get started.

## Benefits

Here are some of the intended benefits of participating in EUID as a private Operator:
- You can maintain privacy-conscious workflows for your customer data to be encrypted and activated across chosen partners.
- You can participate in EUID using your own first-party <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> without sharing it.
- You have full control of resources, performance, and latency for EUID.
- You can plan to minimize network hops with a service that can provide regional proximity.
- You can implement processes and policies that you control, as opposed to taking part in a shared service.

For details, see [The EUID Operator](../ref-info/ref-operators-public-private.md).

## Hosting Options for Private Operators

If you choose to be a private Operator, several implementation options are available. You can do any of the following:

- Use a cloud services setup. EUID supports hosting EUID in an <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link> on the following cloud service provider (medium level of effort to implement):
  - Amazon Web Services (AWS)
- Use your own machines to generate and manage EUIDs (greater level of effort to implement).

## Getting Started

1. Request access to EUID by filling out the form on the [Request Access](/request-access) page.
2. Decide which implementation option you want to use.
3. If you're using an SDK, download the SDK. Refer to the applicable SDK guide.
4. Follow the instructions in the implementation guide for the option you chose.

   :::note
   Be sure to encrypt request messages to EUID. For details, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
   :::
5. Test.
6. Go live.

## Implementation Resources

The following documentation resources are available for private Operators to implement EUID.

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [EUID Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |

## FAQs

For a list of frequently asked questions regarding the EUID framework, see [Frequently Asked Questions](../getting-started/gs-faqs.md).
