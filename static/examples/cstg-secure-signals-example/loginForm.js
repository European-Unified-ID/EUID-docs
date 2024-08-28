import { html, useState, useContext } from 'https://esm.sh/htm/preact/standalone';
import { SdkInfo } from './sdkInfoContext.js';

export function LoginForm({loginAction, logoutAction}) {
    const [email, setEmail] = useState('test@example.com');
    const identity = useContext(SdkInfo)?.identity;
    const onInput = (e) => {
        setEmail(e.currentTarget.value);
    };
    return html`
        ${identity && html`
            <div id="logout_form" class="form">
                <form>
                    <button type="button" class="button" id="logout" onClick=${logoutAction}>Log Out</button>
                </form>
            </div>
        `}
        ${!identity && html`
            <div id="login_form" class="form">
                <div class="email_prompt">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter an email address"
                        value=${email}
                        onInput=${onInput}
                    />
                </div>
                <div>
                    <button type="button" class="button" id="login" onClick=${() => loginAction(email)}>Log In</button>
                </div>
            </div>
        `}
    `;
}