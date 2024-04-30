  %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0099F9', 'noteBorderColor':'#0099F9','actorTextColor': '#FFF', 'secondaryColor':'#ededed'}}}%%
  sequenceDiagram
    participant U as User
    participant P as Publisher
    participant EUID as EUID Service
    participant SSP
    Note over U,SSP: 1. Establish Identity
    U->>+P: 1-a. The user visits a publisher asset.
    P->>-U: 1-b. The publisher provides transparency around its data practices.
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
    U->>EUID: 3-a. The SDK sends a request to refresh the EUID using the refresh token.
    activate EUID
    EUID->>U: 3-b. If a user hasn't opted out, the refresh token service returns new identity tokens.
    deactivate EUID
    Note over U,SSP: 4. User Logout
    U->>P: 4-a. The user logs out from a publisher asset.
    activate P
    P->>U: 4-b. The user's identity is cleared.
    deactivate P

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqNVUtv2kAQ_isjR8iHAkqTXOJDDmmCFLWqUIl74jJ4B1jV7Lq7axqK-O-d3bVxg6GqcoiZ5zffPHafFFpQkiUAg8FeKuky2KduTRtKM0gXaCkdQhR8RyNxUZJlzR7SysgNmt0nXWrjba-ur-_vJ_feXGlHj9oIMo22U6ZYOG1e6c11jpPJxHtZKrQSXcj0ioT_Sw-Hw2AwVwCWftakCnqSuDK48SKACo2ThaxQOcgBLeSWTF819appvSilXZ_TP-cvT94k_J-R2cqC-laz2TQKv3KJoLdkIB-yMIOPY3i2DkN8eBGknHS7aJuPHh4-eJMRjuF1TVAzQthKK50FhKoFxektuXF0mrLTKPdOi-jUmdFbVaJUFrgtsMWyJhYVa1QrhrQMUl2RAqkcGUUOUAkwnjsbEpZ6JVWThtsht8i15B3WALX4CyrWHJMLKtjQhmheoo38TRFEYQid1MqnRxU4bOILOs1w_D3tCvUOPqk4LdWSEjGFB5JaqMhYrbAEgQ7B6aBz-geXuyJFJsKwsX99DNMTDD5xFPmvtnaKMC6FZS5dbVQzK8HK9lN1oc9VHDq77JfrGxQJhKU2x8ovVtKbw5sxPErBSyDVKsZ5DQC9eZc-mrbz2AEosCwj32wRECDzX4dgXtpVfDo_x83gj8jjTTu5PlRLmQ_HXRPS8gzv-mUdw1wg7aYdzA5zEyvCbuL_k7cLzN2O4RstDfH-dpTFjYjzedvyNXv63Ewmtnvlk5rG-0hUx9tRdY663hDmPheT98LbFDdwjValjtfakQBdu2E_am86Ff0C2Ryi_5jSHh9343BK4YteccZ35-Hu3SXje2I9KFgavbl40C409K6dkmbBj4ilhaIkNCTONDEZJhsyG5SC3659mO0kPFLzJONPHlzuyTyZqwNb1hUfC3oWkl-eJFtiaWmY8AXTs50qksyZmlqj5mVprA5_AM6AUB0  -->
    
    
    
