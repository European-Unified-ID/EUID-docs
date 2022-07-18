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

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqdVd9v2jAQ_ldOqVAeRlFX-tI89KFrkZCmKRrNnngx8QHWgp3ZDitD_O872wkphFTd1IeG89333Xc_7H2UK45REgEMBnshhU1gH9s1bjBOIF4wg_EQguEH04ItCjR0soe41GLD9O6LKpR2vlc3N_f3k3vnLpXFR6U56vq0PYxZbpV-wVfbBk4mExdlMFeSt5DxFXL3Fx8Oh8FgLgEM_qpQ5vgk2EqzjTMBlExbkYuSSQsZMAOZQd09St1RWi0KYdaXzp-z6ZNz8f9nqLcix67XbJYG4zeSCGqLGrIhGRP4PIJnY5nHhylHaYXdBd_s-uHhk3O5ZiN4WSNUlCFshRHWAIOySYroDdpRCEop6DpzQYsQ1Lrha1kwIQ1QW2DLigrJlK-ZXFFKS29VJUoQ0qKWaIFJDtrVznjCQq2ErGmoHWLLSEvW5upTzd-kyirCJEE5ORqP5ixKiz8Yksg1MiuUdPRM-hrW-BzPGY6_01aoC3Ck_FyqQckDhUskpg5Op2CVt1j1k0SuUKIO5CZ0rcucnjE7umByX41iDOR9sFRBW2lZT4j3Ml2qFvqSTt_PZVeka0soGyyVPurtVdKZvtsRPApOoy_kKuC8-ASde0sfXJspbBPIWVGEKpOHz4BR1SsP5qyt4vOpOe4DfYQ63jbz6qCakjk46hoXhiZ315V1hOkp2m0zjm3ONVZIu8Z_t249lRuP4DsuNdLWtiU77sH4ZGUbOUTVt7b90z3uLjKBun3UNX-YPAKvdxUk_gZRXyX1xH1sPt6d9LEr5pQWNYhaMyNjSzeGRQ6qskMPf5rT-QpcSOw_VmF8ad9t6Khj-Ng-9PT1buQfAviqViTqpKl3J02l29A43bDUavNPfc0c1KKFouvpWJS8QKYvFCWNhtEG9YYJTq_u3u9n5J_XeZTQJ8mlzs-juTyQZ1VyCnrmgt7MKFmywuAwortXzXYyjxKrK2yc6jex9jr8BZE5jHw -->
    
