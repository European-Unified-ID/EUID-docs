---
title: EUID Identifier Types
description: Information about EUID identifier types (raw EUIDs and EUID tokens).
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# EUID Identifier Types

EUID is a deterministic ID that is based on <Link href="glossary-uid#gl-personal-data">personal data</Link>, such as email address or phone number. There are two types of EUIDs: raw EUIDs and EUID tokens (also known as advertising tokens). The following table explains each type.

| ID Type | Shared in Bidstream? | Description |
| :--- | :--- | :--- |
| **Raw EUID** | No | An unencrypted alphanumeric identifier created through the EUID APIs or SDKs with the user's verifiable personal data, such as a hashed or unhashed email address or a phone number, as input.<br/>To avoid revealing the source data, the input value is hashed if it was not already hashed, and then hashed again using a secret <Link href="glossary-uid#gl-salt">salt</Link> value to create the raw EUID. The process that creates the raw EUID is designed to create a secure, opaque value that can be stored by advertisers, third-party data providers, and demand-side platforms (DSPs).<br/>Raw EUIDs are case sensitive.<br/>Example: A request for the raw EUID for the fictitious email address `user@example.com` resulted in this value: `E2dxEv3oMBzNHPw5iUVmwH2Hv+60D4AXYe+2ge9U0No=`. |
| **EUID Token (Advertising Token)** | Yes | An encrypted form of a raw EUID. EUID tokens are generated from hashed or unhashed email addresses or phone numbers that are converted to raw EUIDs and then encrypted to help ensure protection in the <Link href="glossary-uid#gl-bidstream">bidstream</Link>.<br/>EUID tokens are designed to be used by publishers or publisher service providers. Supply-side platforms (SSPs) pass EUID tokens in the bidstream and DSPs decrypt them at bid request time.<br/>EUID tokens are case sensitive.<br/>Example: A request for an EUID token for the fictitious email address `user@example.com` resulted in this value: `A4AAAAs6ZBcEbwAPoFhVV7CNW5W-4R-9TKDNL4RS0ctkw1U-IkNOXSnWczvwOMgCQaXHPf3Gd1o1W6IBmlZBFIloM67XOsOgwP5jUrQrclGkq1zBJJUJmOFTe6sJJA7pM1GP9gLd-hz5did6baZvcKd8DXkUYM-WALRZFnzHivu_1YEsC_CeXNdMexKDN7EwSQ6L5eZvOd1F1RkF_nLy_J0twg`. |

:::note
For the fictitious email address `user@example.com` used in these examples, the corresponding refresh token was: `AAAABrexFHvQVhNJqu+y/ua7rsgShF8e9NUXUJOZFmeFRD8TAsJadaLfOlLkwC5iSxcOKWFD9YwMBzbbcPa92CInba+bcPTaAFNmM2ZpIHgGy6lDcNPzvEnPQh/5fyZ3MD44SX/tHyIXa0R2OBAOLBA1A81r3jefhSsxZdyyBF58KtnaX6UbaeOEaguOfMnJdmhaPeWKj33v7vGfROWtxDWmi6wvGL5lHTX9H6iIZ9i1WSsemYPUgmoDOQeT7nzllJK968OECFj5LkCazDN3pCrYSeuJby9o0fMuSZNxzp6EVzi6XVED4ETtzpcaY0AArzzdh0IXV9MgH8jyg7bJSUWXQG+8kMPZzwbs9EB+7ddAUOLZL/GBna8Hm3Im03EjN3sJ`.
:::
