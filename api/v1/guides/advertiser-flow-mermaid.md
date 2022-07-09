  sequenceDiagram
    participant DP as Data Provider
    participant EUID as EUID Service
    participant DSP
    loop 1. Retrieve an EUID for PII using the identity map endpoints.
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

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNq1kzFv4zAMhf8KoTk10MtmFFnqDhkKGA26eWEkJidcLLkSnSIo-t9L2k4vvibjZXFgit97fJQ_jI2OTGkAMr31FCxVHvcJ2yaA_DpM7K3vMDBUNWCGChmhTvHoHaWfh55e15UeG54bSkdv6QpqU48vDzF2cF_AC3HydCTAMLbuYoJ6vYY--7AH_k0geoE9n6DFDii4LvrAuRg5VX23WmljCfd3WIhycICQdKbMYGNg9EFRCuX4g9hp7V-qAoVb1UrdCpVjoqF1HFM0Mh4Ytr39Qyxq3KdADnYpttcV8pjIxBe9b_uqsxGhX5P5rFpuEMpqWIrD0yZClpx653VbavUiymUBzzF46R0SnLmLjOxjyOLzIAintFPs00xqcjaPdKmRnrnXmX_3NJXmk87DXGqYL0Nal7g88sSKwKzMCHt_pADsW1kitt0Nc7aAx9jK_Rp38w25JMusF2POasXDNq3Wu3PfQvLJuoHpptza4RAwQqD3AXljUPefbo1ZmJZSi97Jx_uhhcZIb0uNKeWveJPIGtOETznZd04me3K6P1Pu8JBpYbDnuDkFa0pOPZ0PTV__dOrzC0SxX1s -->
    
    
