[EUID Overview](../../../README.md) > [v2](../summary-doc-v2.md) > [Getting Started -- Summary](gs-summary.md) > API Keys

# API Keys

Each EUID participant has an API key, also called a client key. Each key has a corresponding client secret, a value known only to the participant and the EUID service.

The API key and client secret allow the participant to connect to the Operator Service and call API endpoints. These values identify the participant to the service.

Here is some information about API keys and client secrets:
- One EUID participant can have multiple keys.
- Each key has a set of permissions that determine which endpoints it can be used on.
- Each key has a corresponding client secret.
- Most API endpoints require both API key and client secret for authentication. For details, see [Authentication and Authorization](gs-auth.md).
- If you're using the integration environment as well as the production environment, you'll require separate API keys for each environment.

As part of getting your EUID account set up, one or more API keys, each with a corresponding client secret, will be issued to you.