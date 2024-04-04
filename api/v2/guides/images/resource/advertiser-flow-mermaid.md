  %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0099F9', 'labelTextColor': '#FFF', 'actorTextColor': '#FFF'}}}%%
  sequenceDiagram
    participant DP as Data Provider
    participant EUID as EUID Service
    participant DSP
    loop 1. Retrieve an EUID for personal data using the identity map endpoints.
    DP->>EUID: 1-a. Send a request containing personal data to the identity mapping endpoints.
    EUID->>DP: 1-b. Store the EUID and salt bucket returned from the identity mapping service.
    end
    DP-->>DSP: 2. Send stored EUIDs to DSPs to create audiences.

    loop 3. Monitor for salt bucket rotations related to your stored EUIDs.
       DP->>EUID: 3-a. Monitor salt bucket rotations using the bucket service.
       EUID->>DP: 3-b. Return salt buckets rotated since a given timestamp.
       DP->>EUID: 3-c. Compare the rotated salt buckets to stored EUID salt buckets.<br/>If rotated, resend personal data to identity mapping service for a new EUID.
       EUID->>DP: 3-d. Store the EUID and salt bucket returned from the identity mapping service.
    end

    <!-- Mermaid Live Editor Source:  https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNq1lMGO2kAMhl_FSoW4sNFuORFVXDaLtIdKaGl74mIyho6azKQzDi1CvHvtJLtLFjj2lGjs-X77tzXHpPCGkiwBGI2O1lnO4Djmn1TROIPxBiONJ9Ad_MBgcVNSlMgRxnWwFYbDoy990NxP9_ez2WKm6SVuqPxGf_k9uFgsNIIF-3AZOZ1Oo9HaAUT63ZArKLe4C1jpEUCNgW1ha3QM-RIwQo6MsAx-bw2Fy6Sn78-5prXfFYW9LegKarXsDkvva3hI4YU4WNoToOuubn2AmkL0DkswqtlE63YgdoAoO7Z8gAprIGdqbx3HtCPmy7v5XBEZPNxhKjU4AwhBu4sMhXeMYraghnj2F-xasz7yFS0K-VL5G-GLq9Re7VoXtYglw6YpfhGLLjfBkYFt8NV1hdi51PNF760R1VmJ0Oe-jahaphWKWrAE228RCFm8a4zVCWqpZ_ZOU_jqZb3EUXV1UJ1nZOtdlDpLQRilHXwTBlJ9ZUNzp2ruK_c6831ifWjY6dDMqZr50rp1josdT0oRWCE9ws7uyQHbSsaJVX2juCKFR1_JznWzeYOck6XXszYHsfTLJsyft6_3JuJP1Alc7MytabZWIzj608JvtGz-0_4kk6SiUKE18r4cNbBO2odknWTyK7WJeetk7U6S2dTSDD0ZnWSSbbGMNEmwYb86uCLJODT0mtS_DX3W6R-55JVD -->
   
