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
    DSP->>DSP: 2-b. Execute bidding logic, honoring user opt-outs from 1.

<!-- Edit in Mermaid Live Editor: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqNUrFugzAQ_ZWTh06A1IwMGUoitUsVFdhYHHNJrIJNbYMaRfn33gFp1ZKhLLYf7949v_NFKFujSAWAx48ejcKNlkcn28oAfZ10QSvdSROgBOmh9OiWv_J8twQ398Bt-bJhnXHN0Q1a4ZJVZMwpnDSeYHJ1hgfIrAnONrCzLshmKnq1AcEO6KCMiiyFxwSerbEOevIJtgux7YNPJnIZr9cjKZbJeBEmeCDGTJAq6EGSYpFNQJFRCVvlon0yufaTa3CoUA_ob21mkRoXMt8A108Q70ibMmJplXBa_1D8Efh78xVJoHLnbs442Hc0nhaOArSBt-Jp1qNpxbfexQn5DEo2jQc52jhQfntdz2xCbuQVB3enyz0mp_WJqieXpFVrc4TGHrWK4MQD4vOvGcHB2ZbmVxkRiRZdK3VN7_LC0pUIJ2yxEiltyR36UInKXInZdzXlsq11sE6kB9l4jITsg83PRok0uB5vpPlhz6zrF2ZP874 -->

