from nexlayer import NexlayerClient
import os

def deploy_application():
    try:
        # Initialize client with token from environment
        client = NexlayerClient(
            session_token=os.environ['NEXLAYER_SESSION_TOKEN']
        )

        # Example YAML configuration
        yaml_config = """
application:
  name: my-ai-app
  pods:
    - name: webapp
      image: "your-username/my-app:v1.0.0"
      path: "/"
      servicePorts:
        - 3000
        """

        # Start the deployment
        deployment = client.start_deployment(yaml_config)
        print(f"Deployment started: {deployment.url}")

        # Monitor pod status
        status = client.get_pods_status(deployment.application_name)
        print(f"Pod status: {status.pods}")

        # Extend deployment if needed
        extension = client.extend_deployment(deployment.application_name)
        print(f"Deployment extended: {extension.message}")

    except Exception as e:
        print(f"Deployment error: {str(e)}")
        exit(1)

if __name__ == "__main__":
    deploy_application() 