%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0099F9', 'primaryTextColor': '#FFF','textColor': '', 'secondaryColor':"black'}}}%%
graph LR
A[Decrypt EUID Token] --> B[Retrieve Opt-out for EUID]
    B --> C{Check Opt-out}
    C --> |Opted Out| D[Bid without EUID]
    C --> |Not Opted Out| E[Bid with EUID]

<!-- Edit in Mermaid Live Editor: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNpN0EFrgzAUB_Cv8siQXCz0Wg-DqRUGY4Wu28X0kJrXGqqJxOe2Yv3ui7Zdm1N4_1_-hNezwipkEQuCXhtNEfScSqyRR8B3skUewmXwJZ2Wuwpbn_TAG6dr6U6Jrawb7dN8vlhki5Ffow3-0j3OsoyHnB5no22xsEbdiwTbVbI48mEYgkCYg5NNCW9rYV7yFAt3agiWn68pbOwRzRZms2eI8zWS0_iNsGpoZjuCvXUT2woD_sSTS_qkxOJ4Q8MlS6bs7IeoYNXRGdI81gp-NJVj1UPNlb5bgge-_Oc3y0JWo6ulVn6v_fhWsGmFgkX-6j-HLQkmzOBl1yhJuFSarGPRXlYthkx2ZD9OpmARuQ5vKNXS76O-quEPrDaPlQ -->
