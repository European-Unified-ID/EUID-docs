[EUID Overview](../../../README.md) > [v2](../summary-doc-v2.md) > [Getting Started: Summary](gs-summary.md) > Authentication and Authorization

# Authentication and Authorization

To authenticate to the EUID endpoints in a server-side implementation, you need the following:

- A client [API key](gs-credentials.md#api-key-and-client-secret). The API key is included as a bearer token in the request's Authorization header. For example:<br/>
  `Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- A client secret for encrypting API requests and decrypting API responses. This is needed for all endpoints except [POST /token/refresh](../endpoints/post-token-refresh.md). <br/>>For details, and encryption/decryption examples in several different coding languages, see [Encrypting Requests and Decrypting Responses](gs-encryption-decryption.md).