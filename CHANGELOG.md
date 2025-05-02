# Changelog

All notable changes to the StormMatrix Kanban project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Support for individual user avatars
- New integrations with external calendars

### Fixed
- Notification issues in Firefox

## [0.9.0] - 2025-05-03

### Added
- Annual dashboard for comprehensive diagnostics with long-term metrics aggregation
- Annual business intelligence dashboard with user metrics and conversion tracking
- Annual infrastructure monitoring dashboard for resource utilization and scaling analysis
- SSO integration with support for SAML, OAuth, and OIDC
- Multiple methods for two-factor authentication (TOTP, SMS, email)
- Full-text search capability across boards, cards, and comments
- Saved filters functionality for frequent search patterns
- GraphQL API support alongside REST API
- Card attachment preview for various file formats
- Enhanced role management system with granular permissions
- Bulk operations for cards (move, assign, label)

### Changed
- Improved dashboard UI with responsive layouts for all device sizes
- Optimized database queries for faster performance
- Enhanced WebSocket handling for more reliable real-time updates
- Updated to Node.js 18 across all services
- Migrated to TypeScript 5.0 for improved type safety
- Updated frontend dependencies to latest versions
- Improved Docker container efficiency with multi-stage builds

### Fixed
- Board synchronization issues during high concurrency
- Card drag-and-drop position calculation on zoomed displays
- Authentication token renewal mechanism
- File attachment storage path handling
- WebSocket reconnection during network fluctuations
- Date formatting issues in the notification system
- Performance degradation with large number of cards
- Memory leaks in long-running processes

### Security
- Enhanced password policy enforcement
- Implemented CSRF protection across all API endpoints
- Added protection against XSS attacks
- Improved authentication token handling
- Introduced rate limiting for authentication attempts
- Enhanced audit logging for security events
- Implemented content security policy headers

## [0.8.0] - 2025-03-15

### Added
- API integrations with external systems
- Card templates for recurring tasks
- Board data export in various formats (CSV, JSON, Excel)
- Dynamic monitoring dashboards in Grafana
- Support for attaching videos to cards

### Improved
- Database query performance
- Updated dependencies for all microservices
- Improved API documentation

### Fixed
- Caching issue in Redis
- Error when creating duplicate labels

## [0.7.0] - 2025-01-20

### Added
- Integration with Telegram for notifications
- Customizable user dashboard
- Tagging system for cards and boards
- Advanced search and filtering capabilities
- Performance metrics and Prometheus monitoring

### Improved
- Updated UI with enhanced accessibility
- Optimized handling of large boards
- Improved notification system

### Fixed
- Two-factor authentication issues
- Synchronization errors during concurrent card edits

## [0.6.0] - 2024-11-10

### Added
- First public beta release
- Core Kanban board functionality
- User and team support
- Basic settings and personalization
- Notification system for assigned tasks
- Microservice architecture with 5 core services
- Multilingual support (English, Russian, German)
- Two-factor authentication
- Basic admin interface
- File attachments to cards
- Comments on cards with user mentions
- Card prioritization
- API with Swagger documentation
- Basic monitoring and logging system

### Fixed
- Various beta testing bugs

[Unreleased]: https://github.com/T-7219/StormMatrix-Kanban/compare/v0.9.0...HEAD
[0.9.0]: https://github.com/T-7219/StormMatrix-Kanban/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/T-7219/StormMatrix-Kanban/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/T-7219/StormMatrix-Kanban/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/T-7219/StormMatrix-Kanban/releases/tag/v0.6.0