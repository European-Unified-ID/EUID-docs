graph LR
A[Decrypt EUID Token] --> B[Retrieve Opt-out for EUID]
    B --> C{Check Opt-out}
    C --> |Opted Out| D[Bid without EUID]
    C --> |Not Opted Out| E[Bid with EUID]

<!-- Edit in Mermaid Live Editor: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNpN0M0KwjAMAOBXCTm7F9hBcD8HQRSmntYdyhpd0bWjpopse3frdGJPofkSkvRYW0UY49nJroFNIcyqzKh2z44hP64zONgLmQqiaAlJWRA7TXeCXceR9Qwn6yZWCQPhJZNL-7Sh-jKj8ZNLp9wQPknBzvMAWZloBQ_NzbvVX5sv3VqGP57_-GxxgS25VmoVNujftQK5oZYExiEMw9GNBQozBuk7JZlypdk6jE_yeqMFSs92_zQ1xuw8zSjTMtyj_arxBYlqX24 -->
