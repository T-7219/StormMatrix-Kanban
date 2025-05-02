# Changelog

All notable changes to the StormMatrix-Kanban project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Support for custom user avatars
- New integrations with external calendars

### Fixed
- Notification issues in Firefox

## [0.8.0] - 2025-03-15

### Added
- External systems API integrations
- Card templates for recurring tasks
- Board data export in various formats (CSV, JSON, Excel)
- Dynamic Grafana dashboards
- Support for video attachments to cards

### Improved
- Database query performance
- Updated dependencies for all microservices
- Improved API documentation

### Fixed
- Redis caching issue
- Error when creating duplicate tags

## [0.7.0] - 2025-01-20

### Added
- Telegram integration for notifications
- Customizable user dashboard
- Tagging system for cards and boards
- Enhanced search and filtering capabilities
- Performance metrics and Prometheus monitoring

### Improved
- Updated UI with better accessibility
- Optimization for large boards
- Enhanced notification system

### Fixed
- Two-factor authentication issues
- Synchronization errors during simultaneous card editing

## [0.6.0] - 2024-11-10

### Added
- First public beta release
- Core Kanban board functionality
- User and team support
- Basic settings and personalization
- Notification system for assigned tasks
- Microservice architecture with 5 core services
- Multi-language support (English, Russian, German)
- Two-factor authentication
- Basic administrative interface
- File attachments for cards
- Card comments with user mentions
- Card priority levels
- API with Swagger documentation
- Basic monitoring and logging system

### Fixed
- Various beta testing bugs

[Unreleased]: https://github.com/T-7219/StormMatrix-Kanban/compare/v0.8.0...HEAD
[0.8.0]: https://github.com/T-7219/StormMatrix-Kanban/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/T-7219/StormMatrix-Kanban/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/T-7219/StormMatrix-Kanban/releases/tag/v0.6.0