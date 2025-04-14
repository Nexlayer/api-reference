const { NexlayerClient } = require('@nexlayer/sdk');

// Initialize the client
const client = new NexlayerClient({
  // Load token from environment variable
  sessionToken: process.env.NEXLAYER_SESSION_TOKEN
});

async function deployApplication() {
  try {
    // Example YAML configuration
    const yamlConfig = `
application:
  name: my-ai-app
  pods:
    - name: webapp
      image: "your-username/my-app:v1.0.0"
      path: "/"
      servicePorts:
        - 3000
    `;

    // Start the deployment
    const deployment = await client.startDeployment(yamlConfig);
    console.log('Deployment started:', deployment.url);

    // Monitor pod status
    const status = await client.getPodsStatus(deployment.applicationName);
    console.log('Pod status:', status.pods);

    // Extend deployment if needed
    const extension = await client.extendDeployment(deployment.applicationName);
    console.log('Deployment extended:', extension.message);
  } catch (error) {
    console.error('Deployment error:', error.message);
    process.exit(1);
  }
}

deployApplication(); 