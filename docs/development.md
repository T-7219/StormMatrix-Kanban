# StormMatrix Kanban - Development Guide

This guide provides instructions for setting up the development environment for the StormMatrix Kanban project.

## Prerequisites

- Node.js (v16 or later)
- Docker and Docker Compose
- Git
- PostgreSQL (if running locally)
- Redis (if running locally)
- RabbitMQ (if running locally)

## Project Structure

StormMatrix Kanban follows a microservices architecture with the following components:

```
StormMatrix-Kanban/
├── backend/
│   ├── auth-service/        # Authentication and authorization
│   ├── board-service/       # Board and card management
│   ├── common/              # Shared libraries and utilities
│   ├── file-service/        # File attachments and storage
│   ├── notification-service/# Notifications and messaging
│   └── user-service/        # User profiles and settings
├── docker/
│   ├── grafana/             # Grafana dashboards and data sources
│   ├── logstash/            # Logstash configuration
│   ├── nginx/               # Nginx configurations
│   ├── postgres/            # PostgreSQL initialization scripts
│   └── prometheus/          # Prometheus configuration
├── docs/                    # Documentation
├── frontend/                # React.js frontend
└── scripts/                 # Utility scripts
```

## Initial Setup

### Clone the Repository

```bash
git clone https://github.com/T-7219/StormMatrix-Kanban.git
cd StormMatrix-Kanban
```

### Environment Configuration

1. Copy the example environment files:

```bash
cp .env.example .env
```

2. Edit the `.env` file with your local development configuration:

```
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Auth Service
AUTH_DB_HOST=postgres
AUTH_DB_PORT=5432
AUTH_DB_NAME=auth_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1d
JWT_REFRESH_EXPIRATION=7d

# User Service
USER_DB_HOST=postgres
USER_DB_PORT=5432
USER_DB_NAME=user_db

# Board Service
BOARD_DB_HOST=postgres
BOARD_DB_PORT=5432
BOARD_DB_NAME=board_db

# Notification Service
NOTIFICATION_DB_HOST=postgres
NOTIFICATION_DB_PORT=5432
NOTIFICATION_DB_NAME=notification_db
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM=notifications@example.com

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# RabbitMQ
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest

# File Service
FILE_STORAGE_PATH=/app/uploads
MAX_FILE_SIZE=100MB
ALLOWED_FILE_TYPES=image/*,application/pdf,application/zip
```

## Development Setup

### Start with Docker Compose

The easiest way to start all required services:

```bash
docker-compose up -d
```

This will start PostgreSQL, Redis, RabbitMQ, and other required services.

To start only infrastructure services (for local microservice development):

```bash
docker-compose up -d postgres redis rabbitmq
```

### Starting Individual Microservices

Each microservice can be started independently for development:

```bash
# Auth Service
cd backend/auth-service
npm install
npm run start:dev

# User Service
cd backend/user-service
npm install
npm run start:dev

# Board Service
cd backend/board-service
npm install
npm run start:dev

# Notification Service
cd backend/notification-service
npm install
npm run start:dev

# File Service
cd backend/file-service
npm install
npm run start:dev
```

### Frontend Development

Start the frontend application in development mode:

```bash
cd frontend
npm install
npm start
```

The frontend application will be available at http://localhost:3000.

## Microservices Architecture

Each microservice follows a similar structure:

```
service-name/
├── src/
│   ├── main.ts              # Entry point
│   ├── app.module.ts        # Main module
│   ├── app.controller.ts    # Main controller
│   ├── config/              # Configuration
│   ├── domain-modules/      # Domain-specific modules
│   │   ├── module.ts
│   │   ├── controllers/     # REST controllers
│   │   ├── services/        # Business logic
│   │   ├── entities/        # Database entities
│   │   ├── dto/             # Data transfer objects
│   │   ├── repositories/    # Data access
│   │   └── interfaces/      # Interfaces and types
│   ├── health/              # Health check endpoints
│   └── metrics/             # Metrics endpoints
├── test/                    # Tests
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── Dockerfile.dev           # Development Dockerfile
```

### Auth Service (Port 3001)

The Auth Service handles user authentication and authorization:

- JWT-based authentication
- Registration and login
- Two-factor authentication
- Password reset
- OAuth integration
- Permission management

Key files:
- `backend/auth-service/src/auth/auth.controller.ts`: Authentication endpoints
- `backend/auth-service/src/auth/auth.service.ts`: Authentication logic
- `backend/auth-service/src/admin/admin.controller.ts`: Admin endpoints
- `backend/auth-service/src/two-factor-auth/two-factor-auth.service.ts`: 2FA implementation

### User Service (Port 3002)

The User Service manages user profiles and preferences:

- User profile management
- Language preferences
- Theme settings
- User search and filtering
- Team management

### Board Service (Port 3003)

The Board Service manages boards, columns, cards, and comments:

