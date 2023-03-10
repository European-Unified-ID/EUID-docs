[EUID Overview](../../../README.md) > [Getting Started](../../getting-started.md) > [v2](../summary-doc-v2.md) > [Integration Guides](summary-guides.md) > Advertiser/Data Provider Integration Guide

# Advertiser and Data Provider Integration Guide

This guide covers integration steps for organizations that collect user data and push it to DSPs. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and other organizations who send data to DSPs. The guide includes the following sections:

* [Integration Steps](#integration-steps)
   - [Retrieve an EUID for personal data using the identity map endpoints](#retrieve-an-euid-for-personal-data-using-the-identity-map-endpoints)
   - [Send EUID to a DSP to build an audience](#send-euid-to-a-dsp-to-build-an-audience)
   - [Monitor for salt bucket rotations related to your stored EUIDs](#monitor-for-salt-bucket-rotations-related-to-your-stored-euids)
   - [Use an incremental process to continuously update EUIDs](#use-an-incremental-process-to-continuously-update-euids)
* [FAQs](#faqs)

## Integration Steps

The following diagram outlines the steps data collectors need to complete to map personal data to EUID identifiers for audience-building and targeting. personal data refers to a user's normalized email address or SHA256-hashed and normalized email address.

![Advertiser Flow](images/advertiser-flow-mermaid.svg)

### Retrieve an EUID for personal data using the identity map endpoints

| Step | Endpoint | Description |
| --- | --- | --- |
| 1-a | [POST /identity/map](../endpoints/post-identity-map.md) | Send a request containing personal data to the identity mapping endpoint. |
| 1-b | [POST /identity/map](../endpoints/post-identity-map.md) | The returned `advertising_id` (EUID) can be used to target audiences on relevant DSPs.<br/>The response returns a user's EUID and the corresponding salt `bucket_id`. The salt assigned to the bucket rotates annually, which impacts the generated EUID. For details on how to check for salt bucket rotation, see [Monitor for salt bucket rotations](#monitor-for-salt-bucket-rotations-related-to-your-stored-euids).<br/>We recommend storing a user's EUID and `bucket_id` in a mapping table for ease of maintenance. For guidance on incremental updates, see [Use an incremental process to continuously update EUIDs](#use-an-incremental-process-to-continuously-update-euids). |

### Send EUID to a DSP to build an audience
Send the `advertising_id` (EUID) from the [preceding step](#retrieve-a-euid-for-personal-data-using-the-identity-map-endpoints) to a DSP while building your audiences. Each DSP has a unique integration process for building audiences. Please follow the integration guidance provided by the DSP for sending EUIDs to build an audience.

### Monitor for salt bucket rotations related to your stored EUIDs
An EUID is an identifier for a user at a particular moment in time, which means that a user's EUID will rotate at least once a year. 

Even though each salt bucket is updated roughly once a year, individual bucket updates are spread over the year. This means that about 1/365th of all buckets is rotated daily.

>IMPORTANT: To ensure that your integration has the current EUIDs, check salt bucket rotation for active users every day.

| Step | Endpoint | Description |
| --- | --- | --- |
| 3-a | [POST /identity/buckets](../endpoints/post-identity-buckets.md) | Send a request to the bucket status endpoint for all salt buckets changed since a given timestamp. |
| 3-b | [POST /identity/buckets](../endpoints/post-identity-buckets.md) | The bucket status endpoint returns a list of `bucket_id` and `last_updated` timestamps. |
| 3-c | [POST /identity/map](../endpoints/post-identity-map.md) | Compare the returned `bucket_id` to the salt buckets of EUIDs you've cached.<br/>If a EUID's salt bucket rotated, resend the personal data to the identity mapping service for a new EUID. |
| 3-d | [POST /identity/map](../endpoints/post-identity-map.md) | Store the returned `advertising_id` and `bucket_id`. |

### Use an incremental process to continuously update EUIDs

Continuously update and maintain EUID-based audiences utilizing the preceding steps.

The response from the [EUID retrieval step](#retrieve-a-euid-for-personal-data-using-the-identity-map-endpoints) contains mapping information. Cache the mapping between personal data (`identifier`),  EUID (`advertising_id`), and salt bucket (`bucket_id`), along with a last updated timestamp.

Using the results from the [preceding salt bucket rotation step](#monitor-for-salt-bucket-rotations-related-to-your-stored-euids), remap EUIDs with rotated salt buckets by [retrieving EUIDs using the identity map endpoints](#retrieve-a-euid-for-personal-data-using-the-identity-map-endpoints). To update the EUIDs in audiences, [send EUID to a DSP](#send-euid-to-a-dsp-to-build-an-audience).

## FAQs

For a list of frequently asked questions for advertisers and data providers using the EUID framework, see [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).

For a full list, see [Frequently Asked Questions](../getting-started/gs-faqs.md).