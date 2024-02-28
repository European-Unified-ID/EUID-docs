[EUID Overview](../../../README.md) > [Getting Started: Summary](../getting-started/gs-summary.md) > [EUID API Documentation](../summary-doc-v2.md) > Integration Guides

# EUID Integration Guides: Summary

The following guides provide integration instructions based on the needs and requirements of your organization and its primary role as a publisher, DSP, or data provider/advertiser. As an EUID participant, you can also integrate via Enterprise Partners that enable engaging with an Open Operator service and hosting of a Private Operator service.

Integrations fall into these categories:

- [Publisher Integrations](#publisher-integrations)
- [Advertiser/Data Provider Integrations](#advertiserdata-provider-integrations)
- [DSP Integrations](#dsp-integrations)
- [Private Operator Service Integrations](#private-operator-service-integrations)

## Publisher Integrations

The following resources are available for publisher integrations.

<!-- :::tip
For a detailed summary of web integration options, see Web Integration Overview ../guides/integration-options-publisher-web.md.
::: -->

| Integration Guide | Content Description |
| :--- | :--- |
| [EUID Integration Overview for Prebid.js](integration-prebid.md) | An overview of options for publishers who want to integrate with EUID and generate EUID tokens to be passed by Prebid.js in the RTB bid stream. |
| [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | An integration guide for publishers who want to integrate with EUID and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bid stream. This guide is for publishers who want to request EUID tokens client-side, which is the easiest implementation approach. |
| [EUID Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) | An integration guide for publishers who want to integrate with EUID and generate identity tokens to be passed by Prebid in the RTB bid stream. This guide is for publishers who are using a private operator or who want to generate tokens server-side. |
| [SDK for JavaScript Integration Guide](publisher-client-side.md) | This integration guide for publishers covers standard web integration scenarios that use the [SDK for JavaScript](../sdks/client-side-identity.md). |
| [Publisher Integration Guide, Server-Only (Without SDK)](custom-publisher-integration.md) | This integration guide for publishers covers integration scenarios that do not use the [SDK for JavaScript](../sdks/client-side-identity.md). |

### Prebid Integrations

The following resources are available for publisher Prebid integrations.

| Integration Guide | Content Description |
| :--- | :--- |
| [EUID Integration Overview for Prebid.js](integration-prebid.md) | An overview of options for publishers who want to integrate with EUID and generate EUID tokens to be passed by Prebid.js in the RTB bid stream. |
| [EUID Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | An integration guide for publishers who want to integrate with EUID and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bid stream. This guide is for publishers who want to request EUID tokens client-side, which is the easiest implementation approach. |
| [EUID Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) | An integration guide for publishers who want to integrate with EUID and generate identity tokens to be passed by Prebid in the RTB bid stream. This guide is for publishers who are using a private operator or who want to generate tokens server-side. |

## Advertiser/Data Provider Integrations

The following resources are available for advertisers and data providers integrating with EUID.

| Integration Guide | Content Description |
| :--- | :--- |
| [Advertiser/Data Provider Integration Guide](advertiser-dataprovider-guide.md) | This integration guide for advertisers and data providers covers integration workflows for mapping identity for audience-building and targeting. |

## DSP Integrations

The following resources are available for DSPs integrating with EUID.

| Integration Guide | Content Description |
| :--- | :--- |
| [DSP Integration Guide](dsp-guide.md) | This integration guide for DSPs covers handling EUIDs for bidding and honoring user opt-outs. |

## Private Operator Service Integrations

The following resources are available for Private Operator integrations.
 
| Integration Guide | Content Description |
| :--- | :--- |
| [EUID Private Operator for AWS Integration Guide](operator-guide-aws-marketplace.md) | Instructions for setting up Private Operator service for AWS Marketplace. |