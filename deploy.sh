#!/bin/bash

# Step 1: Run npm build
echo "Running npm build..."
npm run build

# Step 2: upload to the server
echo "Upload started..."
scp -i ~/.ssh/id_rsa.pem  -r ./dist azureuser@13.71.41.129:be-build

echo "Uploaded! Happy hacking!"