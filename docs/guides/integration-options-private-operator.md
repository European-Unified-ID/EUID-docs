---
title: EUID Integrations for Private Operators
description: Information summary for Private Operators.
hide_table_of_contents: false
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import UpgradePolicy from '../snippets/_private-operator-upgrade-policy.mdx';

# EUID Private Operator Integration Overview

EUID participants that host their own <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> send their own first-party <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> to their own local EUID <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link> service, running in a private environment.

A Private Operator runs in an <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link>&#8212;a virtual machine with additional security features to prevent unauthorized access, so that unauthorized individuals cannot download any configuration information or data from the virtual machine.

Becoming a Private Operator includes several additional steps, and uses resources that the participant must provide.

Learn about what the EUID framework offers for Private Operators, including benefits, hosting options, documentation and other resources, and how to get started.

:::note
This page is about Private Operators. For information about Public Operators, or if you're not sure what the difference is or what an Operator is, see [The EUID Operator](../ref-info/ref-operators-public-private.md).
:::

## Private Operator Benefits

Here are some of the intended benefits of participating in EUID as a Private Operator:
- You can maintain privacy-conscious workflows for your customer data to be encrypted and activated across chosen partners.
- You can participate in EUID using your own first-party <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> without sharing it.

  Within a Private Operator solution, personal data does not leave your infrastructure.
- You have full control of resources, performance, and latency for EUID. For example:
  - You can provide greater availability, without rate limitations.
  - If you are not physically located near to a Public Operator instance, you might choose to host a Private Operator solution for latency reasons.
- You can plan to minimize network hops with a service that can provide regional proximity.
- You can implement processes and policies that you control, as opposed to taking part in a shared service.

If you have significant latency concerns, or your security requirements dictate that data stays within your systems, and you also have extensive engineering resources to both build and maintain your EUID implementation, you might consider the Private Operator solution. 

## Private Operator Requirements

The participant must host, configure, maintain, and update the Private Operator instance, and must conform to strict security measures. Engineering resources are required to integrate and to make ongoing updates.

The participant must sign a contract (see [Account Setup](../getting-started/gs-account-setup.md)) to host a Private Operator instance.

:::note
A Private Operator has no visibility into the raw EUIDs or EUID tokens processed by a Public Operator or another Private Operator. Each Private Operator is isolated from all other Operators.
:::

## Hosting Options for Private Operators

EUID supports hosting EUID in an <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link> on the following cloud service provider (medium level of effort to implement):
- [Nitro Enclave](https://aws.amazon.com/ec2/nitro/) from AWS

## Private Operator Workflow

The basic workflow for a Private Operator is as follows:

1. On startup, the Private Operator goes through an attestation process with the <a href="../ref-info/glossary-uid#gl-core-service">Core</a> service. The attestation process verifies that the Operator is running in a secure trusted execution environment (TEE), and that the environment hasn't been tampered with.

1. When the Operator passes the attestation process, the Core service gives the Private Operator secure S3 URLs for retrieving the information it needs for startup.

1. The Private Operator retrieves the security information from Amazon S3 that it needs to process EUIDs, such as salts, encryption keys, and user opt-out records. For security details, see [Private Operator Security](#private-operator-security).

1. If an Operator is restarted, it goes through the attestation process again, and retrieves a fresh set of security information.

1. The Operator re-attests periodically with the Core service to ensure that it is still running in a protected environment. If attestation fails, the Operator shuts down.

## Private Operator Security

Each supported Private Operator implementation must meet rigorous security standards. Some security points include:

- The Private Operator runs in a hardware-based trusted execution environment (TEE) hosted by a supported cloud provider listed in [Hosting Options for Private Operators](#hosting-options-for-private-operators).
- The Private Operator must complete an attestation process before accessing the information needed to process EUIDs.
- The information on S3 is encrypted at rest and also encrypted in transit through TLS. In addition, access is limited to only correctly authorized and attested Private Operators.
- The information retrieved at startup is not stored locally at any point. It is only ever held in memory, and the Private Operator is running in a protected environment that makes it difficult for anyone running the Operator (such as an Administrator), as well as any external players, to see the data that's in memory.
- The Private Operator never stores <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> that is sent for processing (email addresses and/or phone numbers). The data is only used within the enclave, to generate EUIDs, and is discarded immediately after processing.

## Private Operator Limitations

There are a couple of limitations to Private Operator functionality:
- Private Operators do not currently support <Link href="../ref-info/glossary-uid#gl-client-side">client-side integration</Link>.
- Private Operator updates are released three times per year; Public Operator updates are released on a more frequent cadence.

## Private Operator Deprecation Schedule

For information about supported versions and deprecation dates, see [Private Operator Versions](../ref-info/deprecation-schedule.md#private-operator-versions).

## Private Operator Upgrade Policy

<UpgradePolicy />

## Getting Started

To get started as a Private Operator, follow these steps:

1. Request access to EUID by filling out the form on the [Request Access](/request-access) page.

   For details about available options, see [Hosting Options for Private Operators](#hosting-options-for-private-operators).
3. If you're using an SDK, download the SDK. Refer to the applicable SDK guide.
4. Follow the instructions in the implementation guide for the option you chose.

   :::note
   Be sure to encrypt request messages to EUID. For details, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
   :::
5. Test.
6. Go live.

## Implementation Resources

The following documentation resources are available for Private Operators to implement EUID.

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [EUID Private Operator for AWS Integration Guide](operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
