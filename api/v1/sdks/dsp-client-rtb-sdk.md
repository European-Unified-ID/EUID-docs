[EUID API Documentation](../../README.md) > [v1](../README.md) > [SDKs](./README.md) > RTB SDK

# RTB SDK Client

The EUID RTB SDK facilitates decrypting EUID tokens to access the raw EUID. 

The following functions define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined below.

Libraries are currently available in the following languages. More languages are in development. 

+ C# 
+ C++

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the EUID service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | The endpoint for EUID service. | N/A |
| `authKey` | The authentication token that belongs to the client. For access to EUID, see [Contact Info](../../README.md#contact-info). | N/A |
| `refreshIntervalMs` | Refresh cadence (in milliseconds) for fetching the decryption keys.| 5 minutes (`300,000` milliseconds) |
| `retryIntervalMs` | Retry cadence (in millisecond) for retrying the request when encountering an error.  | 30 seconds (`30,000` milliseconds)|


## Interface 

The interface allows you to decrypt EUID tokens and return the corresponding EUID. 

>NOTE: Using the SDK, you do not need to store or manage decryption keys.

During RTB, call the interface to decrypt an EUID token and return the EUID. For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

```java
public Response Decrypt(String encryptedToken)
```

Available information returned through the SDK is outlined in the following table.

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of response statuses and their definitions, see the following table. |
| `EUID` | The EUID for the corresponding EUID token. |
| `Established` | The timestamp when a user first established the EUID with the publisher. |


Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The EUID token decrypted successfully and an EUID was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to decrypt this EUID token.|
| `NotInitialized` | The client library is waiting to be initialized. |
| `InvalidPayload` | The incoming EUID token is not a valid payload. |
| `ExpiredToken` | The incoming EUID token has expired. |
| `KeysNotSynced` | The client has failed to synchronize keys from EUID service. |
| `VersionNotSupported` |  The client library does not support the version of the encrypted token. |

## FAQ

### How do SDK errors impact the DSP's ability to respond to a bid?

If there is an error, the SDK will not decrypt the EUID token into an EUID. 
