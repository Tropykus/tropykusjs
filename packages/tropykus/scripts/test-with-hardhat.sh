#!/bin/bash

# Script to run tests with Hardhat node
# This ensures Hardhat is running before tests execute

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Hardhat node...${NC}"

# Start Hardhat node in background (log to file for debugging)
npx hardhat node > hardhat.log 2>&1 &
HARDHAT_PID=$!

# Function to cleanup on exit
cleanup() {
    echo -e "${YELLOW}Stopping Hardhat node...${NC}"
    kill $HARDHAT_PID 2>/dev/null || true
    wait $HARDHAT_PID 2>/dev/null || true
}

# Register cleanup function
trap cleanup EXIT INT TERM

# Wait for Hardhat to be ready (check if port 8545 is listening)
echo -e "${YELLOW}Waiting for Hardhat node to be ready...${NC}"
for i in {1..30}; do
    if nc -z localhost 8545 2>/dev/null; then
        echo -e "${GREEN}Hardhat node is ready!${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}Hardhat node failed to start${NC}"
        exit 1
    fi
    sleep 1
done

# Deploy test contracts
echo -e "${YELLOW}Deploying test contracts...${NC}"
node scripts/deploy-test-contracts.js
if [ $? -ne 0 ]; then
    echo -e "${RED}Contract deployment failed${NC}"
    exit 1
fi

# Run the tests
echo -e "${YELLOW}Running tests...${NC}"
nyc mocha --recursive --exit

# Capture test exit code
TEST_EXIT_CODE=$?

# Cleanup will happen automatically via trap
exit $TEST_EXIT_CODE
