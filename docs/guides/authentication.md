# Authentication Guide

## Overview

Nexlayer uses session-based authentication to secure API requests. Each deployment session generates a unique token that must be included in subsequent API calls.

## Session Tokens

Session tokens are automatically generated when you start a new deployment. They have the following characteristics:

- **Format**: JWT (JSON Web Token)
- **Expiration**: 24 hours from creation
- **Scope**: Limited to specific deployment resources
- **Rotation**: Automatic rotation available for long-running deployments

## Security Best Practices

1. **Token Storage**
   - Never store tokens in client-side code or version control
   - Use secure environment variables or secret management systems
   - Rotate tokens regularly for production deployments

2. **Request Security**
   - Always use HTTPS for API requests
   - Include tokens in the Authorization header
   - Validate server SSL certificates

3. **Error Handling**
   - Implement proper token expiration handling
   - Use refresh token flows for long-running operations
   - Log authentication failures securely

## Example Usage

```bash
# Store token securely in environment
export NEXLAYER_SESSION_TOKEN="your-session-token"

# Use token in API requests
curl -X GET "https://app.nexlayer.io/api/v1/deployments" \
  -H "Authorization: Bearer $NEXLAYER_SESSION_TOKEN"
```

```javascript
const { NexlayerClient } = require('@nexlayer/sdk');

// Token loaded from secure environment variable
const client = new NexlayerClient({
  sessionToken: process.env.NEXLAYER_SESSION_TOKEN
});

// SDK handles authentication automatically
const deployments = await client.listDeployments();
```

```python
from nexlayer import NexlayerClient
import os

# Token loaded from secure environment variable
client = NexlayerClient(
    session_token=os.environ['NEXLAYER_SESSION_TOKEN']
)

# SDK handles authentication automatically
deployments = client.list_deployments()
```

## YAML Configuration

For secure deployment configuration using YAML, refer to our [Nexlayer Deployment YAML repository](https://github.com/Nexlayer/nexlayer-deployment-yaml) for:

- Secure configuration patterns
- Environment variable usage
- Secret management
- Access control examples

## Rate Limiting

Authentication is subject to the following rate limits:

- 100 requests per minute per token
- 1000 requests per hour per token
- Burst capacity of 200 requests

Exceeding these limits will result in HTTP 429 responses. Implement appropriate retry logic with exponential backoff.

## Support

For authentication issues or security concerns, contact our support team:

- Email: support@nexlayer.io
- Security issues: security@nexlayer.io
- Documentation: https://docs.nexlayer.io 