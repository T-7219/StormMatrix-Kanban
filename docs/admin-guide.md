# StormMatrix Kanban - Administrator Guide

This guide provides information for system administrators to set up, configure, and maintain the StormMatrix Kanban application.

## System Requirements

### Minimum Hardware Requirements

- **CPU**: 2+ cores
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 20GB minimum for application and logs
- **Database**: Separate storage as needed for PostgreSQL data (starting with 10GB)

### Software Requirements

- **Operating System**: Linux (Ubuntu 20.04+, CentOS 8+) or Windows Server 2019+
- **Docker**: 20.10.x+
- **Docker Compose**: 2.x+
- **Nginx**: 1.24+ (if not using bundled version)
- **SSL Certificate**: Valid SSL certificate for your domain

## Installation

### Docker Installation (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/T-7219/StormMatrix-Kanban.git
cd StormMatrix-Kanban
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Edit the `.env` file with your configuration settings:
   - Database credentials
   - JWT secret
   - SMTP settings for email notifications
   - Optional Telegram bot token
   - Redis connection details
   - RabbitMQ connection details

4. Start the application:
```bash
docker-compose up -d
```

5. Verify all services are running:
```bash
docker-compose ps
```

### Manual Installation

For manual installation, please follow these steps:

1. Set up PostgreSQL database:
   - Create separate databases for each service (auth_db, board_db)
   - Configure user permissions

2. Set up Redis for caching and session management

3. Set up RabbitMQ for inter-service communication

4. Configure and start each microservice:
   - auth-service (port 3001)
   - user-service (port 3002)
   - board-service (port 3003)
   - notification-service (port 3004)
   - file-service (port 3005)

5. Configure Nginx as a reverse proxy with the provided configuration files

Detailed manual installation instructions can be found in the Development Guide.

## Initial Configuration

### First-time Setup

After installation:

1. Access the admin interface at `https://yourdomain.com/admin`
2. Login with the default credentials:
   - Username: `admin@example.com`
   - Password: The password specified in your `.env` file (default: "admin")
3. Change the default password immediately
4. Complete the initial setup steps:
   - Configure system email
   - Set up backup preferences
   - Review security settings

### Email Configuration

Configure email settings to allow the system to send notifications:

1. Go to "System Settings" > "Email Configuration"
2. Enter SMTP server details:
   - SMTP Host
   - SMTP Port
   - Username
   - Password
   - From Email
   - From Name
3. Send a test email to verify the configuration
4. Configure email templates if necessary

### Telegram Integration (Optional)

To enable Telegram notifications:

1. Create a Telegram bot via BotFather
2. Get the bot API token
3. Go to "System Settings" > "Integrations" > "Telegram Configuration" 
4. Enter the API token
5. Enable Telegram notifications
6. Configure notification templates

## User Management

### Creating New Users

1. Go to "User Management" > "Users"
2. Click "Add User"
3. Enter user details:
   - Email
   - Name
   - Password (or select "Send invitation")
   - Language preference (English, Russian, or German)
   - Role (User or Admin)
4. Click "Create"
5. The user will receive an email with login instructions

### Managing User Roles

1. Go to "User Management" > "Users"
2. Find and select a user
3. Click "Edit"
4. Change the role as needed:
   - **Admin**: Full system access
   - **User**: Regular user access
5. Click "Save"

### Deactivating Users

1. Go to "User Management" > "Users"
2. Find and select a user
3. Click "Deactivate"
4. Confirm the action
5. The user will no longer be able to log in

Note: Deactivated users can be reactivated later if needed by selecting the user and clicking "Activate".

## System Monitoring

### Health Checks

1. Go to "Monitoring" > "Health"
2. View the status of all services:
   - Database connections
   - Redis connection
   - RabbitMQ connection
   - Microservices status
3. Run a diagnostic check to get detailed information

### Logs

Access centralized logs through the ELK Stack:

1. Go to "Monitoring" > "Logs"
2. Use Kibana interface to search and filter logs:
   - Filter by service
   - Filter by log level
   - Search by keywords
   - View structured logs
3. Set up log retention policies in "System Settings" > "Logging"
4. Configure log rotation and archiving

### Metrics

Monitor system health and performance:

1. Go to "Monitoring" > "Metrics"
2. Access the Grafana dashboard
3. View key metrics:
   - CPU and memory usage for each service
   - API response times and request rates
   - Database query performance
   - Queue metrics for RabbitMQ
   - Redis cache hit/miss rates
4. Configure custom dashboards for specific monitoring needs

### Alerts

Configure alerts for system issues:

1. Go to "Monitoring" > "Alerts"
2. Set up alert rules:
   - High CPU/Memory usage (>80%)
   - Slow API responses (>2s)
   - Database connection problems
   - Error rate thresholds (>1%)
   - Service availability issues
3. Configure notification channels:
   - Email
   - SMS
   - Slack
   - Telegram
4. Set up escalation policies

## Backup and Recovery

