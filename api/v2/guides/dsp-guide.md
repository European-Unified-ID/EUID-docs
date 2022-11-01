[EUID API Documentation](../../README.md) > [v2](../README.md) > [Integration Guides](README.md) > DSP Integration Guide

# DSP Integration Guide

This guide is for DSPs who transact on EUIDs in the bid stream and includes the following sections:

* [Integration Steps](#integration-steps)
* [FAQs](#faqs)

## Integration Steps 

The following describes the integration workflow for DSP to support EUID as part of RTB, which consists of two major steps:
1. [Honor user opt-outs](#honor-user-opt-outs)
2. [Decrypt EUID tokens to use in RTB](#decrypt-euid-tokens-for-rtb-use)

![DSP Flow](./dsp-guide-flow-mermaid.svg)

### Honor User Opt-Outs

To receive and honor user opt-outs from the EUID service, DSPs establish a pre-configured interface and provides it to the EUID service during onboarding. The EUID service sends the user's EUID and an opt-out timestamp to the pre-determined interface. Examples of interfaces include webhooks and API endpoints.

The EUID service sends the following data within seconds of a user's opt-out, which the DSP records and uses the bidding logic defined in [Decrypt EUID Tokens for RTB Use](#decrypt-euid-tokens-for-rtb-use).

| Parameter | Description |
| :--- | :--- |
| `identity` | The EUID for the user who opted out. |
| `timestamp` | The time when the user opted out. |


The following example  illustrates a webhook configured to receive the EUID and a corresponding timestamp:

```html
https://dsp.example.com/optout?user=%%identity%%&optouttime=%%timestamp%%
```
#### Bidding Opt-Out Logic

Use the logic below during bidding (2-b) to honor a user's opt-out.

Leverage the provided [RTB SDK](../sdks/dsp-client-rtb-sdk.md) to decrypt incoming EUID tokens. The response contains the EUID and time the EUID was created, represented in the psuedocode below as `established_timestamp`. DSPs are required to check the most recent opt-out timestamp for a EUID, represented in the pseudocode below as `optout_timestamp`. 

The following diagram illustrates opt-out logic.

![DSP Opt-Out Check](./dsp-guide-optout-check-mermaid.svg)

If the `established_timestamp` value is less than the `optout_timestamp` value, the user opted out and the EUID should not be used for RTB. In these cases, it is up to the DSP whether they would like to send an alternate ID for bidding or not bid.

The logic for the <b>check opt-out</b> step is the following:

```java
if (established_timestamp < optout_timestamp) {
  // Opted out
}
```

### Decrypt EUID Tokens for RTB Use

| Step | SDK | Description |
| :--- | :--- | :--- |
| 2-a | [RTB SDK](../sdks/dsp-client-rtb-sdk.md)  | Leverage the provided SDK to decrypt incoming EUID tokens. The response contains the `EUID` and the EUID creation time. |
| 2-b | | DSPs are required to honor opt-out protocol for EUIDs. For details on configuring user opt-outs and honoring them during bidding, see [Honor user opt-outs](#honor-user-opt-outs). |

## FAQs
### How do I know which decryption key to apply to a UID2?
The provided [RTB SDK](../sdks/dsp-client-rtb-sdk.md) updates decryption keys automatically. Metadata supplied with the UID2 token discloses the IDs of the decryption keys to use. 

### Where do I get the decryption keys?
You can use the [RTB SDK](../sdks/dsp-client-rtb-sdk.md) library to communicate with the UID2 service and fetch the latest keys. To make sure that the keys remain up-to-date, it is recommended to fetch them periodically, for example, once every hour. 

### How do I know if/when the salt bucket has rotated?
The DSP is not privy to when the UID2 salt bucket rotates. This is similar to a DSP being unaware if users cleared their cookies. Salt bucket rotation has no significant impact on the DSP.  

### Should the DSP be concerned with latency?
The UID2 service does not introduce latency into the bidding process. Any latency experienced can be attributed to the network, not the UID2 service.

### How should the DSP maintain proper frequency capping with UID2?
The UID2 has the same chance as a cookie of becoming stale. Hence, the DSP can adapt the same infrastructure currently used for cookie or deviceID-based frequency capping for UID2. For details, see this [FAQ](../guides/advertiser-dataprovider-guide.md#how-do-i-know-when-to-refresh-the-euid-due-to-salt-bucket-rotation) on salt bucket rotation. 

### Will all user opt-out traffic be sent to the DSP?
Yes, all opt-outs from the UID2 [Transparency and Control Portal](https://transparentadvertising.eu/) will hit the opt-out endpoint that the DSP must configure to [honor user opt-outs](#honor-user-opt-outs).

### Is the DSP expected to handle opt-out signals only for the UID2s that they already store?
In some cases a DSP may receive a UID2 token for a newly-stored UID2 where the token is generated before the opt-out timestamp. The DSP is not allowed to bid on such tokens. It is therefore recommended to store all opt-out signals regardless of whether the corresponding UID2 is currently stored by the DSP or not. For details, see the diagram in [Bidding Opt-Out Logic](#bidding-opt-out-logic).

### How long should the DSP keep the opt-out list?
At least for 30 days.

### Is the UID of an opted-out user sent to the opt-out endpoint in an encrypted form?

No. It is sent as an unencrypted (raw) UID2.

### What request type do  opt-outs use? 

Typically GET requests, but different DSPs may use different types.

### How strict are the requirements for honoring opt-outs? 

Opt-outs must be always respected. It may take some time for an opt-out request to propagate through the system during which time it is expected that some bids may not honor the opt-out.

### How many decryption keys may be present in memory at any point?

There may be thousands of decryption keys present in the system at any given point.
