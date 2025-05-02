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
- **Nginx**: 1.20+ (if not using bundled version)
- **SSL Certificate**: Valid SSL certificate for your domain

## Installation

### Docker Installation (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/your-organization/stormmatrix-kanban.git
cd stormmatrix-kanban
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Edit the `.env` file with your configuration settings.

4. Start the application:
```bash
docker-compose up -d
```

### Manual Installation

For manual installation, please follow these steps:

1. Set up PostgreSQL database
2. Set up Redis
3. Set up RabbitMQ
4. Configure and start each microservice
5. Configure Nginx as a reverse proxy

Detailed manual installation instructions can be found in the Development Guide.

## Initial Configuration

### First-time Setup

After installation:

1. Access the admin interface at `https://yourdomain.com/admin`
2. Login with the default credentials:
   - Username: `admin@example.com`
   - Password: The password generated during installation (check console output)
3. Change the default password immediately
4. Complete the initial setup wizard

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

### Telegram Integration (Optional)

To enable Telegram notifications:

1. Create a Telegram bot via BotFather
2. Get the bot API token
3. Go to "System Settings" > "Telegram Configuration" 
4. Enter the API token
5. Enable Telegram notifications

## User Management

### Creating New Users

1. Go to "User Management" > "Users"
2. Click "Add User"
3. Enter user details:
   - Email
   - Name
   - Password (or select "Send invitation")
   - Language preference
   - Role (User or Admin)
4. Click "Create"

### Managing User Roles

1. Go to "User Management" > "Users"
2. Find and select a user
3. Click "Edit"
4. Change the role as needed
5. Click "Save"

### Deactivating Users

1. Go to "User Management" > "Users"
2. Find and select a user
3. Click "Deactivate"
4. Confirm the action

Note: Deactivated users can be reactivated later if needed.

## System Monitoring

### Logs

Access centralized logs through the ELK Stack:

1. Go to "Monitoring" > "Logs"
2. Use Kibana interface to search and filter logs
3. Set up log retention policies in "System Settings" > "Logging"

### Metrics

Monitor system health and performance:

1. Go to "Monitoring" > "Metrics"
2. Access the Grafana dashboard
3. View key metrics:
   - CPU and memory usage
   - API response times
   - Database performance
   - Queue metrics

### Alerts

Configure alerts for system issues:

1. Go to "Monitoring" > "Alerts"
2. Set up alert rules:
   - High CPU/Memory usage
   - Slow API responses
   - Database connection problems
   - Error rate thresholds
3. Configure notification channels (email, Slack, etc.)

## Backup and Recovery

### Database Backup

Configure automated backups:

1. Go to "System Settings" > "Backups"
2. Set backup schedule:
   - Frequency (daily, weekly)
   - Retention period
   - Storage location
3. Enable backup encryption if needed

### Manual Backup

Perform an immediate backup:

1. Go to "System Settings" > "Backups"
2. Click "Create Backup Now"
3. Wait for the backup to complete
4. Download the backup file if needed

### Recovery

To restore from a backup:

1. Go to "System Settings" > "Backups"
2. Select the backup file
3. Click "Restore"
4. Confirm the action

Note: Restoring from a backup will overwrite current data.

## Security Management

### SSL Configuration

1. Go to "System Settings" > "Security"
2. Upload SSL certificate and private key
3. Configure SSL settings
4. Apply changes

### Password Policies

Configure password requirements:

1. Go to "System Settings" > "Security"
2. Set password policies:
   - Minimum length
   - Required characters
   - Expiration period
   - History restrictions
3. Save changes

### Rate Limiting

Protect against abuse:

1. Go to "System Settings" > "Security"
2. Configure rate limiting:
   - Requests per minute
   - Login attempt limits
   - API rate limits
3. Save changes

## System Maintenance

### Updates

Update the application:

1. Go to "System Settings" > "Updates"
2. Check for available updates
3. Review release notes
4. Schedule the update during low-usage hours
5. Apply updates

### Health Checks

1. Go to "Monitoring" > "Health Checks"
2. Review the status of all services
3. Run diagnostic tests if needed

### Cleanup Tasks

Manage system resources:

1. Go to "System Settings" > "Maintenance"
2. Configure cleanup tasks:
   - Temporary file cleanup
   - Log rotation
   - Expired session cleanup
3. Run manual cleanup if needed

## Troubleshooting

### Common Issues

#### Database Connection Problems
- Check PostgreSQL service status
- Verify connection credentials
- Check network connectivity and firewall rules

#### Email Delivery Issues
- Verify SMTP server settings
- Check for blocked ports
- Review email service logs

#### Performance Problems
- Check resource utilization (CPU, memory)
- Review database query performance
- Check for excessive API calls

### Support Resources

If you need additional assistance:

1. Check the technical documentation
2. Review knowledge base articles
3. Contact technical support at support@stormmatrix.com
4. Include diagnostic information from "Monitoring" > "Diagnostics"