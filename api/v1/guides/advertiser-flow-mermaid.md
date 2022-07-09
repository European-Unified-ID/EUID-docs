  sequenceDiagram
    participant DP as Data Provider
    participant EUID as EUID Service
    participant DSP
    loop 1. Retrieve a EUID for PII using the identity map endpoints.
    DP->>EUID: 1-a. Send a request containing PII to the identity mapping endpoints.
    EUID->>DP: 1-b. Store the EUID and salt bucket returned from the identity mapping service.
    end
    DP-->>DSP: 2. Send stored EUIDs to DSPs to create audiences.
    loop 3. Monitor for salt bucket rotations related to your stored EUIDs.
       DP->>EUID: 3-a. Monitor salt bucket rotations using the bucket service.
       EUID->>DP: 3-b. Return salt buckets rotated since a given timestamp.
       DP->>EUID: 3-c. Compare the rotated salt buckets to stored EUID salt buckets.<br>If rotated, resend PII to identity mapping service for a new EUID.
       EUID->>DP: 3-d. Store the EUID and salt bucket returned from the identity mapping service.
    end

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNq1kzFv4zAMhf8KoTk10MtmFFnqDhkKGA26eWEkJidcLLkSnSIo-t9L2k4vvibjZXFgit97fJQ_jI2OTGkAMr31FCxVHvcJ2yaA_DpM7K3vMDBUNWCGChmhTvHoHaWfh55e15UeG54bSkdv6QpqU48vDzF2cF_AC3HydCTAsXMXE9TrNfTZhz3wbwKRC-z5BC12QMF10QfOxYip6rvVShtLuL_DQoSDE1TSkTKDjYHRB0UplOMPYqe1f6kKFG5VK3UrVI6JhtZxStHIeGDY9vYPsahxnwI52KXYXlfIYyATX_S-7avORoR-TeazarlBKKthKQ5PmwhZYuqd12Wp1YsklwU8x-Cld0hw5i4yso8hi8-DIJzSTrFPM6nJ2TzSpUZ65l5n_t3TVJpPOg9zqWG-DGld4vLIEysCs3oV9v5IAdi3skRsuxvmbAGPsZXrNe7mG3JJllkvxpzViodtWq13576F5JN1A9NNubXDIWCEQO8D8sag7j_dGrMwLaUWvZNv90MLjZHelhpTyl_xJpE1pgmfcrLvnEz25HR_ptzhIdPCYM9xcwrWlJx6Oh-aPv7p1OcXjT5e7Q -->
