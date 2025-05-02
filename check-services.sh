#!/bin/bash
# Script for checking the health of StormMatrix-Kanban services
# Created on: May 2, 2025

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== StormMatrix-Kanban System Health Check ===${NC}"
echo "Date: $(date)"
echo "--------------------------------------------"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}Warning: jq is not installed. JSON output will not be formatted.${NC}"
    JQ_AVAILABLE=false
else
    JQ_AVAILABLE=true
fi

# Function to check a single service health
check_service() {
    local service_name=$1
    local port=$2
    echo -e "\n${YELLOW}Checking $service_name...${NC}"
    
    # Check if the service container is running
    container_status=$(docker ps --filter "name=stormmatrix-$service_name" --format "{{.Status}}")
    
    if [[ -z "$container_status" ]]; then
        echo -e "${RED}Container stormmatrix-$service_name is not running${NC}"
        return 1
    else
        echo -e "${GREEN}Container status: $container_status${NC}"
    fi
    
    # Check the ping endpoint
    ping_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port/api/v1/health/ping)
    
    if [[ "$ping_response" == "200" ]]; then
        echo -e "${GREEN}Health ping: OK (200)${NC}"
        # Get and display service details
        if [ "$JQ_AVAILABLE" = true ]; then
            curl -s http://localhost:$port/api/v1/health/ping | jq .
        else
            curl -s http://localhost:$port/api/v1/health/ping
        fi
    else
        echo -e "${RED}Health ping: FAILED ($ping_response)${NC}"
    fi
    
    # Check detailed health endpoint (this might fail for some services as it checks DB)
    health_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port/api/v1/health)
    
    if [[ "$health_response" == "200" ]]; then
        echo -e "${GREEN}Detailed health check: OK (200)${NC}"
    else
        echo -e "${YELLOW}Detailed health check: $health_response (This might be normal if the database connection is configured differently)${NC}"
    fi
    
    echo "--------------------------------------------"
}

# Check all individual services
check_service "auth-service" "3001"
check_service "user-service" "3002" 
check_service "board-service" "3003"
check_service "notification-service" "3004"
check_service "file-service" "3005"

# Check system-wide diagnostics
echo -e "\n${YELLOW}Checking system-wide diagnostics...${NC}"
diag_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/v1/health/diagnostic)

if [[ "$diag_response" == "200" ]]; then
    echo -e "${GREEN}System diagnostic: OK (200)${NC}"
    echo -e "${YELLOW}Diagnostic Details:${NC}"
    if [ "$JQ_AVAILABLE" = true ]; then
        curl -s http://localhost:3001/api/v1/health/diagnostic | jq .
    else
        curl -s http://localhost:3001/api/v1/health/diagnostic
    fi
else
    echo -e "${RED}System diagnostic: FAILED ($diag_response)${NC}"
fi

# Check nginx status
echo -e "\n${YELLOW}Checking nginx gateway...${NC}"
nginx_status=$(docker ps --filter "name=stormmatrix-nginx" --format "{{.Status}}")

if [[ -z "$nginx_status" ]]; then
    echo -e "${RED}Nginx gateway is not running${NC}"
else
    echo -e "${GREEN}Nginx gateway status: $nginx_status${NC}"
    
    # Check if frontend is accessible
    frontend_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
    
    if [[ "$frontend_response" == "200" ]]; then
        echo -e "${GREEN}Frontend access: OK (200)${NC}"
    else
        echo -e "${RED}Frontend access: FAILED ($frontend_response)${NC}"
    fi
fi

echo -e "\n${BLUE}=== Health check complete ===${NC}"