# StormMatrix Kanban

A modern, full-featured Kanban board application designed with microservices architecture to provide scalability, resilience, and flexibility.

![StormMatrix Kanban](https://via.placeholder.com/1200x600?text=StormMatrix+Kanban)

## Features

- **Intuitive Kanban Board Interface**: Drag-and-drop cards, customizable columns, and real-time updates
- **Multi-language Support**: Available in English, German, and Russian
- **User Authentication**: Secure login with optional two-factor authentication
- **Team Collaboration**: Share boards, assign tasks, and comment on cards
- **Customizable Workflows**: Define your own columns and workflow steps
- **File Attachments**: Upload and attach files to cards
- **Activity Tracking**: Keep track of all changes and updates
- **Notifications**: Get notified about assignments and approaching deadlines
- **Filtering and Searching**: Find tasks quickly with powerful filtering options
- **Personal and Team Boards**: Separate personal tasks from team projects
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode**: Reduce eye strain with dark mode support

## Architecture

StormMatrix Kanban is built using a microservices architecture with the following components:

- **Frontend**: React.js with TypeScript and Material-UI
- **API Gateway**: Nginx for routing and load balancing
- **Microservices**:
  - **Auth Service**: User authentication and authorization
  - **User Service**: User profile management
  - **Board Service**: Board and card management
  - **Notification Service**: In-app and email notifications
  - **File Service**: File upload and storage
- **Databases**:
  - PostgreSQL for persistent data
  - Redis for caching and session management
- **Message Queue**: RabbitMQ for asynchronous communication between services
- **Monitoring**: Prometheus and Grafana for metrics and monitoring
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana) for centralized logging

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-organization/stormmatrix-kanban.git
cd stormmatrix-kanban
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file to customize your settings.

3. Start the application using Docker Compose:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost:3000
- API: http://localhost:80/api
- API Documentation: http://localhost:80/api/docs

### Initial Setup

The first time you run the application, an admin user will be created automatically with the credentials specified in your `.env` file. The default credentials are:

- Email: admin@example.com
- Password: admin

Be sure to change these credentials immediately after your first login.

## Development

### Running Services Individually

For development, you can run services individually:

```bash
# Frontend
cd frontend
npm install
npm start

# Auth Service
cd backend/auth-service
npm install
npm run start:dev

# Board Service
cd backend/board-service
npm install
npm run start:dev

# And so on for other services...
```

### Running Tests

```bash
# Run tests for all services
npm test

# Run tests for a specific service
cd backend/auth-service
npm test
```

## Documentation

Comprehensive documentation is available in the `docs` folder:

- [User Guide](docs/user-guide.md): Instructions for end users
- [Admin Guide](docs/admin-guide.md): Instructions for administrators
- [API Documentation](docs/api.md): API reference
- [Development Guide](docs/development.md): Guide for developers
- [Architecture](docs/architecture.md): Detailed system architecture

## Contributing

We welcome contributions to StormMatrix Kanban! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Deployment

For production deployment, we recommend using Kubernetes. Configuration files for Kubernetes deployment are available in the `k8s` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped build this project
- Special thanks to the open source community for the amazing tools that made this possible
