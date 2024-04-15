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
    P->>EUID: 1-d. The publisher sends the user's personal data to the token generation service.
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
    U->>P: 3-a. The user returns to a publisher asset.
    activate P
    P->>EUID: 3-b. The publisher uses a refresh token to request new identity tokens for the user.
    deactivate P
    activate EUID
    EUID->>P: 3-c. If a user hasn't opted out, the refresh token service returns new identity tokens.
    deactivate EUID
    activate P
    P->>U: 3-d. The publisher sets the new EUID for the user.
    deactivate P

    Note over U,SSP: 4. User Logout
    U->>P: 4-a. The user logs out from a publisher asset.
    activate P
    P->>U: 4-b. The user's identity clears.
    deactivate P

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqdVU1vGjEQ_SujrdAeSlAacgmHHNIEKVJVoZLticuwHsDqYm9tLw1F_PeO7V22sBClVQ5ZxjNv3psPe5fkWlAySgB6vZ1U0o1gl7oVrSkdQTpHS2kfouE7Gonzgiyf7CAtjVyj2X7WhTbe98P19d3d-M67K-3oQRtBpj5tD1PMnTYv9OrawPF47KMs5VqJFjL9QML_pfv9vtebKQBLPytSOT1KXBpcexNAicbJXJaoHGSAFjJLpns08UeTal5Iuzp3_pQ9P3qX8H9KZiNz6npNp5No_MoSQW_IQNZn4wg-DeDJOgz48CxIOem20Te7ur__6F2ucAAvK4KKGcJGWuksIJQNKU5vyQ1i0ISDrjIfNI9BrRu9lgVKZYHbAhssKmJTvkK1ZEqLYNUlKZDKkVHkAJUA42tnQ8JCL6Wq03A75AZZS9ZyDVTzv6hixZgsKGdHG9C8RRv5myKJ3BA6qZVPjyrUsMYXdJrh8HvSCvUBPqk4lWpJiZjCE0ktlGSsVliAQIfgdDhz-gfLXZIiE2nY2L8uh8kJB584mvxXo50ijUuwXEtXGVXPSvCy3VQt9DnFobOLrlzfoFhAWGhzUH5RSWcObwbwIAUvgVTLiPMSCHr3Nn10beaxJZBjUcR6s0dggFz_KoB5a6v4dH4Om8EfsY43zeR6qKZkHo67JqTlGd52ZR1gLhTtphnMlnONFWnX-G_W7ULlhgP4RgtDvL9tyQ4bMTxa3kYOp7q0wJfnfNhdaQb1m2nq_HHyGLzeWlD0C2R9qdQT9775eHPSh76Yz7yyUdQKrUod3x2OBOjK9QP8MafTFThD7D9WYXhu813sqM_wvn240NfbQXgS4Itesqijpt4eNZXvRet1w8Lo9T_1NfNQ8xaKL6pDUfKC0JwpyiTpJ2sya5SC399d2M8kPLSzZMSfLJc7P0tmas-eVckXHj0Jya9nMlpgYamf8C2sp1uVJyNnKmqc6tex9tr_AUWfkLg -->
    
