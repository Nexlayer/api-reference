# Python SDK

The Nexlayer Python SDK provides a simple and intuitive way to interact with the Nexlayer API from your Python applications.

## Installation

```bash
pip install nexlayer-python
```

## Quick Start

```python
from nexlayer import NexlayerClient

# Initialize the client
client = NexlayerClient()

# Start a deployment
def start_deployment():
    try:
        yaml_config = """
        application:
          name: My MERN App
          environment: production
          resources:
            cpu: 1
            memory: 2Gi
        """

        deployment = client.start_deployment(yaml_config)
        print('Deployment started:', deployment.url)
        
        # Store the session token for future requests
        session_token = deployment.session_token
        
        # Check pod status
        pods = client.get_pods_status('My MERN App')
        print('Pod status:', pods)
        
        # Extend deployment if needed
        extension = client.extend_deployment('My MERN App')
        print('Deployment extended:', extension.message)
    except Exception as e:
        print('Error:', str(e))

start_deployment()
```

## API Reference

### Constructor

```python
client = NexlayerClient(
    base_url='https://app.nexlayer.io',  # Optional
    timeout=30,  # Optional, defaults to 30 seconds
    session_token=None  # Optional, can be set later
)
```

### Methods

#### start_deployment(yaml_config)

Starts a new deployment using a YAML configuration.

```python
deployment = client.start_deployment(yaml_config)
```

Parameters:
- `yaml_config` (str): YAML configuration for the deployment

Returns:
```python
{
    'message': str,
    'url': str,
    'session_token': str,
    'application_name': str,
    'status': {
        'environment': str
    },
    'extend': {
        'message': str,
        'extend_url': str
    },
    'claim': {
        'message': str,
        'claim_url': str
    },
    'info': str
}
```

#### get_pods_status(application_name)

Gets the status of pods for a deployment.

```python
pods = client.get_pods_status('My MERN App')
```

Parameters:
- `application_name` (str): Name of the application

Returns:
```python
{
    'pods': [
        {
            'name': str,
            'status': str
        }
    ]
}
```

#### extend_deployment(application_name)

Extends the duration of a deployment.

```python
extension = client.extend_deployment('My MERN App')
```

Parameters:
- `application_name` (str): Name of the application

Returns:
```python
{
    'message': str
}
```

## Error Handling

The SDK uses Python's built-in exception handling:

```python
from nexlayer import NexlayerError

try:
    deployment = client.start_deployment(yaml_config)
except NexlayerError as e:
    print(f'Error: {e.message}')
    print(f'Code: {e.code}')
```

Common error codes:
- `INVALID_TOKEN`: Invalid session token
- `TOKEN_EXPIRED`: Session token has expired
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INVALID_YAML`: Invalid YAML configuration

## Best Practices

1. **Session Token Management**
   ```python
   # Store token securely
   import os
   from dotenv import load_dotenv
   
   load_dotenv()
   client = NexlayerClient(session_token=os.getenv('NEXLAYER_SESSION_TOKEN'))
   ```

2. **Error Handling**
   ```python
   try:
       deployment = client.start_deployment(yaml_config)
   except NexlayerError as e:
       if e.code == 'TOKEN_EXPIRED':
           # Handle token expiration
           pass
       elif e.code == 'RATE_LIMIT_EXCEEDED':
           # Implement retry logic
           pass
   ```

3. **Resource Cleanup**
   ```python
   from contextlib import contextmanager
   
   @contextmanager
   def deployment_session():
       try:
           deployment = client.start_deployment(yaml_config)
           yield deployment
       finally:
           # Cleanup if needed
           pass
   ```

## Examples

### Complete Deployment Flow

```python
from nexlayer import NexlayerClient
import time

def deploy_application():
    client = NexlayerClient()
    
    # Start deployment
    deployment = client.start_deployment(yaml_config)
    print(f'Deployment started: {deployment.url}')
    
    # Wait for pods to be ready
    while True:
        pods = client.get_pods_status(deployment.application_name)
        if all(pod['status'] == 'running' for pod in pods['pods']):
            break
        time.sleep(5)
    
    # Extend deployment
    extension = client.extend_deployment(deployment.application_name)
    print(f'Deployment extended: {extension.message}')
    
    return deployment

# Run deployment
deployment = deploy_application()
```

### Environment Configuration

```python
from nexlayer import NexlayerClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure client
client = NexlayerClient(
    base_url=os.getenv('NEXLAYER_API_URL', 'https://app.nexlayer.io'),
    timeout=int(os.getenv('NEXLAYER_TIMEOUT', '30')),
    session_token=os.getenv('NEXLAYER_SESSION_TOKEN')
)
```

## Support

For issues and feature requests, please contact:
- Email: support@nexlayer.com
- Documentation: https://docs.nexlayer.io 