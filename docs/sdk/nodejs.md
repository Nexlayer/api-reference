# Node.js SDK

The Nexlayer Node.js SDK provides a simple and intuitive way to interact with the Nexlayer API from your Node.js applications.

## Installation

```bash
npm install @nexlayer/sdk
```

## Quick Start

```javascript
const { NexlayerClient } = require('@nexlayer/sdk');

// Initialize the client
const client = new NexlayerClient();

// Start a deployment
async function startDeployment() {
  try {
    const yamlConfig = `
      application:
        name: My MERN App
        environment: production
        resources:
          cpu: 1
          memory: 2Gi
    `;

    const deployment = await client.startDeployment(yamlConfig);
    console.log('Deployment started:', deployment.url);
    
    // Store the session token for future requests
    const sessionToken = deployment.sessionToken;
    
    // Check pod status
    const pods = await client.getPodsStatus('My MERN App');
    console.log('Pod status:', pods);
    
    // Extend deployment if needed
    const extension = await client.extendDeployment('My MERN App');
    console.log('Deployment extended:', extension.message);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

startDeployment();
```

## API Reference

### Constructor

```javascript
const client = new NexlayerClient({
  baseURL: 'https://app.nexlayer.io', // Optional
  timeout: 30000, // Optional, defaults to 30 seconds
});
```

### Methods

#### startDeployment(yamlConfig)

Starts a new deployment using a YAML configuration.

```javascript
const deployment = await client.startDeployment(yamlConfig);
```

Parameters:
- `yamlConfig` (string): YAML configuration for the deployment

Returns:
```javascript
{
  message: string,
  url: string,
  sessionToken: string,
  applicationName: string,
  status: {
    environment: string
  },
  extend: {
    message: string,
    extendURL: string
  },
  claim: {
    message: string,
    claimURL: string
  },
  info: string
}
```

#### getPodsStatus(applicationName)

Gets the status of pods for a deployment.

```javascript
const pods = await client.getPodsStatus('My MERN App');
```

Parameters:
- `applicationName` (string): Name of the application

Returns:
```javascript
{
  pods: [
    {
      name: string,
      status: 'running' | 'pending' | 'failed' | 'unknown'
    }
  ]
}
```

#### extendDeployment(applicationName)

Extends the duration of a deployment.

```javascript
const extension = await client.extendDeployment('My MERN App');
```

Parameters:
- `applicationName` (string): Name of the application

Returns:
```javascript
{
  message: string
}
```

#### sendFeedback(text)

Sends feedback about the platform.

```javascript
await client.sendFeedback('Great platform, very easy to use!');
```

Parameters:
- `text` (string): Feedback text

## Error Handling

The SDK throws errors with detailed information:

```javascript
try {
  await client.startDeployment(yamlConfig);
} catch (error) {
  if (error.code === 'INVALID_TOKEN') {
    console.error('Invalid session token');
  } else if (error.code === 'TOKEN_EXPIRED') {
    console.error('Session token has expired');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## Best Practices

1. **Error Handling**
   ```javascript
   const client = new NexlayerClient();
   
   client.on('error', (error) => {
     console.error('API Error:', error);
   });
   ```

2. **Rate Limiting**
   ```javascript
   const client = new NexlayerClient({
     rateLimit: {
       maxRequests: 100,
       perMinute: 1
     }
   });
   ```

3. **Retries**
   ```javascript
   const client = new NexlayerClient({
     retries: 3,
     retryDelay: 1000
   });
   ```

## Examples

### Complete Application

```javascript
const { NexlayerClient } = require('@nexlayer/sdk');

class DeploymentManager {
  constructor() {
    this.client = new NexlayerClient();
    this.sessionToken = null;
  }

  async deployApplication(name, config) {
    try {
      // Start deployment
      const deployment = await this.client.startDeployment(config);
      this.sessionToken = deployment.sessionToken;
      
      // Monitor pods
      await this.monitorPods(name);
      
      return deployment;
    } catch (error) {
      console.error('Deployment failed:', error);
      throw error;
    }
  }

  async monitorPods(name) {
    const maxAttempts = 10;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const pods = await this.client.getPodsStatus(name);
      
      if (pods.pods.every(pod => pod.status === 'running')) {
        console.log('All pods are running!');
        return;
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    throw new Error('Pods failed to start in time');
  }
}

// Usage
const manager = new DeploymentManager();

const config = `
  application:
    name: My MERN App
    environment: production
    resources:
      cpu: 1
      memory: 2Gi
`;

manager.deployApplication('My MERN App', config)
  .then(deployment => console.log('Deployment successful:', deployment.url))
  .catch(error => console.error('Deployment failed:', error));
```

## Support

Need help? [Contact us](mailto:support@nexlayer.com) (support@nexlayer.com) 