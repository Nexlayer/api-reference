# Nexlayer Go Example

This example demonstrates how to deploy an application to Nexlayer using Go.

## Prerequisites
- Go 1.16 or newer
- A valid `nexlayer.yaml` configuration file in this directory

## Usage

1. Build the example:
   ```bash
   go build -o deploy deployment.go
   ```
2. Run the deployment script:
   ```bash
   ./deploy
   ```

The script will:
- Read your `nexlayer.yaml` file
- POST it to the Nexlayer API
- Print the deployment URL and session token from the response

## Example Output
```
Deployment started successfully!
URL: https://fantastic-fox-my-mern-app.alpha.nexlayer.ai
Session Token: nx_tkn_f8a9b2c3d4e5f6g7h8i9j0
```

For more information, see the [Nexlayer YAML Guide](https://github.com/Nexlayer/nexlayer-deployment-yaml). 