# StormMatrix Kanban - API Documentation

This document provides an overview of the StormMatrix Kanban REST API endpoints.

## API Conventions

- All API endpoints are prefixed with `/api/v1`
- All responses are in JSON format
- Authentication is required for most endpoints (via JWT Bearer token)
- Standard HTTP status codes are used for responses
- Pagination is implemented for list endpoints using `limit` and `offset` query parameters

## Authentication API

### Register User

```
POST /api/v1/auth/register
```

Register a new user in the system.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe",
  "language": "en"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "language": "en",
  "created_at": "2024-01-01T12:00:00Z"
}
```

### Login

```
POST /api/v1/auth/login
```

Authenticate a user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "requires_2fa": false
}
```

### Verify 2FA

```
POST /api/v1/auth/verify-2fa
```

Verify two-factor authentication code.

**Request Body:**
```json
{
  "code": "123456",
  "session_token": "temporary_token_from_login"
}
```

**Response:**
```json
{
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Refresh Token

```
POST /api/v1/auth/refresh-token
```

Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbG..."
}
```

**Response:**
```json
{
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Logout

```
POST /api/v1/auth/logout
```

Invalidate the current session.

**Response:**
```json
{
  "message": "Successfully logged out"
}
```

## Users API

### Get Current User

```
GET /api/v1/users/me
```

Get the current user's profile.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "language": "en",
  "created_at": "2024-01-01T12:00:00Z",
  "avatar_url": "https://example.com/avatars/user.jpg",
  "notification_settings": {
    "email": true,
    "web": true,
    "telegram": false
  }
}
```

### Update User Profile

```
PUT /api/v1/users/me
```

Update the current user's profile.

**Request Body:**
```json
{
  "name": "John Updated",
  "language": "de"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Updated",
  "language": "de",
  "updated_at": "2024-01-02T12:00:00Z"
}
```

### Enable 2FA

```
POST /api/v1/users/me/enable-2fa
```

Enable two-factor authentication for the current user.

**Response:**
```json
{
  "qr_code": "base64_encoded_qr_code",
  "secret": "2fa_secret_key",
  "recovery_codes": [
    "code1",
    "code2",
    "code3"
  ]
}
```

## Boards API

### List Boards

```
GET /api/v1/boards
```

Get all boards the current user has access to.

**Query Parameters:**
- `type` - Filter by board type (personal/team)
- `limit` - Number of items per page (default: 20)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "total": 42,
  "limit": 20,
  "offset": 0,
  "data": [
    {
      "id": "uuid1",
      "name": "Project Alpha",
      "description": "Main project board",
      "owner_id": "user_uuid",
      "is_personal": false,
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-02T12:00:00Z"
    },
    {
      "id": "uuid2",
      "name": "Personal Tasks",
      "description": "My personal tasks",
      "owner_id": "user_uuid",
      "is_personal": true,
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-02T12:00:00Z"
    }
  ]
}
```

### Create Board

```
POST /api/v1/boards
```

Create a new board.

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Description of the new project",
  "is_personal": false
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "New Project",
  "description": "Description of the new project",
  "owner_id": "user_uuid",
  "is_personal": false,
  "created_at": "2024-01-03T12:00:00Z",
  "updated_at": "2024-01-03T12:00:00Z"
}
```

### Get Board Details

```
GET /api/v1/boards/{boardId}
```

Get details of a specific board including columns.

**Response:**
```json
{
  "id": "uuid",
  "name": "Project Alpha",
  "description": "Main project board",
  "owner_id": "user_uuid",
  "is_personal": false,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-02T12:00:00Z",
  "columns": [
    {
      "id": "col1",
      "name": "To Do",
      "position": 0,
      "color": "#FF0000"
    },
    {
      "id": "col2",
      "name": "In Progress",
      "position": 1,
      "color": "#00FF00"
    },
    {
      "id": "col3",
      "name": "Done",
      "position": 2,
      "color": "#0000FF"
    }
  ],
  "members": [
    {
      "user_id": "user_uuid1",
      "name": "John Doe",
      "role": "owner"
    },
    {
      "user_id": "user_uuid2",
      "name": "Jane Smith",
      "role": "member"
    }
  ]
}
```

## Cards API

### List Cards on Board

```
GET /api/v1/boards/{boardId}/cards
```

Get all cards on a specific board.

