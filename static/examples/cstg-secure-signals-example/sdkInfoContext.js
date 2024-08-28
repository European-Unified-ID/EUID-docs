import { createContext } from 'https://esm.sh/htm/preact/standalone';

export const SdkInfo = createContext();

let identityUpdates = 0;

export function createSdkInfo(event, payload) {
    if (event !== 'SdkLoaded' && event !== 'InitCompleted') identityUpdates++;
    return {
        identity: payload?.identity,
        advertisingReady: !!__euid.getAdvertisingToken(),
        loginRequired: __euid.isLoginRequired() || __euid.isLoginRequired() === undefined,
        optedOut: __euid.hasOptedOut(),
        lastPayload: payload,
        updates: identityUpdates,
    };
}