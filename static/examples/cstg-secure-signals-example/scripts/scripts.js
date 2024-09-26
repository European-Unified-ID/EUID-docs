const clientSideIdentityOptions = {
  subscriptionId: 'QRtT141htm',
  serverPublicKey: 'EUID-X-I-MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEYla1YQ6N+surF4Yjaax46mPxCv7ixCR0zd3AYV5D8nhEVbQOuhs+GGxp0rUVpucJGQxNvkINwdSeCTpyzLMtFA==',
};

function updateGuiElements(state) {
    $('#targeted_advertising_ready').text(
        __euid.getAdvertisingToken() ? 'yes' : 'no'
    );
    const token = __euid.getAdvertisingToken();
    $('#advertising_token').text(String(token));
    $('#login_required').text(
        __euid.isLoginRequired() || __euid.isLoginRequired() === undefined ? 'yes' : 'no'
    );
    $('#identity_state').text(String(JSON.stringify(state, null, 2)));

    const euidLoginRequired = __euid.isLoginRequired();
    if (euidLoginRequired) {
        $('#login_form').show();
        $('#logout_form').hide();
    } else {
        $('#login_form').hide();
        $('#logout_form').show();
    }

    const secureSignalsStorage = localStorage['_GESPSK-euid.eu'];
    if (token && !secureSignalsStorage) {
      //Token is valid but Secure Signals has not been refreshed. Reload the page.
        location.reload();
    }
    const secureSignalsStorageJson = secureSignalsStorage && JSON.parse(secureSignalsStorage);
    if (secureSignalsStorageJson && secureSignalsStorageJson[1]) {
        $('#secure_signals_loaded').text('yes');
        $('#secure_signals_value').text(JSON.stringify(secureSignalsStorageJson, null, 2));
    } else {
        $('#secure_signals_loaded').text('no');
        $('#secure_signals_value').text('undefined');
    }
}

function isEnabled(product) {
    return $(`#${product}_state th input`)[0].checked;
}

function onEuidIdentityUpdated(eventType, payload) {
    console.log('EUID Callback', payload);
    // allow secure signals time to load
    setTimeout(() => updateGuiElements(payload), 1000);
}

function onDocumentReady() {
    $('#logout').click(() => {
      window.googletag.secureSignalProviders.clearAllCache();
        if (isEnabled("euid")) {
            __euid.disconnect();
        }
    });

    $('#login').click(async () => {
        window.googletag.secureSignalProviders.clearAllCache();
        const email = $('#email').val();

    try {
        if (isEnabled("euid")) {
            await __euid.setIdentityFromEmail(email, clientSideIdentityOptions);
        }
        } catch (e) {
            console.error('setIdentityFromEmail failed', e);
        }
    });
}

window.__euid = window.__euid || {};
window.__euid.callbacks = window.__euid.callbacks || [];

window.__euid.callbacks.push(onEuidIdentityUpdated);
window.__euid.callbacks.push((eventType, payload) => {
    if (eventType === 'SdkLoaded') {
        window.__euid.init({
            baseUrl: 'https://integ.euid.eu/',
        });
        $(document).ready(onDocumentReady);
    }
});