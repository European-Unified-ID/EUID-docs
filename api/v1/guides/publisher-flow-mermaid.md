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
    P->>U: 4-b. The user's identity clears.
    deactivate P

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqNVT2P2zAM_SuElxuaGGguU4YbimQIWhRGc96y8GTaEepIriSnTQ_330tJ_ujFcdEssSmK7_HpUX5NhC4o2SQAln60pARtJVYGz0cF_GvQOClkg8pBDmght2SmS5lfytqXWtrTvfVdvt_6lPB_IHORgqZZh0MWg1-1I9AXMpAvOLiBjynsrMNQH_YFKSfdNebmy6enDz5liSk8nwhaZggXaaWzgND0pBjekkvjpow3LXO_6SVuGtPoV1OjVBYchy9Yt8QhcUJVMaUyRHVDCqRyZBQ5QFWA8drZAFjrSqoOBoWTF-Re8pFroCr-ooot1-SGBCfaUM1HtJG_KZIQhtBJrTw8qqBhV7-gW4ThPRsb9Rs8aHHbqiVVRAhP5IFPcL8Hp0PE6e_cZEWKTAS38dSmyNkNsoeLIf_Ud0wRfK4sK-haozqHhCw7hRpL3-sznGc5bdIfS5QNSm2Gfmc7mbhvlcInWbD1papinedA0KeP8DG1d-FIQGBdR5U5IzBAVr0NxXx07PjWNcM88EPUcdX71ZfqJfPl-NQKadm512lbQ5kZ0Va9HUfOXa1Iu6v_T91mlHtM4RuVhnhqR8niHERXPvZ6HbafOz9iP00e1HS7B6FG3Yale9JNTJh7LBZvzzMU5-6EVj04HmZHBejWLaZVJ-5U9BNkd_38h0sneqzTcIHCF10x4rtLYf3u_uJbxHpSUBp9nr3GZg503bukG-uBsagJzR3GWbJIzmTOKAv-FLwGXyesxpmOyYYf2bR8HsfkqN44s20K3rQrpNMm2ZRYW1okfGfpw1WJZONMS31S9y3pst7-AC3RF0Y -->
    
    
    
