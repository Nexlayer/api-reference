# Quick Start Guide

Welcome to the Nexlayer API! This guide will help you get started with using our API to manage deployments and monitor your applications.

## Prerequisites

- A Nexlayer account
- Basic understanding of REST APIs
- Familiarity with YAML configuration
- cURL or a similar HTTP client

## Authentication

All API requests require a session token. You can obtain a session token by starting a deployment:

```bash
curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @nexlayer.yaml
```

The response will include a `sessionToken` that you'll use for subsequent requests.

## Starting a Deployment

1. Create a YAML configuration file (`nexlayer.yaml`):

```yaml
application:
  name: My MERN App
  environment: production
  resources:
    cpu: 1
    memory: 2Gi
```

2. Start the deployment:

```bash
curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @nexlayer.yaml
```

3. The response will include:
   - Deployment URL
   - Session token
   - Status information
   - Extension and claim instructions

## Monitoring Deployment Status

Check the status of your pods:

```bash
curl -X POST "https://app.nexlayer.io/getPodsStatus" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionToken": "your-session-token",
    "applicationName": "My MERN App"
  }'
```

## Extending Deployment Duration

If you need more time with your deployment:

```bash
curl -X POST "https://app.nexlayer.io/extendDeployment" \
  -H "Content-Type: application/json" \
  -d '{
    "applicationName": "My MERN App",
    "sessionToken": "your-session-token"
  }'
```

## Best Practices

1. **Error Handling**
   - Always check response status codes
   - Implement proper error handling
   - Use exponential backoff for retries

2. **Rate Limiting**
   - Respect rate limits (100 requests per minute)
   - Implement request throttling
   - Cache responses when appropriate

3. **Security**
   - Never share your session tokens
   - Use HTTPS for all requests
   - Implement proper token rotation

## Next Steps

- Explore the [full API reference](../api/README.md)
- Check out our [SDK documentation](../sdk/README.md)
- Visit our [GitHub repository](https://github.com/Nexlayer/api-reference) 