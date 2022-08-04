# European Unified ID Overview (WIP)


This page provides the following information about EUID:
- [Introduction](#introduction)
    - [EUID vs. UID2](#euid-vs-uid2)
    - [Guiding Principles](#guiding-principles)
    - [Technical Design Principles](#technical-design-principles)
- [EUID Infrastructure](#euid-infrastructure)
  - [EUID Types](#euid-types)
  - [Participants](#participants)
  - [Core Components](#core-components)
  - [Workflows](#workflows)
- [FAQs](#faqs)
- [License](#license)



For integration guides, supported SDKs, and endpoint reference, see [EUID API Documentation](/api/v1/README.md). See also [Getting Started](/api/README.md).

## Introduction

European Unified ID (EUID) is a deterministic identifier based on personally identifiable information (PII), such as email addresses. Built on the [UID2 framework](https://github.com/UnifiedID2/uid2docs/blob/main/api/README.md), EUID complies with the user transparency and privacy controls specific to the market requirements in Europe and the UK, including GDPR regulations and current consent framework limitations. 

The goal for EUID is to enable deterministic identity for advertising opportunities on the open internet with consumer transparency and controls in place. EUID enables logged-in experiences from publisher websites, mobile apps, and CTV apps to monetize through programmatic workflows.  


### EUID vs. UID2

EUID is an open-source, standalone solution with its own unique namespace that builds on the [UID2 framework](https://github.com/UnifiedID2/uid2docs/blob/main/api/README.md). The main differences between UID2 and EUID result from more stringent EU data protection laws related to the consent-collection framework and data rights for data subjects and obligations between parties. Otherwise, EUID follows the same [guiding principles](#guiding-principles) as UID2.

>IMPORTANT: Even though it builds on the UID2 framework, EUID is a separate identifier. 

The following table summarizes the key differences.

| Comparison Aspect | UID2 | EUID |
| :--- | :--- | :--- |
| Open-sourced framework | Yes | Yes |
| Interoperable | Yes | Yes |
| PII | Email addresses, phone numbers | Email addresses |
| Consent | Based on local regulations like CPRA, CCPA | Driven by GDPR, TCF2.0 outcomes and local regulatory input |


### Guiding Principles

- **First-Party Relationships:** EUID allows advertisers to easily activate their first-party data on publishers across the open internet.

- **Non-Proprietary (Universal) Standard:** EUID is accessible to all constituents in the advertising ecosystem who abide by the code of conduct, and no individual company controls access. This includes DSPs, SSPs, data providers, measurement providers, and identity services. 

- **Open Source:** EUID code will be transparent via an open-source framework.

- **Interoperable:** EUID allows other identity solutions (commercial and/or proprietary) to integrate and provide EUIDs with their offering.

- **Secure and Encrypted Data:** EUID leverages multiple layers of security to secure PII and user data.

- **Consumer Control:** Consumers can opt out of EUID at any time through the [Transparency and Control Portal](https://transparentadvertising.eu). For details, see [Opt-Out Portal](#opt-out-portal).

### Technical Design Principles

- **Accountability:** Access requires members to abide by a code of conduct governed by an independent body.

- **Distributed Integration:** Multiple certified integration paths provide options for publishers, advertisers, and data providers to generate EUIDs.

- **Decentralized Storage:** Centralized location with PII-to-EUID mapping has been eliminated to block malicious actors.

- **Lean Infrastructure:** Infrastructure is light and inexpensive to operate.

- **Self-Reliant:** No reliance on external services for real-time processing of RTB data.


## EUID Infrastructure
TBd
  - [EUID Types](#euid-types)
  - [Participants](#participants)
  - [Core Components](#core-components)
  - [Workflows](#workflows)

### EUID Types

There are two types of EUIDs, raw EUIDs and EUID tokens (also know as advertising tokens). The following table explains each type.

| ID Form | Shared in Bid Stream? | Description |
| :--- | :--- | :--- |
| **Raw EUIDs** | Never | This is an unencrypted alphanumeric identifier created through a set of EUID APIs or SDKs with users’ verifiable PII, such as an email address, as input. Raw EUIDs are designed to be stored by advertisers, data providers, and DSPs.|
| **EUID (Advertising) Token** | Shared | This is an encrypted form of a raw EUID. EUID tokens are generated from hashed or unhashed email addressesand are designed to be stored by publishers or publisher service providers. SSPs pass the EUID token in bid stream and DSPs decrypt them at bid request time. |

### Core Components

The core administrative EUID infrastructure consists of the following components.

| Component | Description |
| :--- | :--- |
| **Core System**  | A centralized service that manages access to the distributed EUID system. |  
| **Opt-out Service**  | A global service that manages user opt-out requests, for example, by routing them to all EUID data holders. | 
| **Transparency and Control Portal**  | A user-facing website, [https://transparentadvertising.eu](https://transparentadvertising.eu), that allows consumers to opt out of EUID at any time. | 


### Participants 

With its transparent and interoperable approach, EUID provides a collaborative framework for many participants across the advertising ecosystem—advertisers, publishers, DSPs, SSPs, SSOs, CDPs, CMPs, identity providers, data providers, and measurement providers.  The EUID workflows involve the following participants.

The following table lists the key participants

| Participant | Role Description |
| :--- | :--- |
| **Core Administrator**  | An organization (currenlty, The Trade Desk) that manages the EUID Core System and other [components](#core-components), for example, for distributing encryption keys and salts to EUID operators and sending user opt-outs requests to operators and DSPs. |  
| **Open Operators**  | Organizations that operate the service (via the APIs) and are accessible to all participants. Operators receive and store encryption keys and salts from the EUID Core System, salt and hash PII to return EUIDs, encrypt EUIDs to generate EUID tokens, and distribute EUID token decryption keys.<br/><br/>There may multiple operators that participants may choose to work with.<br/><br/>Any participant can choose to become a closed operator and operate their own internal version of the service to generate and manage EUIDs.<br/><br/>Currently, The Trade Desk is the Open Operator for EUID. | 
| **Compliance Manager**  | An organization that audits all the participant EUID parties for compliance with stated rules relays compliance information to the EUID administrators and EUID operators. | 
| **DSPs**  |  | 
| **Data Providers**  | DSPs integrate with EUID to receive EUIDs from brands (as first-party data) and data providers (as third-party data) and leverage them to inform bidding on EUIDs in the bid stream. transact on EUIDs in the bid stream.
 | 
| **Publishers**  | organizations that propagate IDs to the bid stream via SSPs. Publisher organizations include identity providers, publishers, and SSOs.
Publishers who want to send users' PII and generate EUIDs need to access the EUID Operator API.
Publishers may choose to work with an SSO or independent ID provider who is interoperable with EUID. The provider may handle the EUID integration on their behalf. | 
| **Consumers**  | users engaging with publishers or publisher-related SSOs and identity providers. This workflow allows a user to consent to the creation of an EUID and manage their EUID consent and privacy settings in the [Opt-Out Portal](#opt-out-portal). | 




## Workflows

There are four key workflows in the EUID system:

- [Buy-side workflow](#buy-side-workflow)
- [Data provider workflow](#data-provider-workflow)
- [Publisher workflow](#publisher-workflow)
- [User trust workflow](#user-trust-workflow)

This diagram summarizes all four workflows.

![The EUID Ecosystem](/images/macro_view.jpg)


## FAQs


#### How do companies interfacing with EUID tokens know which decryption key to apply?

Metadata supplies with the EUID token discloses the timestamp of encryption, which informs which decryption key applies.

#### Can a user opt out of targeted advertising tied to their EUID?

Yes, through the Opt-Out Portal (also known as the [Transparency and Control Portal](https://transparentadvertising.eu)), a user can opt out of being served targeted ads tied to their EUID. The request will be distributed through EUID Administrator and EUID Operators to all relevant members. Some publishers and service providers have the option to limit access to their products based on a user’s participation in EUID and it is the publisher’s responsibility to communicate this as part of their value exchange dialog with the user.

#### How does a user know where to access the Opt-Out Portal?

Publishers, SSOs, or consent management platforms disclose links to the Opt-Out Portal in their login/consent flows, privacy policies, and other means.

#### Why do advertisers and data providers not need to integrate with the opt-out feed?

Opt-outs relate to opting out of targeted advertising, which is handled through the publisher and DSP opt-out workflows. If the consumer wishes to disengage with a specific advertiser, they need to contact the advertiser directly.

#### Will all integration partners in the UID2 infrastructure (SSPs, data providers, measurement providers) be automatically integrated with EUID? 

No. EUID will function as its own identifier separate from UID2. As such, paperwork containing usage and access to UID2 does not automatically grant usage and access for EUID. New contracts are required to be signed for EUID.


## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
