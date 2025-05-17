# Nexlayer API Reference

Welcome to the official Nexlayer API Reference. Nexlayer empowers you to build, deploy, and manage AI-powered applications at scale with a simple, secure, and robust API.

## Contents

- [Introduction](#introduction)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Deployments](#deployments)
  - [Reservations](#reservations)
  - [Validation & Schema](#validation--schema)
  - [Feedback](#feedback)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Support](#support)

## Introduction

Nexlayer's API empowers developers to programmatically deploy, manage, and scale AI applications in production environments. Our platform abstracts away the complexity of infrastructure management, allowing you to focus on what matters most: your application's capabilities.


## 🚀 Quickstart

Deploy your first AI application in seconds:

```bash
curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @nexlayer.yaml
```

> **What is `nexlayer.yaml`?**
>
> Your deployment configuration is defined in a simple YAML file. Learn how to write one in the [Nexlayer Deployment YAML Guide](https://github.com/Nexlayer/nexlayer-deployment-yaml).

- See [Nexlayer Deployment YAML Guide](https://github.com/Nexlayer/nexlayer-deployment-yaml) for full configuration options and best practices.

---

### Base URL

```
https://app.nexlayer.io
```

### Content Types

- For YAML deployments: `text/x-yaml`
- For JSON requests: `application/json`

## Authentication

All Nexlayer API requests are authenticated using a session token. Your session token is provided upon successful deployment initiation and should be included in all subsequent requests.

**Security Notice:** Treat your session token as sensitive data. Store it securely and never expose it in client-side code or public repositories.

### Session Token Lifecycle

- **Creation**: Automatically generated when you start a deployment
- **Expiration**: 24 hours from creation or last extension
- **Renewal**: Use the `/extendDeployment` endpoint to extend your session

## API Endpoints

### Deployments

#### Start a Deployment

Creates and launches a new deployment based on your configuration.

```
POST /startUserDeployment
```

**Request Headers:**

| Header          | Value          | Description                    |
|-----------------|----------------|--------------------------------|
| `Content-Type`  | `text/x-yaml`  | YAML configuration file format |

**Request Body:**

Upload your `nexlayer.yaml` configuration file directly. For details on creating your configuration file, see the [Nexlayer YAML Guide](https://github.com/Nexlayer/nexlayer-deployment-yaml).

**Example Request:**

```bash
curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @nexlayer.yaml
```

**Response:**

```json
{
  "message": "Deployment started successfully",
  "url": "https://fantastic-fox-my-mern-app.alpha.nexlayer.ai",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0",
  "applicationName": "My Mern App",
  "status": {
    "environment": "Initializing deployment environment"
  },
  "extend": {
    "message": "Your deployment will expire in 120 minutes. You can extend it up to 3 times.",
    "extendURL": "curl -X POST https://app.nexlayer.io/extendDeployment -H \"Content-Type: application/json\" -d '{\"applicationName\":\"My Mern App\",\"sessionToken\":\"nx_tkn_f8a9b2c3d4e5f6g7h8i9j0\"}'"
  },
  "claim": {
    "message": "Claim this deployment to make it permanent",
    "claimURL": "curl -X POST https://app.nexlayer.io/claimDeployment -H \"Content-Type: application/json\" -d '{\"applicationName\":\"My Mern App\",\"sessionToken\":\"nx_tkn_f8a9b2c3d4e5f6g7h8i9j0\"}'"
  },
  "info": "Your application is being deployed and will be available shortly"
}
```

#### Extend a Deployment

Extends the lifetime of an existing deployment to prevent automatic cleanup.

```
POST /extendDeployment
```

**Request Headers:**

| Header          | Value             | Description          |
|-----------------|-------------------|----------------------|
| `Content-Type`  | `application/json`| JSON request format  |

**Request Body:**

```json
{
  "applicationName": "My Mern App",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}
```

**Example Request:**

```bash
curl -X POST "https://app.nexlayer.io/extendDeployment" \
  -H "Content-Type: application/json" \
  -d '{"applicationName": "My Mern App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'
```

**Response:**

```json
{
  "message": "Application My MERN App has been extended. Environment will expire in 120 minutes. 2 extension(s) remaining."
}
```

#### Claim a Deployment

Converts a temporary deployment into a permanent one associated with your account.

```
POST /claimDeployment
```

**Request Headers:**

| Header          | Value             | Description          |
|-----------------|-------------------|----------------------|
| `Content-Type`  | `application/json`| JSON request format  |

**Request Body:**

```json
{
  "applicationName": "My Mern App",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}
```

**Example Request:**

```bash
curl -X POST "https://app.nexlayer.io/claimDeployment" \
  -H "Content-Type: application/json" \
  -d '{"applicationName": "My Mern App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'
```

**Response:**

```json
{
  "message": "You're almost there! Visit https://app.nexlayer.io/claim/nx_claim_a1b2c3d4e5 to finalize your deployment.",
  "claimURL": "https://app.nexlayer.io/claim/nx_claim_a1b2c3d4e5",
  "claimToken": "nx_claim_a1b2c3d4e5"
}
```

**Note:** After receiving the claim token, you must visit the provided URL or use the token within 30 minutes to finalize the claim process.

### Reservations

#### Add a Deployment Reservation

Reserves a deployment to prevent automatic cleanup.

```
POST /addDeploymentReservation
```

**Request Headers:**

| Header          | Value             | Description          |
|-----------------|-------------------|----------------------|
| `Content-Type`  | `application/json`| JSON request format  |

**Request Body:**

```json
{
  "applicationName": "My Mern App",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}
```

**Example Request:**

```bash
curl -X POST "https://app.nexlayer.io/addDeploymentReservation" \
  -H "Content-Type: application/json" \
  -d '{"applicationName": "My Mern App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'
```

**Response:**

```json
{
  "message": "Application My MERN App reservation has been added."
}
```

#### Remove a Deployment Reservation

Removes a reservation from a deployment, allowing it to be cleaned up automatically.

```
POST /removeDeploymentReservation
```

**Request Headers:**

| Header          | Value             | Description          |
|-----------------|-------------------|----------------------|
| `Content-Type`  | `application/json`| JSON request format  |

**Request Body:**

```json
{
  "applicationName": "My Mern App",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}
```

**Example Request:**

```bash
curl -X POST "https://app.nexlayer.io/removeDeploymentReservation" \
  -H "Content-Type: application/json" \
  -d '{"applicationName": "My Mern App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'
```

**Response:**

```json
{
  "message": "Application My MERN App reservation has been removed. Application site will be removed within the next 10 minutes."
}
```

#### Remove All Reservations

Removes all reservations associated with your session token.

```
POST /removeReservations
```

**Request Headers:**

| Header          | Value             | Description          |
|-----------------|-------------------|----------------------|
| `Content-Type`  | `application/json`| JSON request format  |

**Request Body:**

```json
{
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}
```

**Example Request:**

```bash
curl -X POST "https://app.nexlayer.io/removeReservations" \
  -H "Content-Type: application/json" \
  -d '{"sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'
```

**Response:**

```json
{
  "message": "All reservations have been removed. Application sites will be removed within the next 10 minutes."
}
```

#### Get All Reservations

Retrieves all active reservations associated with your session token.

```
GET /getReservations?sessionToken={YOUR_SESSION_TOKEN}
```

**Example Request:**

```bash
curl -X GET "https://app.nexlayer.io/getReservations?sessionToken=nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
```

**Response:**

```json
{
  "reservedDeployments": [
    {
      "applicationName": "My Mern App",
      "url": "https://fantastic-fox-my-mern-app.alpha.nexlayer.ai"
    },
    {
      "applicationName": "My Python Service",
      "url": "https://graceful-gazelle-my-python-service.alpha.nexlayer.ai"
    }
  ]
}
```

### Validation & Schema

#### Get Schema

API endpoint that returns the JSON Schema for defining container-based application deployments on the Nexlayer AI Cloud Platform.

**Endpoint:**
```
GET /schema
```

**Response:**
Returns a JSON Schema document that validates Nexlayer application deployment configurations.

**Schema Structure:**

| Field              | Type    | Description                                         |
|--------------------|---------|-----------------------------------------------------|
| `$schema`          | string  | JSON Schema draft version                           |
| `title`            | string  | "Nexlayer YAML Schema"                             |
| `description`      | string  | Human-readable description of the schema purpose     |
| `type`             | string  | "object"                                           |
| `required`         | array   | Required top-level properties (["application"])    |
| `additionalProperties` | boolean | Whether additional properties are allowed         |
| `properties`       | object  | Schema properties definition                        |

**Top-Level Structure:**

The schema validates YAML/JSON documents with the following structure:

```yaml
application:
  name: my-application-name
  url: optional-production-url.com
  registryLogin:  # Optional, for private images
    registry: ghcr.io
    username: your-username
    personalAccessToken: your-token
  pods:
    - name: pod-name
      image: container-image:tag
      path: /url-path  # Optional
      servicePorts: [80]
      # Additional pod configuration...
```

**Key Components**

#### Application Object

| Property        | Type   | Required | Description                                 |
|----------------|--------|----------|---------------------------------------------|
| `name`         | string | Yes      | Globally unique application identifier      |
| `url`          | string | No       | Custom domain for production deployments    |
| `registryLogin`| object | No       | Authentication for private registries       |
| `pods`         | array  | Yes      | List of containerized services              |

#### Pod Object

| Property      | Type   | Required | Description                                 |
|--------------|--------|----------|---------------------------------------------|
| `name`       | string | Yes      | Unique pod identifier                       |
| `image`      | string | Yes      | Docker image reference                      |
| `path`       | string | No       | URL route for web-facing pods               |
| `servicePorts`| array | Yes      | Port numbers exposed by the pod             |
| `vars`       | object | No       | Environment variables                       |
| `volumes`    | array  | No       | Persistent storage configurations           |
| `secrets`    | array  | No       | Secure storage for sensitive data           |
| `entrypoint` | string | No       | Override container entrypoint               |
| `command`    | string | No       | Override container command                  |

**Example Usage:**

```yaml
application:
  name: fullstack-app
  pods:
    - name: frontend
      image: my-react-app:latest
      path: /
      servicePorts: [3000]
      vars:
        API_URL: http://api.pod:8000
    - name: api
      image: my-api:latest
      servicePorts: [8000]
      vars:
        DATABASE_URL: postgresql://user:password@db.pod:5432/mydb
    - name: db
      image: postgres:14
      servicePorts: [5432]
      vars:
        POSTGRES_USER: user
        POSTGRES_PASSWORD: password
        POSTGRES_DB: mydb
      volumes:
        - name: postgres-data
          size: 1Gi
          mountPath: /var/lib/postgresql
```

**Notes:**
- At least one pod must include the `path` field
- For PostgreSQL containers, do NOT mount volumes directly to `/var/lib/postgresql/data`
- Use the `<% REGISTRY %>` template with private images

#### Validate Configuration

Validates a `nexlayer.yaml` file without deploying it.

```
POST /validate
```

**Request Headers:**

| Header          | Value             | Description          |
|-----------------|-------------------|----------------------|
| `Content-Type`  | `application/json`| JSON request format  |

**Request Body:**

Your nexlayer application configuration as a JSON object.

**Example Request:**

```bash
curl -X POST "https://app.nexlayer.io/validate" \
  -H "Content-Type: application/json" \
  -d '{"application": {...}}'
```

**Response:**

```json
{
  "message": "Nexlayer YAML file is valid."
}
```

Or if invalid:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": "application.services[0].image",
      "message": "Required field missing"
    }
  ]
}
```

### Feedback

#### Send Feedback

Sends feedback about your Nexlayer experience.

```
POST /feedback
```

**Request Headers:**

| Header          | Value             | Description          |
|-----------------|-------------------|----------------------|
| `Content-Type`  | `application/json`| JSON request format  |

**Request Body:**

```json
{
  "text": "Your detailed feedback message here"
}
```

**Example Request:**

```bash
curl -X POST "https://app.nexlayer.io/feedback" \
  -H "Content-Type: application/json" \
  -d '{"text": "I love how easy it is to deploy my AI models with Nexlayer!"}'
```

**Response:**

```json
{
  "message": "Thank you for your feedback!"
}
```

## Error Handling

Nexlayer uses standard HTTP status codes along with detailed error messages:

| Status Code | Description                                           |
|-------------|-------------------------------------------------------|
| 200         | Success                                               |
| 400         | Bad Request - Check your request parameters or format |
| 401         | Unauthorized - Invalid or expired session token       |
| 403         | Forbidden - Insufficient permissions                  |
| 404         | Not Found - Resource does not exist                   |
| 429         | Too Many Requests - Rate limit exceeded               |
| 500         | Internal Server Error - Please contact support        |

**Error Response Format:**

```json
{
  "error": "A descriptive error message",
  "code": "ERROR_CODE",
  "details": [
    {
      "field": "fieldName",
      "message": "Specific error about this field"
    }
  ]
}
```

## Rate Limits

To ensure service stability, Nexlayer implements the following rate limits:

| Endpoint              | Rate Limit                           |
|-----------------------|--------------------------------------|
| `/startUserDeployment`| 10 requests per minute               |
| `/extendDeployment`   | 5 requests per minute                |
| `/claimDeployment`    | 5 requests per minute                |
| Other endpoints       | 60 requests per minute               |

When rate limits are exceeded, the API returns a `429 Too Many Requests` status code. Implement exponential backoff in your clients for optimal handling.

## Best Practices

### Security

- Store session tokens securely, never in client-side code or public repositories
- Use HTTPS for all requests to Nexlayer API
- Implement proper error handling in your applications
- Rotate session tokens regularly for production deployments

### Performance

- Validate your YAML files before deployment to catch errors early
- Keep track of your deployment lifecycle to extend or claim before expiration
- Implement caching for frequently accessed resources
- Use asynchronous processing for deployment operations

### Deployment

- Follow the principle of immutable infrastructure: recreate deployments rather than modifying them
- Use semantic versioning for your applications
- Implement proper logging and monitoring for your deployments
- Test your deployments in a staging environment before production

## Examples

### Complete Deployment Workflow

This example demonstrates a complete workflow from deployment to claiming:

```bash
# 1. Start a deployment
SESSION_INFO=$(curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @nexlayer.yaml)

# 2. Extract session token and app name
SESSION_TOKEN=$(echo $SESSION_INFO | jq -r .sessionToken)
APP_NAME=$(echo $SESSION_INFO | jq -r .applicationName)

# 3. Wait for deployment to complete
echo "Deployment started at: $(echo $SESSION_INFO | jq -r .url)"
echo "Waiting for deployment to complete..."
sleep 30

# 4. Extend the deployment
curl -X POST "https://app.nexlayer.io/extendDeployment" \
  -H "Content-Type: application/json" \
  -d "{\"applicationName\": \"$APP_NAME\", \"sessionToken\": \"$SESSION_TOKEN\"}"

# 5. Claim the deployment
CLAIM_INFO=$(curl -X POST "https://app.nexlayer.io/claimDeployment" \
  -H "Content-Type: application/json" \
  -d "{\"applicationName\": \"$APP_NAME\", \"sessionToken\": \"$SESSION_TOKEN\"}")

echo "Visit this URL to claim your deployment: $(echo $CLAIM_INFO | jq -r .claimURL)"
```

### Managing Multiple Deployments

This example shows how to work with multiple deployments:

```bash
# 1. Start multiple deployments
curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @app1.yaml

curl -X POST "https://app.nexlayer.io/startUserDeployment" \
  -H "Content-Type: text/x-yaml" \
  --data-binary @app2.yaml

# 2. List all your active reservations
curl -X GET "https://app.nexlayer.io/getReservations?sessionToken=$SESSION_TOKEN"

# 3. Remove specific reservations
curl -X POST "https://app.nexlayer.io/removeDeploymentReservation" \
  -H "Content-Type: application/json" \
  -d "{\"applicationName\": \"App1\", \"sessionToken\": \"$SESSION_TOKEN\"}"

# 4. Remove all reservations when done
curl -X POST "https://app.nexlayer.io/removeReservations" \
  -H "Content-Type: application/json" \
  -d "{\"sessionToken\": \"$SESSION_TOKEN\"}"
```

## Support

If you need assistance with the Nexlayer API:

- **Documentation**: [https://docs.nexlayer.com](https://docs.nexlayer.com)
- **Email Support**: [support@nexlayer.com](mailto:support@nexlayer.com)
- **Security Issues**: [security@nexlayer.com](mailto:security@nexlayer.com)
- **Community Forum**: [https://community.nexlayer.com](https://community.nexlayer.com)
- **Feedback & Issues**: [GitHub Issues](https://github.com/Nexlayer/api-reference/issues)

---

© 2025 AuditDeploy Inc. All rights reserved. Nexlayer is a registered trademark of AuditDeploy Inc.
