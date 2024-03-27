[EUID Overview](../../../README.md) > [Getting Started: Summary](../getting-started/gs-summary.md) > [EUID API Documentation](../summary-doc-v2.md) > SDKs

# SDKs: Summary

Review the SDK functionality to determine which SDK or SDKs you want to use, then click through in the SDKs table to review the reference documentation.

This page includes:

* [SDK Functionality](#sdk-functionality)
* [SDK Documentation](#sdk-documentation)

## SDK Functionality

The following table summarizes the functionality available with each SDK.

| UID2 SDK for... | Client-Side or Server-Side | Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token | Generate Raw UID2 from DII&ast; |
| :--- | :--- |  :--- | :--- | :--- | :--- | :--- |
|JavaScript | Client| &#8212; | &#8212; | &#9989; | &#9989; | &#8212; |
|Java | Server | &#9989; | &#9989; | &#9989; | &#9989; | &#9989; |
|Python | Server | &#9989; | &#9989; | &#9989; | &#9989; | &#8212; |
|C# / .NET | Server | &#9989; | &#9989; | &#8212; | &#8212; | &#8212; |
|C++ | Server | &#9989; | &#9989; | &#8212; | &#8212; | &#8212; |

<!-- &#9989; = Supported | &#10060; = Not Supported | &#8212; = Not Supported -->

## SDK Documentation

The following SDK documentation is available for EUID integration. Documentation links are in the first column.

| SDK | Document | Description | Audience
| :--- | :--- | :--- | :--- |
| [SDK for JavaScript](client-side-identity.md) | Client-Side JavaScript SDK that facilitates the process of establishing client identity using EUID and retrieving EUID tokens for publishers. | Publishers |
| [SDK for Java](sdk-ref-java.md) | An SDK for audiences using Java server-side:<br/>- Helps publishers to generate or refresh EUID tokens from [personal data](../ref-info/glossary-uid.md#gl-personal-data) ([POST&nbsp;/token/generate](../endpoints/post-token-generate)).<br/>- Helps DSPs to decrypt EUID tokens from bid requests ([Decrypt EUID Tokens for RTB Use](../guides/dsp-guide.md#decrypt-euid-tokens-for-rtb-use)). | Publishers<br/>DSPs<br/>Advertisers<br/>Data&nbsp;Providers |
| [SDK for Python](sdk-ref-python.md) | An SDK for audiences using Python server-side:<br/>- Helps publishers to generate or refresh EUID tokens from personal data ([POST&nbsp;/token/generate](../endpoints/post-token-generate)).<br/>- Helps DSPs to decrypt EUID tokens from bid requests ([Decrypt EUID Tokens for RTB Use](../guides/dsp-guide.md#decrypt-euid-tokens-for-rtb-use)). | Publishers<br/>DSPs |
| [SDK for C# / .NET](sdk-ref-csharp-dotnet.md) | An SDK for audiences using .NET server-side:<br/>- Helps DSPs to decrypt EUID tokens from bid requests. | DSPs<br/>Data&nbsp;Providers |
| [SDK for C++](sdk-ref-cplusplus.md) | An SDK for audiences using C++ server-side:<br/>- Helps DSPs to decrypt EUID tokens from bid requests. | DSPs<br/>Data&nbsp;Providers |
