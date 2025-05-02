# StormMatrix Kanban

<div align="center">
  <img src="img/logo/dementor-kanban-logo.png" alt="Dementor Kanban Logo" width="200">
  <h3>Professional Kanban Board System</h3>
  <p>A modern, full-featured Kanban board application designed with microservices architecture to provide scalability, resilience, and flexibility.</p>

  <a href="https://github.com/T-7219/StormMatrix-Kanban/releases/latest"><img src="https://img.shields.io/github/v/release/T-7219/StormMatrix-Kanban?include_prereleases&style=flat-square" alt="Latest Release"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/blob/main/LICENSE"><img src="https://img.shields.io/github/license/T-7219/StormMatrix-Kanban?style=flat-square" alt="License"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/stargazers"><img src="https://img.shields.io/github/stars/T-7219/StormMatrix-Kanban?style=flat-square" alt="Stars"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/issues"><img src="https://img.shields.io/github/issues/T-7219/StormMatrix-Kanban?style=flat-square" alt="Issues"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/T-7219/StormMatrix-Kanban/ci.yml?branch=main&label=tests&style=flat-square" alt="Tests"></a>
  <p><strong>Current Version: 0.8.0</strong></p>

  [English](README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)
</div>

## ✨ Features

- **📋 Intuitive Kanban Board Interface**: Drag-and-drop cards, customizable columns, and real-time updates
- **🌐 Multi-language Support**: Available in English, German, and Russian
- **🔒 User Authentication**: Secure login with optional two-factor authentication
- **👥 Team Collaboration**: Share boards, assign tasks, and comment on cards
- **🔄 Customizable Workflows**: Define your own columns and workflow steps
- **📎 File Attachments**: Upload and attach files to cards
- **📊 Activity Tracking**: Keep track of all changes and updates
- **🔔 Notifications**: Get notified about assignments and approaching deadlines
- **🔍 Filtering and Searching**: Find tasks quickly with powerful filtering options
- **👤 Personal and Team Boards**: Separate personal tasks from team projects
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🌙 Dark Mode**: Reduce eye strain with dark mode support

## 🏗️ Architecture

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

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/T-7219/StormMatrix-Kanban.git
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

## 💻 Development

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

## 📚 Documentation

Comprehensive documentation is available in the `docs` folder:

- [User Guide](docs/user-guide.md): Instructions for end users
- [Admin Guide](docs/admin-guide.md): Instructions for administrators
- [API Documentation](docs/api.md): API reference
- [Development Guide](docs/development.md): Guide for developers
- [Architecture](docs/architecture.md): Detailed system architecture

## 🤝 Contributing

We welcome contributions to StormMatrix Kanban! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📦 Deployment

For production deployment, we recommend using Kubernetes. Configuration files for Kubernetes deployment are available in the `k8s` directory.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Thanks to all contributors who have helped build this project
- Special thanks to the open source community for the amazing tools that made this possible

## 📞 Contact & Support

- Create an [issue](https://github.com/T-7219/StormMatrix-Kanban/issues) for bug reports or feature requests
- Contact the team at support@stormmatrix.pro
<<<<<<< HEAD
- Join our [Telegram Group](https://t.me/+Ck61P7EPXgY5ZGVi) for discussions: @stormmatrix_pro
=======
>>>>>>> 808ea130d1a6213646fce2958a561944b2636704

---

<div align="center">
  Made with ❤️ by the StormMatrix Team
</div>
