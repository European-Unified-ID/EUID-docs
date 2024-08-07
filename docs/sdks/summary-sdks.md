---
title: SDKs - Summary
sidebar_label: SDKs - Summary
pagination_label: SDKs - Summary
description: Summary of SDK documentation available.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# SDKs: Summary

Review the SDK functionality to determine which SDK or SDKs you want to use, then click through in the SDKs table to review the reference documentation.

This page includes:

* [SDK Functionality](#sdk-functionality)
* [SDK Documentation](#sdk-documentation)

## SDK Functionality

The following table summarizes the functionality available with each SDK.

| EUID SDK for... | Client-Side or Server-Side | Encrypt Raw EUID to EUID Token | Decrypt EUID Token | Generate EUID Token from Personal Data | Refresh EUID Token | Generate Raw EUID from Personal Data |
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
| [SDK for JavaScript](sdk-ref-javascript.md) | Client-Side JavaScript SDK that facilitates the process of establishing client identity using EUID and retrieving EUID tokens for publishers. | Publishers |
| [SDK for Java](sdk-ref-java.md) | An SDK for audiences using Java server-side:<br/>- Helps publishers to generate or refresh EUID tokens from <Link href="../ref-info/glossary-uid#gl-personal-data">personal data</Link> ([POST&nbsp;/token/generate](../endpoints/post-token-generate)).<br/>- Helps DSPs to decrypt EUID tokens from bid requests ([Decrypt EUID Tokens for RTB Use](../guides/dsp-guide.md#decrypt-euid-tokens-for-rtb-use)). | Publishers<br/>DSPs<br/>Advertisers<br/>Data&nbsp;Providers |
| [SDK for Python](sdk-ref-python.md) | An SDK for audiences using Python server-side:<br/>- Helps publishers to generate or refresh EUID tokens from personal data ([POST&nbsp;/token/generate](../endpoints/post-token-generate)).<br/>- Helps DSPs to decrypt EUID tokens from bid requests ([Decrypt EUID Tokens for RTB Use](../guides/dsp-guide.md#decrypt-euid-tokens-for-rtb-use)). | Publishers<br/>DSPs |
| [SDK for C# / .NET](sdk-ref-csharp-dotnet.md) | An SDK for audiences using .NET server-side:<br/>- Helps DSPs to decrypt EUID tokens from bid requests. | DSPs<br/>Data&nbsp;Providers |
| [SDK for C++](sdk-ref-cplusplus.md) | An SDK for audiences using C++ server-side:<br/>- Helps DSPs to decrypt EUID tokens from bid requests. | DSPs<br/>Data&nbsp;Providers |
