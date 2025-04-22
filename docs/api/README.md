# Nexlayer API Reference

Welcome to the Nexlayer API! Build and deploy AI-powered applications with our simple yet powerful API.

> 🚀 **Quick Tip**: Get started in minutes by deploying your first AI application. Check out our [YAML deployment guide](https://github.com/Nexlayer/nexlayer-deployment-yaml) for detailed examples and best practices.

## Authentication

```bash
# Example YAML file (see https://github.com/Nexlayer/nexlayer-deployment-yaml for full spec)
application:
  name: my-first-app
  pods:
    - name: webapp
      image: "your-username/my-app:v1.0.0"
      path: "/"
      servicePorts:
        - 3000

# Deploy using curl
curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @nexlayer.yaml
```

```javascript
const { NexlayerClient } = require("@nexlayer/sdk");
const client = new NexlayerClient();

const deployment = await client.startDeployment(yamlConfig);
const sessionToken = deployment.sessionToken;
```

```python
from nexlayer import NexlayerClient
client = NexlayerClient()

deployment = client.start_deployment(yaml_config)
session_token = deployment.session_token
```

All API requests require authentication using session tokens. You'll receive a session token when starting a deployment, which you'll use for subsequent requests. [Learn more about authentication →](../guides/authentication.md)

## YAML Configuration

For detailed information about configuring your application deployment, including examples for different application types and best practices, visit our [Nexlayer Deployment YAML repository](https://github.com/Nexlayer/nexlayer-deployment-yaml).

The repository includes:

- Complete YAML specification
- Real-world examples
- Best practices
- Common patterns
- Troubleshooting guides

## Rate Limits

> ⚡ **Rate Limit**: 100 requests per minute per session

The API includes rate limit headers in all responses:

```json
{
  "X-RateLimit-Limit": "100",
  "X-RateLimit-Remaining": "99",
  "X-RateLimit-Reset": "1619123456"
}
```

## Core Resources

### Deployments

| Resource                                | Description                        |
| --------------------------------------- | ---------------------------------- |
| [Start Deployment](#start-deployment)   | Deploy your AI-powered application |
| [Extend Deployment](#extend-deployment) | Extend your deployment duration    |
| [Get Pods Status](#get-pods-status)     | Monitor your deployment status     |

#### Start Deployment

<aside class="notice">
This endpoint starts a new deployment of your application.
</aside>

```bash
curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @nexlayer.yaml
```

```yaml
# nexlayer.yaml
application:
  name: My AI App
  pods:
    - name: ai-app
      image: "your-username/my-ai-app:v1.0.0"
      path: "/"
      servicePorts:
        - 3000
```

```javascript
const deployment = await client.startDeployment(yamlConfig);
console.log(deployment.url);
```

#### Extend Deployment

<aside class="notice">
Extend the duration of your running deployment.
</aside>

```bash
curl -X POST "https://app.nexlayer.io/extendDeployment" \
  -H "Content-Type: application/json" \
  -d '{
    "applicationName": "My AI App",
    "sessionToken": "your-session-token"
  }'
```

```javascript
const extension = await client.extendDeployment("My AI App");
console.log(extension.message);
```

#### Get Pods Status

<aside class="notice">
Monitor the status of your deployment's pods.
</aside>

```bash
curl -X POST "https://app.nexlayer.io/getPodsStatus" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionToken": "your-session-token",
    "applicationName": "My AI App"
  }'
```

```javascript
const status = await client.getPodsStatus("My AI App");
console.log(status.pods);
```

## Error Handling

> 🚨 Example Error Response:

```json
{
  "error": "Invalid session token",
  "code": "INVALID_TOKEN"
}
```

The API uses conventional HTTP response codes:

| Code | Description                             |
| ---- | --------------------------------------- |
| 200  | Success                                 |
| 400  | Bad Request - Invalid parameters        |
| 401  | Unauthorized - Invalid session token    |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Server Error - Please contact support   |

## Best Practices

### Security

- Never share session tokens
- Use HTTPS for all requests
- Implement proper token rotation
- Store tokens securely

### Performance

- Cache responses when possible
- Implement request throttling
- Use exponential backoff for retries
- Monitor resource usage

### Development

- Test in staging environment first
- Implement proper error handling
- Follow our deployment guidelines
- Keep dependencies updated

## SDKs and Tools

| Language                    | Package           |
| --------------------------- | ----------------- |
| [Node.js](../sdk/nodejs.md) | `@nexlayer/sdk`   |
| [Python](../sdk/python.md)  | `nexlayer-python` |
| [Go](../sdk/go.md)          | `nexlayer-go`     |

## Need Help?

[Contact us](mailto:support@nexlayer.com) (support@nexlayer.com)
