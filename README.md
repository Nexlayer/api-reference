# Nexlayer API Reference

Welcome to the Nexlayer API Reference Documentation! This repository contains comprehensive documentation for the Nexlayer AI Cloud Platform API.

## Overview

The Nexlayer API enables you to build and deploy AI-powered applications with ease. This documentation provides detailed information about:

- Authentication and security
- API endpoints and usage
- YAML configuration
- SDKs and tools
- Best practices and examples

## Quick Start

```bash
# Deploy your first AI application
curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @nexlayer.yaml
```

For detailed YAML configuration examples, visit our [Nexlayer Deployment YAML repository](https://github.com/Nexlayer/nexlayer-deployment-yaml).

## Repository Structure

- [`/docs`](docs/): Documentation files
  - [`/docs/api`](docs/api/): Core API documentation and endpoints
  - [`/docs/guides`](docs/guides/): In-depth guides and tutorials
- [`/examples`](examples/): Code examples and SDK implementations
  - [`/examples/node`](examples/node/): Node.js example with package.json
  - [`/examples/python`](examples/python/): Python example with requirements.txt
- [`/openapi`](openapi/): OpenAPI/Swagger specifications

## Authentication

All API requests require authentication using session tokens. You'll receive a session token when starting a deployment, which you'll use for subsequent requests. See our [Authentication Guide](docs/guides/authentication.md) for details.

## Rate Limits

- 100 requests per minute per token
- 1000 requests per hour per token
- Burst capacity of 200 requests

## Available SDKs

- Node.js: `@nexlayer/sdk`
- Python: `nexlayer-python`
- Go: `nexlayer-go`

## Support

For support or security concerns, contact our team:

- General Support: support@nexlayer.io
- Security Issues: security@nexlayer.io
- Documentation: https://docs.nexlayer.io

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details. 