**Query Parameters:**
- `column_id` - Filter by column
- `assignee_id` - Filter by assignee
- `limit` - Number of items per page (default: 50)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "total": 24,
  "limit": 10,
  "offset": 0,
  "data": [
    {
      "id": "card1",
      "title": "Implement login",
      "description": "Create login functionality",
      "column_id": "col1",
      "position": 0,
      "due_date": "2024-02-01T12:00:00Z",
      "created_by": "user_uuid",
      "created_at": "2024-01-01T12:00:00Z",
      "assignees": [
        {
          "user_id": "user_uuid1",
          "name": "John Doe",
          "role": "executor"
        }
      ],
      "tags": [
        {
          "id": "tag1",
          "name": "Backend",
          "color": "#0000FF"
        }
      ]
    }
  ]
}
```

### Create Card

```
POST /api/v1/boards/{boardId}/cards
```

Create a new card on a board.

**Request Body:**
```json
{
  "title": "New feature",
  "description": "Implement new feature X",
  "column_id": "col1",
  "position": 0,
  "due_date": "2024-03-01T12:00:00Z",
  "assignee_ids": ["user_uuid1", "user_uuid2"],
  "tag_ids": ["tag1", "tag2"]
}
```

**Response:**
```json
{
  "id": "card_uuid",
  "title": "New feature",
  "description": "Implement new feature X",
  "column_id": "col1",
  "position": 0,
  "due_date": "2024-03-01T12:00:00Z",
  "created_by": "current_user_uuid",
  "created_at": "2024-01-04T12:00:00Z",
  "assignees": [
    {
      "user_id": "user_uuid1",
      "name": "John Doe",
      "role": "executor"
    },
    {
      "user_id": "user_uuid2",
      "name": "Jane Smith",
      "role": "customer"
    }
  ],
  "tags": [
    {
      "id": "tag1",
      "name": "Backend",
      "color": "#0000FF"
    },
    {
      "id": "tag2",
      "name": "Urgent",
      "color": "#FF0000"
    }
  ]
}
```

### Update Card Position

```
PUT /api/v1/cards/{cardId}/position
```

Update card position (move between columns or reorder).

**Request Body:**
```json
{
  "column_id": "col2",
  "position": 1
}
```

**Response:**
```json
{
  "id": "card_uuid",
  "column_id": "col2",
  "position": 1,
  "updated_at": "2024-01-05T12:00:00Z"
}
```

## Notifications API

### List Notifications

```
GET /api/v1/notifications
```

Get notifications for the current user.

**Query Parameters:**
- `read` - Filter by read status (true/false)
- `limit` - Number of items per page (default: 20)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "total": 15,
  "limit": 20,
  "offset": 0,
  "data": [
    {
      "id": "notif1",
      "type": "card_assigned",
      "content": {
        "card_id": "card1",
        "card_title": "Implement login",
        "board_id": "board1",
        "board_name": "Project Alpha",
        "assigned_by": "Jane Smith"
      },
      "is_read": false,
      "created_at": "2024-01-05T10:30:00Z"
    },
    {
      "id": "notif2",
      "type": "card_due_soon",
      "content": {
        "card_id": "card2",
        "card_title": "Design database",
        "board_id": "board1",
        "board_name": "Project Alpha",
        "due_date": "2024-01-06T23:59:59Z"
      },
      "is_read": true,
      "created_at": "2024-01-05T08:00:00Z"
    }
  ]
}
```

## File API

### Upload File

```
POST /api/v1/cards/{cardId}/attachments
```

Upload a file attachment to a card.

**Request Body:**
```
multipart/form-data
```

**Response:**
```json
{
  "id": "attachment_uuid",
  "file_name": "design.png",
  "file_path": "/attachments/2024/01/uuid-design.png",
  "file_size": 1048576,
  "mime_type": "image/png",
  "uploaded_by": "user_uuid",
  "uploaded_at": "2024-01-05T14:30:00Z",
  "download_url": "https://example.com/api/v1/attachments/attachment_uuid"
}
```

## Admin API

### List Users (Admin only)

```
GET /api/v1/admin/users
```

Get all users in the system.

**Query Parameters:**
- `active` - Filter by user active status (true/false)
- `search` - Search by name or email
- `limit` - Number of items per page (default: 20)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "total": 42,
  "limit": 20,
  "offset": 0,
  "data": [
    {
      "id": "user_uuid1",
      "email": "user1@example.com",
      "name": "John Doe",
      "language": "en",
      "active": true,
      "created_at": "2024-01-01T12:00:00Z",
      "last_login": "2024-01-05T09:30:00Z",
      "roles": ["user"]
    },
    {
      "id": "user_uuid2",
      "email": "admin@example.com",
      "name": "Admin User",
      "language": "en",
      "active": true,
      "created_at": "2024-01-01T12:00:00Z",
      "last_login": "2024-01-05T14:20:00Z",
      "roles": ["user", "admin"]
    }
  ]
}
```

### System Settings (Admin only)

```
GET /api/v1/admin/system/settings
```

Get system settings.

**Response:**
```json
{
  "smtp": {
    "host": "smtp.example.com",
    "port": 587,
    "username": "notifications@example.com",
    "from_email": "notifications@example.com",
    "from_name": "StormMatrix Notifications"
  },
  "telegram_bot_enabled": true,
  "max_file_size_mb": 25,
  "allowed_file_types": ["image/jpeg", "image/png", "application/pdf", "text/plain"],
  "logo_url": "https://example.com/logo.png"
}
```