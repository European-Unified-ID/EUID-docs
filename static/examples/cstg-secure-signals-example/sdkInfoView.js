import { html, useContext } from 'https://esm.sh/htm/preact/standalone';
import { SdkInfo } from './sdkInfoContext.js';

function yesOrNo(item) {
    if (item) return "yes";
    return "no";
}

function InfoText() {
    return html`
        <h1>Client-Side Integration Example, EUID JavaScript SDK</h1>
        <p>
            This example demonstrates how a content publisher can follow the${' '}
            <a href="https://euid.eu/docs/guides/integration-javascript-client-side">
                Client-Side Integration Guide for JavaScript
            </a>
            ${' '}to implement EUID integration and generate EUID tokens.
        </p>
    `;
}

export function SdkInfoView() {
    const sdkInfo = useContext(SdkInfo);
    if (!sdkInfo) return null;
    return html`
        <${InfoText} />
        <table id="euid_state">
            <tr>
                <td class="label">Ready for Targeted Advertising:</td>
                <td class="value"><pre id="targeted_advertising_ready">${yesOrNo(sdkInfo.advertisingReady)}</pre></td>
            </tr>
            <tr>
                <td class="label">EUID Advertising Token:</td>
                <td class="value"><pre id="advertising_token">${sdkInfo.identity?.advertising_token}</pre></td>
            </tr>
            <tr>
                <td class="label">Is EUID Login Required?</td>
                <td class="value"><pre id="login_required">${yesOrNo(sdkInfo.loginRequired)}</pre></td>
            </tr>
            <tr>
                <td class="label">Has opted out?</td>
                <td class="value"><pre id="has_opted_out">${yesOrNo(sdkInfo.optedOut)}</pre></td>
            </tr>
            <tr>
                <td class="label">EUID Identity Updated Counter:</td>
                <td class="value"><pre id="update_counter">${sdkInfo.updates}</pre></td>
            </tr>
            <tr>
                <td class="label">EUID Identity Callback State:</td>
                <td class="value"><pre id="identity_state">${JSON.stringify(sdkInfo.lastPayload, null, 2)}</pre></td>
            </tr>
        </table>
    `;
}