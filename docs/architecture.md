# StormMatrix Kanban - Architecture Overview

This document provides a high-level overview of the StormMatrix Kanban system architecture.

## System Architecture Diagram

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│               │     │               │     │               │
│  Web Browser  │     │  Mobile App   │     │  Desktop App  │
│               │     │               │     │               │
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        └─────────────┬───────┴─────────────┬──────┘
                      │                     │
                      ▼                     ▼
              ┌───────────────────────────────────┐
              │                                   │
              │           API Gateway            │
              │           (Nginx)                │
              │                                  │
              └────┬──────┬──────┬──────┬───────┘
                   │      │      │      │
    ┌──────────────┘      │      │      └───────────────┐
    │                     │      │                      │
    ▼                     ▼      ▼                      ▼
┌─────────┐       ┌─────────┐  ┌─────────┐      ┌─────────────┐
│         │       │         │  │         │      │             │
│  Auth   │       │  User   │  │  Board  │      │ Notification│
│ Service │       │ Service │  │ Service │      │   Service   │
│         │       │         │  │         │      │             │
└────┬────┘       └────┬────┘  └────┬────┘      └──────┬──────┘
     │                 │            │                  │
     └─────────┬───────┴──────┬─────┴─────────┬───────┘
               │              │               │
               ▼              ▼               ▼
         ┌─────────┐    ┌─────────┐    ┌─────────────┐
         │         │    │         │    │             │
         │PostgreSQL│    │  Redis  │    │  RabbitMQ   │
         │         │    │         │    │             │
         └─────────┘    └─────────┘    └─────────────┘
```

## Microservices

The system is composed of several microservices, each responsible for a specific domain:

### Auth Service
- Handles user authentication and authorization
- Issues and validates JWT tokens
- Manages 2FA setup and verification
- Listens on port 3001

### User Service
- Manages user profiles and settings
- Handles user registration and profile updates
- Stores user preferences and language settings
- Listens on port 3002

### Board Service
- Manages Kanban boards, columns, and cards
- Handles card movements and updates
- Manages board permissions and sharing
- Listens on port 3003

### Notification Service
- Manages notification preferences and delivery
- Sends notifications through various channels (web, email, Telegram)
- Processes notification events from other services via RabbitMQ
- Listens on port 3004

### File Service
- Handles file uploads and storage
- Manages file metadata and permissions
- Provides secure file download links
- Listens on port 3005

## Data Storage

### PostgreSQL
- Primary data store for persistent data
- Separate schemas for each microservice
- Stores users, boards, cards, comments, etc.

### Redis
- Used for caching and session management
- Stores short-lived data (active sessions, rate limiting)
- Used for real-time features and notifications

## Message Queue

### RabbitMQ
- Used for asynchronous communication between microservices
- Ensures reliable delivery of events
- Implements event-driven architecture patterns

## API Gateway

### Nginx
- Single entry point for all client requests
- Routes requests to appropriate microservices
- Handles SSL termination
- Implements rate limiting and basic security measures

## Security Architecture

- All communication is encrypted using HTTPS
- JWT-based authentication with short-lived tokens
- Optional two-factor authentication
- Role-based access control for all resources
- Input validation and sanitization at API boundaries

## Monitoring and Logging

### Monitoring
- Prometheus for metrics collection
- Grafana for visualization and alerting
- Health check endpoints for each service

### Logging
- Centralized logging with ELK Stack
- Structured JSON logs
- Correlation IDs across services

## Deployment Architecture

The system is containerized using Docker and can be deployed to:
- Kubernetes cluster
- Docker Swarm
- Single server with Docker Compose (for development)

## Scaling Considerations

- Stateless services can be horizontally scaled
- Database read replicas for scaling read operations
- Redis clustering for distributed caching