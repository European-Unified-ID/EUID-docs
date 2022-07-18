%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0099F9', 'labelTextColor': '#FFF', 'actorTextColor': '#FFF'}}}%%
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

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNq1lEFv2kAQhf_KyBXiQqyknLAqLnGQOFSyQtsTl7F3oKvau-7umhZZ_PfO2CbBAY49GXlmv_fmzeI2KqyiKIkAJpNWGx0SaKfhJ1U0TWCao6fpDPoXP9BpzEvyXGlhWjtdoTs-29I66f30-LhYrBbSXmJO5Tf6G96Lq9VKKlgE664rp9NpMtkaAE-_GzIFpRr3Dit5BVCjC7rQNZoAaQboIcWAkDl70IrcddPL93Uqbd1zQ-6gC7qB2mT9y9LaGp5ieKXgNB0I0PRHd9ZBtl5D47XZA4cArGeCDkeosAYyqrbaBB_3nDR7WC7lYAJPDxizslGA4GQmH6CwJiBHzCiBBntFrKX2kSpA5qaZUHOmcoLUHe3HZA2PZYC8KX5RYLXQOEMKds5WtxV8n8jAZ703-6KzYaHPg3kvWqoT8mKYi92zcISBc2qUlm2J1Yso5zF8tXyVOD1JcOTOBgzaGs8-S0YooR1t40ZSg7NxpHOJ9My9zXzf01AaTzoOcy5hvnZpXeJ8z2MrDCt4RtjrAxkIuuIlYlXfMVfE8Gwrvl_9bt4gl2Se9WLMUS3-krvlenc-N-N8vGxguCn3dtgFjGDoT4e8M6j6T7cmmkUVuQq14i9IK4Vt1H0qtlHCP9kbR7aNtubEnU2teLIXJfuLkh2WnmYRNsFujqaIkuAaOjcN__6h6_QPD3aIjw -->
    
    
