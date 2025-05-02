# StormMatrix Kanban - Development Guide

This guide provides instructions for setting up the development environment for the StormMatrix Kanban project.

## Prerequisites

- Node.js (v16 or later)
- Docker and Docker Compose
- PostgreSQL (if running locally)
- Redis (if running locally)

## Initial Setup

### Clone the Repository

```bash
git clone https://github.com/your-organization/stormmatrix-kanban.git
cd stormmatrix-kanban
```

### Environment Configuration

1. Copy the example environment files:

```bash
cp .env.example .env
```

2. Edit the `.env` file with your local configuration.

## Backend Development

### Start with Docker Compose

The easiest way to start all required services:

```bash
docker-compose up -d
```

This will start PostgreSQL, Redis, RabbitMQ, and other required services.

### Starting Individual Microservices

Each microservice can be started independently:

```bash
# From project root
cd backend/auth-service
npm install
npm run start:dev

# In a new terminal
cd backend/user-service
npm install
npm run start:dev

# Repeat for other services
```

## Frontend Development

```bash
# From project root
cd frontend
npm install
npm start
```

The frontend application will be available at http://localhost:3000.

## API Documentation

While the server is running, Swagger documentation is available at:
- Auth Service: http://localhost:3001/api/docs
- User Service: http://localhost:3002/api/docs
- Board Service: http://localhost:3003/api/docs
- And so on for other services...

## Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e
```

## Common Issues and Solutions

### Database Connection Issues

If you encounter database connection issues, ensure:
1. PostgreSQL is running
2. Database credentials in `.env` are correct
3. The database exists and is properly initialized

### Redis Connection Issues

If Redis fails to connect:
1. Ensure Redis is running
2. Check the connection parameters in `.env`

## Contribution Guidelines

1. Create a new branch for each feature or bugfix
2. Follow the commit message format: `feat(component): description` or `fix(component): description`
3. Write unit tests for new functionality
4. Update documentation as needed
5. Open a pull request with a clear description of the changes