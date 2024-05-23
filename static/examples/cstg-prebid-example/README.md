# Example Prebid.js EUID Integration

## Viewing live site

This example demonstrates the [EUID Client-Side Integration Guide for Prebid.js](https://euid.eu/docs/guides/integration-prebid-client-side). 

To view the site running, navigate to [EUID Prebid.js Client-Side Integration Example](https://euid.eu/examples/cstg-prebid-example/).

## Running locally

To run this example, open `index.html` in the web browser after downloading the code. 

When running locally, the configuration values in `index.html` will not work, as it's set up for the integration environment which won't accept calls running on `localhost`. To run it locally, you will need the Operator running locally using `local-config.json` (usually done via IntelliJ) and update `window.euid_example_settings` to point to your local operator and use a valid client-side key.

## Prebid.js

This file is a build of Prebid.js with the userId, uid2IdSystem/euidIdSystem and appnexusBidAdapter modules included.