### Database Backup

Configure automated backups:

1. Go to "System Settings" > "Backups"
2. Set backup schedule:
   - Frequency (daily, weekly)
   - Retention period (7 days, 30 days, etc.)
   - Storage location (local, S3, etc.)
3. Enable backup encryption if needed
4. Configure backup verification

### Manual Backup

Perform an immediate backup:

1. Go to "System Settings" > "Backups"
2. Click "Create Backup Now"
3. Select components to back up:
   - Database
   - File attachments
   - Configuration files
4. Wait for the backup to complete
5. Download the backup file if needed

### Recovery

To restore from a backup:

1. Go to "System Settings" > "Backups"
2. Select the backup file
3. Click "Restore"
4. Choose components to restore:
   - Database
   - File attachments
   - Configuration
5. Confirm the action

Note: Restoring from a backup will overwrite current data.

## Security Management

### SSL Configuration

1. Go to "System Settings" > "Security" > "SSL"
2. Upload SSL certificate and private key
3. Configure SSL settings:
   - Certificate chain
   - Key type
   - Protocols (TLS 1.2, 1.3)
4. Apply changes
5. Test SSL configuration

### Password Policies

Configure password requirements:

1. Go to "System Settings" > "Security" > "Password Policy"
2. Set password policies:
   - Minimum length (recommended: 10 characters)
   - Required character types (uppercase, lowercase, numbers, special)
   - Expiration period (90 days recommended)
   - History restrictions (prevent reuse of last 5 passwords)
   - Account lockout after failed attempts
3. Save changes

### Rate Limiting

Protect against abuse:

1. Go to "System Settings" > "Security" > "Rate Limiting"
2. Configure rate limiting:
   - General API requests per minute (default: 100)
   - Login attempt limits (default: 5 per minute)
   - API rate limits for specific endpoints
   - IP-based restrictions
3. Save changes
4. Monitor rate limit violations in the security logs

### Two-Factor Authentication

Manage system-wide 2FA settings:

1. Go to "System Settings" > "Security" > "Two-Factor Authentication"
2. Configure 2FA options:
   - Enable/disable system-wide
   - Require for admin accounts
   - Set TOTP parameters
   - Configure recovery options
3. Save changes

## System Maintenance

### Updates

Update the application:

1. Go to "System Settings" > "Updates"
2. Check for available updates
3. Review release notes and changelog
4. Schedule the update during low-usage hours
5. Create a backup before updating
6. Apply updates
7. Verify system functionality after update

### Health Checks

Regularly monitor system health:

1. Go to "Monitoring" > "Health Checks"
2. Review the status of all services
3. Run diagnostic tests to check:
   - Database integrity
   - File storage
   - Message queue
   - Inter-service communication
4. Address any issues identified

### Cleanup Tasks

Manage system resources:

1. Go to "System Settings" > "Maintenance" > "Cleanup"
2. Configure cleanup tasks:
   - Temporary file cleanup (remove files older than 7 days)
   - Log rotation and archiving
   - Expired session cleanup
   - Deleted user data purging
3. Run manual cleanup if needed
4. Schedule automated cleanups

## Performance Optimization

### Database Optimization

1. Go to "System Settings" > "Performance" > "Database"
2. Configure database settings:
   - Connection pool size
   - Query timeout limits
   - Index management
3. View slow query logs
4. Run database vacuum and analyze operations

### Caching Configuration

1. Go to "System Settings" > "Performance" > "Caching"
2. Configure Redis cache settings:
   - TTL for different cache types
   - Cache eviction policies
   - Memory limits
3. Monitor cache hit/miss rates

## Troubleshooting

### Common Issues

#### Database Connection Problems
- Check PostgreSQL service status: `docker-compose ps postgres`
- Verify connection credentials in the `.env` file
- Check network connectivity and firewall rules
- Review PostgreSQL logs: `docker-compose logs postgres`

#### Email Delivery Issues
- Verify SMTP server settings in the admin panel
- Check for blocked ports (25, 465, 587)
- Review email service logs
- Test email delivery with a manual test email
- Check spam filter configurations

#### Performance Problems
- Check resource utilization (CPU, memory, disk I/O)
- Review database query performance in the metrics dashboard
- Check for excessive API calls from specific clients
- Analyze application logs for bottlenecks
- Consider scaling resources for busy components

### Diagnostic Tools

1. Use the built-in diagnostic script:
   - `./check-services.sh` (Linux/Mac)
   - `.\check-services.ps1` (Windows)

2. View detailed container logs:
   ```bash
   docker-compose logs [service-name]
   ```

3. Access service-specific health endpoints:
   ```
   GET /api/v1/health
   GET /api/v1/health/diagnostic
   ```

### Support Resources

If you need additional assistance:

1. Check the technical documentation in the `docs` folder
2. Review knowledge base articles on our support portal
3. Contact technical support at support@stormmatrix.com
4. Include diagnostic information from "Monitoring" > "Diagnostics"