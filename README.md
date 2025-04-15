# Nexlayer API Reference

Welcome to the Nexlayer API Reference Documentation! This repository contains comprehensive documentation for the Nexlayer AI Cloud Platform API.

Nexlayer is a product of AuditDeploy Inc., an applied research lab working on automating AI product deployment. We're building the deployer of the future—an AI agent that can take any codebase and turn it into a live, scalable product in seconds.

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

## Support

For support or security concerns, contact our team:

- General Support: support@nexlayer.com
- Security Issues: security@nexlayer.com
- Documentation: https://docs.nexlayer.io

## License & Usage

This API documentation is proprietary and protected by copyright.

You may reference this documentation to build on the Nexlayer platform. Reuse, redistribution, or derivative work is not permitted.

See [`NOTICE.md`](./NOTICE.md) for full usage terms. 
