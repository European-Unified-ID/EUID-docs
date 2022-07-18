  %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0099F9', 'noteBorderColor':'#0099F9','actorTextColor': '#FFF', 'secondaryColor':'#ededed'}}}%%
  sequenceDiagram
    participant U as User
    participant P as Publisher
    participant EUID as EUID Service
    participant SSP
    Note over U,SSP: 1. Establish Identity
    U->>+P: 1-a. The user visits a publisher asset.
    P->>-U: 1-b. The publisher explains the value exchange of the open internet and requests a login.
    activate U
    U->>P: 1-c. The user authenticates and authorizes the creation of an EUID.
    deactivate U
    activate P
    P->>EUID: 1-d. The publisher sends the user's PII to the token generation service.
    deactivate P
    activate EUID
    EUID->>P: 1-e. The token generation service returns EUID tokens.
    deactivate EUID
    activate P
    P->>U: 1-f. The publisher sets an EUID for the user.
    deactivate P
    Note over U,SSP: 2. Bid Using EUID Tokens
  
    P->>SSP: 2-a. The publisher calls the SSP for ads using the EUID token.
    activate SSP
    SSP->>P: 2-b. The SSP returns ads to display.
    deactivate SSP
    activate P
    P->>U: 2-c. The publisher displays the ads to the user.
    deactivate P

    Note over U,SSP: 3. Refresh Tokens
    U->>EUID: 3-a. The SDK sends a request to refresh the EUID using the refresh token.
    activate EUID
    EUID->>U: 3-b. If a user hasn't opted out, the refresh token service returns new identity tokens.
    deactivate EUID
    Note over U,SSP: 4. User Logout
    U->>P: 4-a. The user logs out from a publisher asset.
    activate P
    P->>U: 4-b. The user's identity is cleared.
    deactivate P

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqNVU1v2zAM_SuEi8CHpUHX9lIfeujaAMGGIVjqnXJhLCYR5kiZJGfNgvz3UZI_1jgZhh7qUCQf-fgoHZJCC0qyBGAwOEglXQaH1K1pQ2kG6QItpUOIhu9oJC5KsnxygHRr5AbN_pMutfG-Vzc3Dw_jB--utKMnbQSZ-rQ7TLFw2rzSm-sCx-Oxj7JUaCW6lOkVCf-XHo_HwWCuACz9rEgV9CxxZXDjTQBbNE4WcovKQQ5oIbdk-kdTfzStFqW063PnL_nk2buE_zMyO1lQ32s2m0bjV24R9I4M5EM2ZvBxBC_WYcgPE0HKSbePvvn14-MH73KNI3hdE1RcIeyklc4CwrYpiuEtuVEMmnLQde6DFjGoc6O3bYlSWeCxwA7LithUrFGtuKRlsOotKZDKkVHkAJUA47mzAbDUK6lqGB6H3CH3kne1hlKLv0rFinNyQwU72pDNW7SRvykWURhCJ7Xy8KgCh3V-QacI7e9p16gP8KDitFVLSkQIX0jKE5xMwOlgcfoHN7kiRSaC2zi1PvL0BNnDRZP_ajqmCH4pLTPoKqNqhQQv24fqUp_rM8xz2W_SjyXSBktt2n4vdtJT3-0InqRg6Uu1inleQ4HevYOPro0KuwIKLMvIMnuECpBZr0Iyb-06PlVNuw_8EXm8bfTqUzWU-XQ8NSEtK3ffb6tNc4G020aOXc11rlh2nf-fvF1g7m4E32hpiLe2oyzuQVTlXcPX7PlzrUdstsmDmjq6JarjrT06R11PhLnHYvImvENx79ZoVep4mR0J0JUb9rP21KnoF8j6-vkPlfb4uB-FCxS-6BUjvrsU7t_dX3yLWF8ULI3eXLzGLgz0vlFJvdZtxdJCURIaEmeGmAyTDZkNSsEv1iFoOwlP0zzJ-JOFyzOZJ3N1ZM9qKzjoRUh-b5JsiaWlYcL3lp7tVZFkzlTUONXvSe11_ANYRkvh -->
    
    
    
