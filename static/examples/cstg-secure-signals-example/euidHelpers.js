export function initEuidSdk() {
    window.__euid = window.__euid || {};
    window.__euid.callbacks = window.__euid.callbacks || [];
    window.__euid.callbacks.push((eventType, payload) => {        
        if (eventType === 'SdkLoaded') {
            if (window.location.href.includes('localhost')) {
                // Client-side token generate won't work on localhost, so this fakes it for a good dev experience.
                // Do not do this outside a dev environment!
                __euid.setIdentityFromEmail = fakeSetIdentityFromEmail;
            }
            window.__euid.init({
                baseUrl: 'https://integ.euid.eu/',
            });
        }
    });
}

export function addEuidCallback(callback) {
    window.__euid = window.__euid ?? {};
    window.__euid.callbacks = window.__euid.callbacks ?? [];
    window.__euid.callbacks.push(callback);
}

export function removeEuidCallback(callback) {
    const initialLength = window.__euid.callbacks.length;
    const index = window.__euid.callbacks.indexOf(callback);
    if (index > -1) {
        window.__euid.callbacks.splice(index, 1);
    }
}

const oneDayInMs = 24*60*60*1000;
function getFakeIdentity(email) {
  return {
    advertising_token: `Fake advertising token for ${email}`,
    identity_expires: Date.now() + oneDayInMs,
    refresh_from: Date.now() + oneDayInMs*2,
    refresh_expires: Date.now() + oneDayInMs*3,
    refresh_token: `Fake refresh token for ${email}`,
  };
}

export function fakeSetIdentityFromEmail(email) {
    __euid.setIdentity(getFakeIdentity(email));
}
