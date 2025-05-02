# PowerShell script for checking the health of StormMatrix-Kanban services
# Created on: May 2, 2025

Write-Host "=== StormMatrix-Kanban System Health Check ===" -ForegroundColor Blue
Write-Host "Date: $(Get-Date)"
Write-Host "--------------------------------------------"

# Function to check a single service health
function Check-Service {
    param (
        [string]$serviceName,
        [string]$port
    )
    
    Write-Host "`nChecking $serviceName..." -ForegroundColor Yellow
    
    # Check if the service container is running
    $containerStatus = docker ps --filter "name=stormmatrix-$serviceName" --format "{{.Status}}"
    
    if ([string]::IsNullOrEmpty($containerStatus)) {
        Write-Host "Container stormmatrix-$serviceName is not running" -ForegroundColor Red
        return
    } else {
        Write-Host "Container status: $containerStatus" -ForegroundColor Green
    }
    
    # Check the ping endpoint
    try {
        $pingResponse = Invoke-WebRequest -Uri "http://localhost:$port/api/v1/health/ping" -ErrorAction SilentlyContinue
        
        if ($pingResponse.StatusCode -eq 200) {
            Write-Host "Health ping: OK (200)" -ForegroundColor Green
            Write-Host "Response details:" -ForegroundColor Cyan
            $pingResponse.Content | ConvertFrom-Json | Format-List
        } else {
            Write-Host "Health ping: FAILED ($($pingResponse.StatusCode))" -ForegroundColor Red
        }
    } catch {
        Write-Host "Health ping: FAILED (Connection error)" -ForegroundColor Red
    }
    
    # Check detailed health endpoint (this might fail for some services as it checks DB)
    try {
        $healthResponse = Invoke-WebRequest -Uri "http://localhost:$port/api/v1/health" -ErrorAction SilentlyContinue
        
        if ($healthResponse.StatusCode -eq 200) {
            Write-Host "Detailed health check: OK (200)" -ForegroundColor Green
        } else {
            Write-Host "Detailed health check: $($healthResponse.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Detailed health check: FAILED (This might be normal if DB connection is configured differently)" -ForegroundColor Yellow
    }
    
    Write-Host "--------------------------------------------"
}

# Check all individual services
Check-Service -serviceName "auth-service" -port "3001"
Check-Service -serviceName "user-service" -port "3002"
Check-Service -serviceName "board-service" -port "3003"
Check-Service -serviceName "notification-service" -port "3004"
Check-Service -serviceName "file-service" -port "3005"

# Check system-wide diagnostics
Write-Host "`nChecking system-wide diagnostics..." -ForegroundColor Yellow
try {
    $diagResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/v1/health/diagnostic" -ErrorAction SilentlyContinue
    
    if ($diagResponse.StatusCode -eq 200) {
        Write-Host "System diagnostic: OK (200)" -ForegroundColor Green
        Write-Host "Diagnostic Details:" -ForegroundColor Yellow
        $diagData = $diagResponse.Content | ConvertFrom-Json
        
        Write-Host "`nServices Status:" -ForegroundColor Cyan
        $diagData.services | Format-Table service, status
        
        Write-Host "`nEndpoints Status:" -ForegroundColor Cyan
        $diagData.endpoints | Format-Table endpoint, status, statusCode
    } else {
        Write-Host "System diagnostic: FAILED ($($diagResponse.StatusCode))" -ForegroundColor Red
    }
} catch {
    Write-Host "System diagnostic: FAILED (Connection error)" -ForegroundColor Red
}

# Check nginx status
Write-Host "`nChecking nginx gateway..." -ForegroundColor Yellow
$nginxStatus = docker ps --filter "name=stormmatrix-nginx" --format "{{.Status}}"

if ([string]::IsNullOrEmpty($nginxStatus)) {
    Write-Host "Nginx gateway is not running" -ForegroundColor Red
} else {
    Write-Host "Nginx gateway status: $nginxStatus" -ForegroundColor Green
    
    # Check if frontend is accessible
    try {
        $frontendResponse = Invoke-WebRequest -Uri "http://localhost" -ErrorAction SilentlyContinue
        
        if ($frontendResponse.StatusCode -eq 200) {
            Write-Host "Frontend access: OK (200)" -ForegroundColor Green
        } else {
            Write-Host "Frontend access: FAILED ($($frontendResponse.StatusCode))" -ForegroundColor Red
        }
    } catch {
        Write-Host "Frontend access: FAILED (Connection error)" -ForegroundColor Red
    }
}

Write-Host "`n=== Health check complete ===" -ForegroundColor Blue