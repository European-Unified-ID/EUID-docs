# European Unified ID Overview (WIP)

For integration guides, supported SDKs, and endpoint reference, see [EUID API Documentation](/api/v1/README.md). See also [Getting Started with EUID](/api/README.md).

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
