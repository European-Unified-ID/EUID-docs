  %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0099F9', 'noteBorderColor':'#0099F9','actorTextColor': '#FFF', 'secondaryColor':'#ededed'}}}%%
  sequenceDiagram
    participant U as User
    participant SSP
    participant DSP
    participant EUID as EUID Service
    participant TC as Transparency & Control Portal
    Note over U,TC: 1. Honor user opt-outs.
    U->>TC: 1-a. User opts out.
    activate TC
    TC->>EUID: 1-b. EUID service receives opt-out.
    deactivate TC
    activate EUID
    EUID->>DSP: 1-c. DSP receives opt-out.
    deactivate EUID
    Note over U,TC: 2. Decrypt EUID tokens to use in RTB.
    SSP-->>DSP: The SSP calls a DSP for bid.
    DSP->>DSP: 2-a. Decrypt EUID tokens.
    DSP->>DSP: 2-b. Execute bidding logic, honoring user opt-outs from step 1.

<!-- Edit in Mermaid Live Editor: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqNU8GO2jAQ_ZWRVzQXiLZ7I4c9bFi0e6lWJfSUi3EGsJrY6dhBiyL-vTMkFLVwqHJw_ObN8_Oz3SvjK1SZAphMeutszKBP4h4bTDJINjpgMoUB-KHJ6k2NgSs9JC3ZRtMx97Un4T48Ps7ny7nQnY_44qlCGqvXYqJN9FTgZ7w2LpdL6QpovKuukskDVvIlp9NpMikdQMBfHTqDC6t3pBuBAFpN0RrbahdhDTrAOiDdllarj1twcQ98Xb8vROc8rpAO1uAtq8iFU5B2gWF2dYQvkHsXydfw4Snqemj6xmGAPyDBelrkGXxN4c07T9CxT_BtnPkuhnQgr2fPz2fSTKfnjQghADNGAsdnD5oVi3wAipxbxKo0bdLBdRhcA6FBe8BwWWYUqfBG5g8g_QMkf6zNGYm0SSWt_1C8Cvy78yeWQEPHdsw4-p_oAg8SBVgH34uXUY9Pa3ZZu9ijzMHoug6gzza2nN_GViObkQv5SYK7s8o9pqT1iaZjl6xVWbeD2u-smcJeDkjmf50RbMk3ECK2fIilU1PVIDXaVvx-etEv1fmhlCrjX7aIIZaqdCdmdm3F4bxWlm-_yra6DjhVuot-dXRGZZE6vJDG2z2yTr8BU6oo8g  -->