- Board CRUD operations
- Column management
- Card operations
- Comments
- Labels and tags
- Board templates

### Notification Service (Port 3004)

The Notification Service handles notification delivery:

- Event-based notifications
- Email delivery
- In-app notifications
- Telegram notifications
- Notification preferences

### File Service (Port 3005)

The File Service manages file uploads and storage:

- File uploads
- Image processing
- File metadata
- Access control
- Temporary URL generation

## API Documentation

Each microservice provides Swagger API documentation when running:

- Auth Service: http://localhost:3001/api/docs
- User Service: http://localhost:3002/api/docs
- Board Service: http://localhost:3003/api/docs
- Notification Service: http://localhost:3004/api/docs
- File Service: http://localhost:3005/api/docs

To view the documentation when running the complete system through Nginx:
- http://localhost/api/docs

## Testing

### Running Tests

Run unit tests for all services:

```bash
npm test
```

Run tests for a specific service:

```bash
cd backend/auth-service
npm test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

### Writing Tests

We use Jest for unit and integration testing:

1. Unit tests should be placed next to the file they test with a `.spec.ts` extension
2. E2E tests should be placed in the `test` directory with a `.e2e-spec.ts` extension
3. Test coverage reports can be generated with `npm run test:cov`

Example test:

```typescript
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();
    
    service = module.get<AuthService>(AuthService);
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  // More test cases...
});
```

## Common Development Tasks

### Adding a New Feature

1. Create a new branch from `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/feature-name
   ```

2. Implement the feature in the appropriate service(s)
3. Write tests for the new feature
4. Update documentation as needed
5. Submit a pull request

### Creating a New Microservice

1. Create a new directory in `backend/`:
   ```bash
   mkdir -p backend/new-service/src
   cd backend/new-service
   ```

2. Initialize a new NestJS project:
   ```bash
   npm init -y
   npm install @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata
   ```

3. Add the service to `docker-compose.yml`
4. Configure routing in Nginx (`docker/nginx/conf.d/default.conf`)

### Database Migrations

We use TypeORM for database operations and migrations:

1. Create a migration:
   ```bash
   cd backend/service-name
   npm run migration:create -- -n MigrationName
   ```

2. Run migrations:
   ```bash
   npm run migration:run
   ```

3. Revert migrations:
   ```bash
   npm run migration:revert
   ```

## Common Issues and Solutions

### Database Connection Issues

If you encounter database connection issues, ensure:
1. PostgreSQL is running: `docker-compose ps postgres`
2. Database credentials in `.env` are correct
3. The database exists and is properly initialized
4. Try to connect directly using `psql`:
   ```bash
   docker-compose exec postgres psql -U postgres -d auth_db
   ```

### Redis Connection Issues

If Redis fails to connect:
1. Ensure Redis is running: `docker-compose ps redis`
2. Check the connection parameters in `.env`
3. Try to connect directly:
   ```bash
   docker-compose exec redis redis-cli ping
   ```

### RabbitMQ Connection Issues

If RabbitMQ fails to connect:
1. Ensure RabbitMQ is running: `docker-compose ps rabbitmq`
2. Check the connection parameters in `.env`
3. Check RabbitMQ management interface: http://localhost:15672 (user: guest, password: guest)

### Service Health Checks

Check the health of a service:
```bash
curl http://localhost:3001/api/v1/health
```

Get detailed diagnostics:
```bash
curl http://localhost:3001/api/v1/health/diagnostic
```

## Debugging

### Backend Debugging

1. Use the VSCode Node.js debugger with these configurations:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Auth Service",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:debug"],
      "cwd": "${workspaceFolder}/backend/auth-service",
      "console": "integratedTerminal",
      "protocol": "inspector"
    }
  ]
}
```

2. Set breakpoints in the code
3. Launch the debugger from VSCode

### Frontend Debugging

1. Use the Chrome DevTools with the React Developer Tools extension
2. Use `console.log` statements for simple debugging
3. Use the Redux DevTools extension for state debugging

## Code Style and Linting

We follow standardized code style guidelines:

- Use ESLint and Prettier for code formatting
- Follow NestJS best practices
- Follow React best practices for frontend code

Run linting checks:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

## Contribution Guidelines

1. Create a new branch for each feature or bugfix:
   - `feature/feature-name` for new features
   - `fix/bug-name` for bug fixes

2. Follow the commit message format:
   - `feat(component): description` for features
   - `fix(component): description` for bug fixes
   - `docs(component): description` for documentation
   - `refactor(component): description` for refactoring
   - `test(component): description` for tests
   - `chore(component): description` for maintenance

3. Write unit tests for new functionality (aim for >80% coverage)

4. Update documentation as needed

5. Create a pull request:
   - Provide a clear description of changes
   - Reference related issues
   - Ensure CI checks pass
   - Request code review from at least one team member