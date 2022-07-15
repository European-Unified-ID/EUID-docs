# European Unified ID Overview (WIP)


This page provides the following information about EUID:
- [Introduction](#introduction)
- [ID Forms](#id-forms)
- [Components](#components)
- [Roles](#roles)
- [Workflow Summaries](#workflow-summaries)
- [FAQs](#faqs)
- [License](#license)

For integration guides, supported SDKs, and endpoint reference, see [EUID API Documentation](/api/v1/README.md). See also [Getting Started](/api/README.md).

## Introduction

Addressable advertising enables publishers and developers to provide the content and services consumers have come to enjoy, whether through mobile apps, streaming TV, or web experiences. This value exchange has not always been well understood by, or communicated to, consumers. As the industry reduces reliance on the third-party cookie, there is an opportunity to improve how we reach consumers with relevant advertising across the open internet. The solution is an identification system in which content creators and consumers both benefit from improved engagement opportunities with transparent control over consumer data.

EUID is a deterministic identifier based on PII (for example, email or phone number) with user transparency and privacy controls. The EUID identifier enables logged-in experiences from publisher websites, mobile apps, and CTV apps to monetize through programmatic workflows. Benefitting from several layers of security and privacy measures, EUIDs can be safely distributed across the open internet. EUID is a non-proprietary standard and accessible to constituents across the advertising ecosystem--including advertisers, publishers, DSPs, SSPs, SSOs, CDPs, CMPs,identity providers, data providers, and measurement providers--while they remain in compliance with a code of conduct.

EUID’s goal is to enable deterministic identity for advertising opportunities on the open internet with consumer transparency and controls in place. EUID provides a collaborative framework for all constituents and a healthy, open internet by utilizing a transparent and interoperable approach.

### Guiding Principles

- **First-Party Relationships:** EUID allows advertisers to easily activate their first-party data on publishers across the open internet.

- **Non-Proprietary (Universal) Standard:** EUID is accessible to all constituents in the advertising ecosystem who abide by the code of conduct, and no individual company controls access. This includes DSPs, SSPs, data providers, measurement providers, and identity services. 

- **Open Source:** EUID code will be transparent via an open-source framework.

- **Interoperable:** EUID allows other identity solutions (commercial and/or proprietary) to integrate and provide EUIDs with their offering.

- **Secure and Encrypted Data:** EUID leverages multiple layers of security, cryptography, and encryption to secure PII and user data.

- **Consumer Control:** Consumers can opt out of EUID at any time through the [Transparency and Control Portal](https://transparentadvertising.org).

### Technical Design Principles

- **Accountability:** Access requires members to abide by a code of conduct governed by an independent body.

- **Distributed Integration:** Multiple certified integration paths provide options for publishers, advertisers, and data providers to generate EUIDs.

- **Decentralized Storage:** Centralized location with PII-to-EUID mapping has been eliminated to block malicious actors.

- **Lean Infrastructure:** Infrastructure is light and inexpensive to operate.

- **Self-Reliant:** No reliance on external services for real-time processing of RTB data.

## ID Forms

- [EUID](#euid)
- [EUID Token](#euid-token)

### EUID

The EUID (raw EUID) is an unencrypted alphanumeric identifier created through a set of APIs or SDKs using a user’s verifiable PII as an input. Examples of PII are an email address or phone number.

A EUID is designed to be stored by advertisers, data providers, and DSPs and is never shared in the bid stream. Note that the EUID Token (or encrypted form of the EUID) is shared in the bid stream.

#### Technical Details

- The EUID Operator API or SDK interface is used to create a EUID.

- The EUID Operator SHA256 hashes the PII and adds a secret salt to the user’s PII to generate a EUID.

- Each EUID is assigned a salt bucket. The salt for each bucket rotates once every 12 months. Each salt bucket has an alphanumeric designation between 1 and 1,000,000.

- Participants who store EUIDs monitor the EUID Operator API to know when a EUID’s salt bucket rotated.

### EUID Token

Encrypting raw EUIDs creates EUID Tokens, which are transient for bid stream workflows. By utilizing cryptographic nonces and encryption, the EUID Token is different every time it enters the bid stream. This secures the EUID ecosystem and prevents non-EUID participants from building profiles using EUID tokens.

EUID Tokens are designed to be stored by publishers or publisher service providers (for example, SSOs). SSPs pass the EUID Token in bid stream and DSPs decrypt them at bid request time.

#### Technical Details

- A cryptographic nonce is generated and appended to the EUID, which is then encrypted to create the EUID Tokens.

  - A nonce is an arbitrary number that may only be used once.
  - AES/CBC/PKCS5P with 256-bit keys are used for encryption and rotate on a daily basis.

- The EUID's encryption timestamp is attached as payload metadata.

## Components

The EUID infrasctructure consists of the following components:

- [Administrator](#administrator)
- [Open Operators](#open-operators)
- [Opt-Out Portal](#opt-out-portal)
- [EUID Compliance Manager](#euid-compliance-manager)

![Infrastructure](/images/key_mgmt.jpg) TBD does it belong here?

### Administrator

This is a centralized service that manages access to the distributed EUID system.

#### Functions

- Distribute encryption keys and salts to EUID operators.

- Distribute decryption keys to compliant members for use in decrypting EUID tokens.

- Send EUID user opt-outs requests to operators and DSPs.

### Open Operators

Organizations that operate the service (via the APIs) to generate and manage EUIDs and EUID tokens and are accessible to all participants. 

There are multiple operators that comprise the EUID system and participants may choose to work with any of them.

#### Functions

- Receive and store encryption keys and salts from the EUID Administrator service.

- Salt and hash PII to return a EUID.

- Encrypt EUIDs to generate EUID tokens.

- Broadcast EUID token updates, such as handling opt-outs and salt bucket rotations, to publishers utilizing the refresh token.

### Opt-Out Portal

Consumers can opt out of EUID at any time through a user-facing website, the [Transparency and Control Portal](https://transparentadvertising.eu).

#### Functions

- Offers transparency to users about their EUIDs.

- Provides users a way to globally opt out of EUID, which triggers opt-out requests to all EUID data holders.

### EUID Compliance Manager

This organization audits all the participant EUID parties for compliance against stated rules.

#### Functions

- Audit members of the trusted EUID ecosystem to determine their compliance.

- Relay compliance information to the EUID administrators and EUID operators.

## Roles

EUID participants must choose a predefined role ([generator](#generator) or [observer](#observer)) based on how they will be leveraging EUID. The role determines how a given EUID participant interacts with the EUID system. The role also determines their code of conduct requirements and corresponding compliance checks.

>NOTE: EUID participants can play more than one role.

### Generator

Parties that generate EUID values from the email or phone numbers with the appropriate consent, and honor opt-outs. For example, these  parties may include publishers, advertisers, data providers, onboarders, and login providers.

The generator responsibilities include the following:

- Register with the EUID [administrator](#administrator) to obtain API keys.
-	Receive consent from consumers to generate EUIDs from PII and use the EUIDs for advertising purposes.
-	Provide consumers with access to the [Opt-Out Portal](#opt-out-portal) to manage their EUID consent.
-	Generate EUIDs though an integrations with an [Open Operator](#open-operators).
-	Honor opted-out EUIDs.
-	Keep the EUID tokens refreshed.

### Observer

Parties that receive and store EUIDs from [generators](#generator) and use them for advertising targeting and measurement purposes. For example, these parties may include DSPs, measurement providers, and advertisers.

The observer responsibilities include the following:

- Register with the EUID [Administrator](#administrator) to obtain API keys.
-	Provide consumers with access to the [Opt-Out Portal](#opt-out-portal) to manage their EUID consent.
-	Decrypt the EUIDs via the EUID decryption library.
-	Honor opted-out EUIDs.


## Workflow Summaries

There are four key workflows in the EUID system:

- [Buy-side workflow](#buy-side-workflow)
- [Data provider workflow](#data-provider-workflow)
- [Publisher workflow](#publisher-workflow)
- [User trust workflow](#user-trust-workflow)

This diagram summarizes all four workflows, while the sections that follow provide in-depth details about each workflow.

![The EUID Ecosystem](/images/macro_view.jpg)


### Buy-Side Workflow

The following diagram illustrates the buy-side workflow that applies to DSPs who transact on EUIDs in the bid stream.

![Buy-Side Workflow](/images/buy_side.jpg)

The buy-side workflow consists of the following high-level steps:

1. Data providers pass first-party and third-party data to DSPs in the form of raw EUIDs.
2. DSPs synchronize with the EUID Administrator to receive decryption keys.
3. DSPs access EUID tokens in the bid stream and decrypt them at bid time.
4. DSPs listen to opt-out requests from the EUID Administrator and block buying on any opted-out EUIDs.

#### Buy-Side Integration

DSPs integrate with EUID to receive EUIDs from brands (as first-party data) and data providers (as third-party data) and leverage them to inform bidding on EUIDs in the bid stream.

The integration must meet the following requirements:

- Accept data in the form of EUIDs.
- Bid on data in the form of EUIDs.
- Build a webhook for honoring opt-out requests.
- Sync encryption keys daily with the EUID Administrator.

For details, see [DSP Integration Guide](/api/v1/guides/dsp-guide.md).

>NOTE: If a DSP wants to generate EUIDs themselves, they can also follow the [data rovider workflow](#data-provider-workflow).

### Data Provider Workflow

The following diagram illustrates the data provider workflow that applies to organizations that collect user data and push it to DSPs. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and other organizations who push data to DSPs.

![Data Provider Workflow](/images/data_provider.jpg)

The data provider workflow consists of the following high-level steps:

1. Data provider sends a user’s consented personally identifiable information (PII) to the EUID Operator.
2. EUID Operator generates and returns a raw EUID.
3. Data provider stores the EUID and salt bucket.
    >NOTE: On the server side, the data provider stores the EUID in a mapping table, DMP, data lake, or other server-side application.
4. Data provider sends the EUID to a DSP using permitted transport protocols defined in the code of conduct.
5. Data provider monitors the EUID Operator for rotated salt buckets and updates EUIDs as needed.

#### Data Provider Integration

To generate EUIDs from users' PII, data providers must access the EUID Operator APIs. Some advertisers may choose to work through CDPs, data on-boarders, or other service providers instead.

See also [Advertiser/Data Provider Integration Guide](/api/v1/guides/advertiser-dataprovider-guide.md).

##### Requirements

- Integrate with the EUID Operator to generate EUIDs and handle salt bucket rotations.

### Publisher Workflow

![Publisher Workflow](/images/publisher_workflow.jpg)

This workflow is for organizations that propagate IDs to the bid stream via SSPs. Publisher organizations include identity providers, publishers, and SSOs.

#### Publisher Workflow Overview

1. A user visits a publisher website, mobile app, or CTV app.
2. The publisher explains the value exchange of the open internet and requests the user to log in.
3. Once the user logs in, the publisher sends the first-party PII and corresponding privacy settings to the EUID Operator via an SDK or direct API integration. A publisher may authorize an SSO provider or identity provider to pass PII and privacy settings on their behalf.
4. The EUID Operator performs the salt, hash, and encryption process and returns the EUID Token.
5. The publisher stores the EUID Token to share with SSPs during real-time bidding.
    a. Server-side: The publisher stores the token in a mapping table, DMP, data lake, or other server-side application.
    b. Client-side: The publisher stores the token in a client-side app or in the user’s browser as a first-party cookie.
6. The publisher sends the EUID token to the SSP at the time of impression.
7. The SSP places a bid request using the EUID token, capturing it in the bid stream.
8. The publisher requests updated EUID tokens using a refresh token. When applicable, the refresh token includes a user’s opt-out request.

#### Publisher Integration

For integration scenarios, token management, and other details, see [Publisher Integration Guides](/api/v1/guides/README.md). See also [Endpoints](/api/v1/endpoints/README.md).

##### Publisher Direct Integration

Publishers who want to send users' PII and generate EUIDs need to access the EUID Operator API.

##### Requirements

- Integrate with EUID Operator API to generate EUID tokens
- Maintain refresh tokens or use the JavaScript client-side SDK provided by EUID to manage the refresh token.
- Enable sending the EUID token to SSPs and other integrating organizations.

##### Publisher Integration Through SSO or Identity Providers

Publishers may choose to work with an SSO or independent ID provider who is interoperable with EUID. The provider may handle the EUID integration on their behalf.

#### User Trust Workflow

![User Trust Workflow](/images/user_trust_workflow.jpg)

This workflow is for users engaging with publishers or publisher-related SSOs and identity providers. This workflow allows a user to consent to the creation of a EUID and manage their EUID consent and privacy settings in the Opt-Out Portal.

#### User Trust Workflow Overview

1. Users visit the Opt-Out Portal where they can globally opt-out of EUID for all publishers.
2. Opt-out requests are sent to EUID Administrator.
3. EUID Administrators distribute the request to DSPs.
4. EUID Operators distribute the request to publishers utilizing the refresh token.

## FAQs

### Identity

#### How does a holder of EUID know when to refresh the EUID due to salt rotation?

Metadata supplied with the EUID generation request indicates the salt bucket used for generating the EUID. Salt buckets are persistent and assigned to the underlying PII. Use the API provided to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform the EUID holder which EUIDs to refresh. This workflow typically applies to data providers.

#### How does a holder of a EUID token know when to refresh it?

The EUID token is automatically refreshed as part of the refresh token. This workflow typically applies to publishers and SSOs.

#### How do companies interfacing with EUID tokens know which decryption key to apply?

Metadata supplies with the EUID token discloses the timestamp of encryption, which informs which decryption key applies.

### User Trust

#### Can a user opt out of targeted advertising tied to their EUID?

Yes, through the Opt-Out Portal (also known as the [Transparency and Control Portal](https://transparentadvertising.org)), a user can opt out of being served targeted ads tied to their EUID. The request will be distributed through EUID Administrator and EUID Operators to all relevant members. Some publishers and service providers have the option to limit access to their products based on a user’s participation in EUID and it is the publisher’s responsibility to communicate this as part of their value exchange dialogue with the user.

#### How does a user know where to access the Opt-Out Portal?

Publishers, SSOs, or consent management platforms disclose links to the Opt-Out portal in their login/consent flows, privacy policies, and other means.

#### Why do advertisers/data providers not need to integrate with the opt-out feed?

Opt-outs relate to opting out of targeted advertising, which is handled through the publisher and DSP opt-out workflows. If the consumer wishes to disengage with a specific advertiser, they need to contact the advertiser directly.


## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).


WIP Notes

Builds upon the UID2 framework, accounting for market requirements in Europe and the U.K., including GDPR regulations and current consent framework limitations.
Similar to UID2 - EUID is an open source, stand-alone solution

The Trade Desk will partner with LiveRamp as well as other European market leaders on the development and deployment EUID

EUID has been announced, but is not yet fully developed or generally available in market

not interoperable wiht UID2; consent will be unique and customizable.

interoperable with RampID


EUID will be an open-sourced framework for the European ecosystem and will function in a similar way to UID2.

UID2 is based on a flexible open architecture and specific implementations can account for local regulations and integrate with relevant technology, such as consent management platforms (CMPs). Our focus now is working through the implementation details that take   EU and UK -data privacy and regulatory requirements into account. 

the solution with its own unique namespace, separate from other regions and therefore give it its own industry name - EUID. branding and namespace; all 

EUID will function similarly to UID2 as a token based on email, however the exact details are still being determined as product development continues in the EU in partnership with other industry leaders.

EUID will have specific consent requirements related to the regulatory requirements in Europe. The consent/opt out process is being finalized in partnership with key industry leaders including LiveRamp. 

The data storage will be very similar to how we store UID2s in our system. Both EUIDs and UID2s will exist in the TTD platform in their hashed/salted/encrypted form. We do not keep raw email addresses in our system. 

The UID2 and EUID systems themselves do not keep central storage of the identifiers. The identity generation and storage is decentralized. You can learn more about this on our Github documentation. 

EUID has the same data security protections as UID2. Both leverage multiple layers of security, cryptography, and encryption to secure PII and user data. By decentralizing the generation of UID2s and EUIDs, we avoid having a central “honeypot” of IDs, mitigating many of the potential security risks that could come with a centralized infrastructure.  





TBD on LiveRamp
It will not be a requirement for advertisers to send us RampIds via LR.

The main differences between UID2 and EUID are driven by more stringent EU data protection laws  as the consent-collection framework and data rights for data subjects and obligations between parties all differ for EUID vs UID2. Exactly how this will be executed is still in development with key industry leaders in the European market, but this remains the core difference between consent in the EU and other regions, and is consequently best addressed with its own identifier.

Will all the partners that we integrated with for the UID infrastructure (SSPs, data providers, Nielsen etc.) automatically be integrated with EUID or does each partner need to re-confirm interoperability with EUID? 
EUID will function as its own identifier separate from UID2. As such, paperwork containing usage and access to UID2 does not automatically grant usage and access for EUID. Exact processes are still being finalized, but we anticipate EUID will be separately addressed within contracts.  
