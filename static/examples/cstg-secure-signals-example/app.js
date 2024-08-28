import { html, render, useState, useEffect } from 'https://esm.sh/htm/preact/standalone';
import { SdkInfoView } from './sdkInfoView.js';
import { SdkInfo, createSdkInfo } from './sdkInfoContext.js';
import { LoginForm } from './loginForm.js';
import { addEuidCallback, removeEuidCallback, initEuidSdk } from './euidHelpers.js';

const clientSideIdentityOptions = {
    // serverPublicKey:  'EUID-X-I-MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEYla1YQ6N+surF4Yjaax46mPxCv7ixCR0zd3AYV5D8nhEVbQOuhs+GGxp0rUVpucJGQxNvkINwdSeCTpyzLMtFA==',
    // subscriptionId: 'QRtT141htm',
};
initEuidSdk();

function euidLogin(email) {
    window.googletag.secureSignalProviders.clearAllCache();
    __euid.setIdentityFromEmail(email, clientSideIdentityOptions);
}

function euidLogout() {
    window.googletag.secureSignalProviders.clearAllCache();
    __euid.disconnect();
}

function App () {
    const [sdkInfo, setSdkInfo] = useState(null);

    useEffect(() => {
        const callback = (event, payload) => {
            console.log('EUID event received', event, payload);
            const info = createSdkInfo(event, payload);
            setSdkInfo(info);
        };
        const onEuidIdentityUpdated = (eventType, payload) => {
            console.log('EUID Callback', payload);
        };

        addEuidCallback(onEuidIdentityUpdated);
        addEuidCallback(callback);

        // Remove our callback if this component unmounts
        return () => removeEuidCallback(callback);
    }, []);

    return html`
        <${SdkInfo.Provider} value=${sdkInfo}>
            <${SdkInfoView} />
            <${LoginForm} loginAction=${euidLogin} logoutAction=${euidLogout} />
        <//>
    `;
}

const root = document.getElementById('root');
render(html`<${App} />`, root);



