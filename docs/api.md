# StormMatrix Kanban - API Documentation

This document provides an overview of the StormMatrix Kanban REST API endpoints. The API follows a microservices architecture with separate services for authentication, boards, users, notifications, and file management.

## API Conventions

- All API endpoints are prefixed with `/api/v1`
- All responses are in JSON format
- Authentication is required for most endpoints (via JWT Bearer token)
- Standard HTTP status codes are used for responses
- Pagination is implemented for list endpoints using `limit` and `offset` query parameters
- Cross-service communication is handled internally
- Request rate limiting is applied to prevent abuse

## Service Endpoints

The API is divided into the following services:

- **Auth Service**: `http://localhost:3001/api/v1`
- **User Service**: `http://localhost:3002/api/v1`
- **Board Service**: `http://localhost:3003/api/v1`
- **Notification Service**: `http://localhost:3004/api/v1`
- **File Service**: `http://localhost:3005/api/v1`

When deployed, all services are accessible through the API Gateway at `/api/v1`.

## Authentication API (Auth Service)

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
  "language": "en" // Available options: en, ru, de
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "language": "en",
  "created_at": "2025-01-01T12:00:00Z"
}
```

**Error Responses:**
- 400 Bad Request - Invalid input data
- 409 Conflict - Email already in use

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

**Response (200 OK):**
```json
{
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "language": "en"
  },
  "requires_2fa": false
}
```

**Response with 2FA Required (200 OK):**
```json
{
  "requires_2fa": true,
  "session_token": "temporary_token_for_2fa",
  "expires_in": 300,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- 400 Bad Request - Invalid credentials
- 401 Unauthorized - Account locked after too many failed attempts
- 403 Forbidden - Account disabled

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

**Response (200 OK):**
```json
{
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "language": "en"
  }
}
```

**Error Responses:**
- 400 Bad Request - Invalid or expired code
- 401 Unauthorized - Invalid session token

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

**Response (200 OK):**
```json
{
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

**Error Responses:**
- 401 Unauthorized - Invalid or expired refresh token

### Logout

```
POST /api/v1/auth/logout
```

Invalidate the current session.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

### Request Password Reset

```
POST /api/v1/auth/forgot-password
```

Request a password reset link.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset instructions have been sent to your email"
}
```

### Reset Password

```
POST /api/v1/auth/reset-password
```

Reset password with token from email.

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "password": "NewSecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Password has been reset successfully"
}
```

**Error Responses:**
- 400 Bad Request - Invalid password format
- 401 Unauthorized - Invalid or expired token

## Users API (User Service)

### Get Current User

```
GET /api/v1/users/me
```

Get the current user's profile.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "language": "en",
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-02T12:00:00Z",
  "avatar_url": "https://example.com/avatars/user.jpg",
  "theme": "light",
  "notification_settings": {
    "email": true,
    "in_app": true,
    "telegram": false
  }
}
```

### Update User Profile

```
PUT /api/v1/users/me
```

Update the current user's profile.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "name": "John Updated",
  "language": "de",
  "theme": "dark"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Updated",
  "language": "de",
  "theme": "dark",
  "updated_at": "2025-01-02T12:00:00Z"
}
```

### Update Avatar

```
POST /api/v1/users/me/avatar
```

Upload a new avatar.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: multipart/form-data

**Request Body:**
- avatar: [file upload]

**Response (200 OK):**
```json
{
  "avatar_url": "https://example.com/avatars/user-uuid.jpg",
  "updated_at": "2025-01-02T12:00:00Z"
}
```

### Enable 2FA

```
POST /api/v1/users/me/2fa/enable
```

Enable two-factor authentication for the current user.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "qr_code": "base64_encoded_qr_code",
  "secret": "2fa_secret_key",
  "recovery_codes": [
    "XXXX-YYYY-ZZZZ",
    "AAAA-BBBB-CCCC",
    "DDDD-EEEE-FFFF"
  ]
}
```

### Verify and Activate 2FA

```
POST /api/v1/users/me/2fa/activate
```

Verify and activate 2FA after QR code has been scanned.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "enabled": true,
  "message": "Two-factor authentication is now enabled"
}
```

**Error Responses:**
- 400 Bad Request - Invalid code

### Disable 2FA

```
POST /api/v1/users/me/2fa/disable
```

Disable two-factor authentication.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "enabled": false,
  "message": "Two-factor authentication is now disabled"
}
```

### Update Notification Settings

```
PUT /api/v1/users/me/notification-settings
```

Update notification preferences.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "email": true,
  "in_app": true,
  "telegram": true,
  "telegram_chat_id": "12345678"
}
```

**Response (200 OK):**
```json
{
  "email": true,
  "in_app": true,
  "telegram": true,
  "updated_at": "2025-01-02T12:00:00Z"
}
```

## Boards API (Board Service)

### List Boards

```
GET /api/v1/boards
```

Get all boards the current user has access to.

**Headers:**
- Authorization: Bearer {token}

**Query Parameters:**
- `type` - Filter by board type (personal/team)
- `limit` - Number of items per page (default: 20)
- `offset` - Pagination offset (default: 0)
- `sort` - Sort field (created_at, updated_at, name)
- `order` - Sort order (asc, desc)

**Response (200 OK):**
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
      "created_at": "2025-01-01T12:00:00Z",
      "updated_at": "2025-01-02T12:00:00Z"
    },
    {
      "id": "uuid2",
      "name": "Personal Tasks",
      "description": "My personal tasks",
      "owner_id": "user_uuid",
      "is_personal": true,
      "created_at": "2025-01-01T12:00:00Z",
      "updated_at": "2025-01-02T12:00:00Z"
    }
  ]
}
```

### Create Board

```
POST /api/v1/boards
```

Create a new board.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Description of the new project",
  "is_personal": false,
  "columns": [
    {
      "name": "To Do",
      "position": 0,
      "color": "#FF0000"
    },
    {
      "name": "In Progress",
      "position": 1,
      "color": "#00FF00"
    },
    {
      "name": "Done",
      "position": 2,
      "color": "#0000FF"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "name": "New Project",
  "description": "Description of the new project",
  "owner_id": "user_uuid",
  "is_personal": false,
  "created_at": "2025-01-03T12:00:00Z",
  "updated_at": "2025-01-03T12:00:00Z",
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
  ]
}
```

### Get Board Details

```
GET /api/v1/boards/{boardId}
```

Get details of a specific board including columns and members.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "id": "uuid",
  "name": "Project Alpha",
  "description": "Main project board",
  "owner_id": "user_uuid",
  "is_personal": false,
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-02T12:00:00Z",
  "columns": [
    {
      "id": "col1",
      "name": "To Do",
      "position": 0,
      "color": "#FF0000",
      "card_count": 5
    },
    {
      "id": "col2",
      "name": "In Progress",
      "position": 1,
      "color": "#00FF00",
      "card_count": 3
    },
    {
      "id": "col3",
      "name": "Done",
      "position": 2,
      "color": "#0000FF",
      "card_count": 12
    }
  ],
  "members": [
    {
      "user_id": "user_uuid1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "owner",
      "avatar_url": "https://example.com/avatars/john.jpg"
    },
    {
      "user_id": "user_uuid2",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "member",
      "avatar_url": "https://example.com/avatars/jane.jpg"
    }
  ],
  "labels": [
    {
      "id": "label1",
      "name": "Bug",
      "color": "#FF0000"
    },
    {
      "id": "label2",
      "name": "Feature",
      "color": "#00FF00"
    },
    {
      "id": "label3",
      "name": "Documentation",
      "color": "#0000FF"
    }
  ]
}
```

**Error Responses:**
- 403 Forbidden - User doesn't have access to this board
- 404 Not Found - Board doesn't exist

### Update Board

```
PUT /api/v1/boards/{boardId}
```

Update board details.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated project description"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "name": "Updated Project Name",
  "description": "Updated project description",
  "updated_at": "2025-01-04T12:00:00Z"
}
```

**Error Responses:**
- 403 Forbidden - User doesn't have permission to update this board
- 404 Not Found - Board doesn't exist

### Delete Board

```
DELETE /api/v1/boards/{boardId}
```

Delete a board and all associated data.

**Headers:**
- Authorization: Bearer {token}

**Response (204 No Content)**

**Error Responses:**
- 403 Forbidden - User doesn't have permission to delete this board
- 404 Not Found - Board doesn't exist

### Add Board Member

```
POST /api/v1/boards/{boardId}/members
```

Add a member to a board.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "email": "new_member@example.com",
  "role": "member" // Options: member, observer
}
```

**Response (201 Created):**
```json
{
  "user_id": "user_uuid3",
  "name": "New Member",
  "email": "new_member@example.com",
  "role": "member",
  "avatar_url": "https://example.com/avatars/new_member.jpg",
  "added_at": "2025-01-05T12:00:00Z"
}
```

**Error Responses:**
- 400 Bad Request - User already a member or invalid email
- 403 Forbidden - Not authorized to add members
- 404 Not Found - Board doesn't exist or user not found

### Manage Columns

```
PUT /api/v1/boards/{boardId}/columns
```

Update, add, or reorder columns.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "columns": [
    {
      "id": "col1", // Include id for existing columns
      "name": "Backlog",
      "position": 0,
      "color": "#FF0000"
    },
    {
      "name": "Ready", // No id means new column
      "position": 1,
      "color": "#FFFF00"
    },
    {
      "id": "col2",
      "name": "In Progress",
      "position": 2,
      "color": "#00FF00"
    },
    {
      "id": "col3",
      "name": "Done",
      "position": 3,
      "color": "#0000FF"
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "columns": [
    {
      "id": "col1",
      "name": "Backlog",
      "position": 0,
      "color": "#FF0000"
    },
    {
      "id": "col4", // New column with generated id
      "name": "Ready",
      "position": 1,
      "color": "#FFFF00"
    },
    {
      "id": "col2",
      "name": "In Progress",
      "position": 2,
      "color": "#00FF00"
    },
    {
      "id": "col3",
      "name": "Done",
      "position": 3,
      "color": "#0000FF"
    }
  ],
  "updated_at": "2025-01-05T12:00:00Z"
}
```

## Cards API (Board Service)

### List Cards on Board

```
GET /api/v1/boards/{boardId}/cards
```

Get all cards on a specific board.

**Headers:**
- Authorization: Bearer {token}

**Query Parameters:**
- `column_id` - Filter by column
- `assignee_id` - Filter by assignee
- `label_id` - Filter by label
- `search` - Search in title and description
- `due_date` - Filter by due date (overdue, today, this_week, next_week)
- `limit` - Number of items per page (default: 50)
- `offset` - Pagination offset (default: 0)

**Response (200 OK):**
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
      "due_date": "2025-02-01T12:00:00Z",
      "created_by": "user_uuid",
      "created_at": "2025-01-01T12:00:00Z",
      "updated_at": "2025-01-02T12:00:00Z",
      "assignees": [
        {
          "user_id": "user_uuid1",
          "name": "John Doe",
          "avatar_url": "https://example.com/avatars/john.jpg"
        }
      ],
      "labels": [
        {
          "id": "label1",
          "name": "Backend",
          "color": "#0000FF"
        }
      ],
      "attachment_count": 2,
      "comment_count": 5
    }
  ]
}
```

### Get Card Details

```
GET /api/v1/cards/{cardId}
```

Get detailed information about a card.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "id": "card1",
  "title": "Implement login",
  "description": "Create login functionality with support for:\n- Email/password\n- OAuth providers\n- 2FA",
  "column_id": "col1",
  "position": 0,
  "due_date": "2025-02-01T12:00:00Z",
  "created_by": {
    "user_id": "user_uuid",
    "name": "John Doe",
    "avatar_url": "https://example.com/avatars/john.jpg"
  },
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-02T12:00:00Z",
  "assignees": [
    {
      "user_id": "user_uuid1",
      "name": "John Doe",
      "avatar_url": "https://example.com/avatars/john.jpg"
    }
  ],
  "labels": [
    {
      "id": "label1",
      "name": "Backend",
      "color": "#0000FF"
    }
  ],
  "attachments": [
    {
      "id": "attach1",
      "file_name": "auth_flow.png",
      "file_size": 153600,
      "mime_type": "image/png",
      "uploaded_by": "user_uuid",
      "uploaded_at": "2025-01-01T14:30:00Z",
      "download_url": "https://example.com/api/v1/attachments/attach1"
    },
    {
      "id": "attach2",
      "file_name": "requirements.pdf",
      "file_size": 2097152,
      "mime_type": "application/pdf",
      "uploaded_by": "user_uuid2",
      "uploaded_at": "2025-01-02T09:15:00Z",
      "download_url": "https://example.com/api/v1/attachments/attach2"
    }
  ],
  "comments": [
    {
      "id": "comment1",
      "content": "We should consider using JWT for authentication.",
      "created_by": {
        "user_id": "user_uuid2",
        "name": "Jane Smith",
        "avatar_url": "https://example.com/avatars/jane.jpg"
      },
      "created_at": "2025-01-01T15:30:00Z",
      "updated_at": null
    },
    {
      "id": "comment2",
      "content": "Good idea @Jane. I'll implement that.",
      "created_by": {
        "user_id": "user_uuid1",
        "name": "John Doe",
        "avatar_url": "https://example.com/avatars/john.jpg"
      },
      "created_at": "2025-01-01T16:00:00Z",
      "updated_at": null
    }
  ],
  "activity": [
    {
      "id": "activity1",
      "type": "card_created",
      "user": {
        "user_id": "user_uuid",
        "name": "John Doe"
      },
      "timestamp": "2025-01-01T12:00:00Z"
    },
    {
      "id": "activity2",
      "type": "assignee_added",
      "user": {
        "user_id": "user_uuid",
        "name": "John Doe"
      },
      "data": {
        "assignee": {
          "user_id": "user_uuid1",
          "name": "John Doe"
        }
      },
      "timestamp": "2025-01-01T12:05:00Z"
    }
  ]
}
```

### Create Card

```
POST /api/v1/boards/{boardId}/cards
```

Create a new card on a board.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "title": "New feature",
  "description": "Implement new feature X",
  "column_id": "col1",
  "position": 0,
  "due_date": "2025-03-01T12:00:00Z",
  "assignee_ids": ["user_uuid1", "user_uuid2"],
  "label_ids": ["label1", "label2"]
}
```

**Response (201 Created):**
```json
{
  "id": "card_uuid",
  "title": "New feature",
  "description": "Implement new feature X",
  "column_id": "col1",
  "position": 0,
  "due_date": "2025-03-01T12:00:00Z",
  "created_by": "current_user_uuid",
  "created_at": "2025-01-04T12:00:00Z",
  "updated_at": "2025-01-04T12:00:00Z",
  "assignees": [
    {
      "user_id": "user_uuid1",
      "name": "John Doe",
      "avatar_url": "https://example.com/avatars/john.jpg"
    },
    {
      "user_id": "user_uuid2",
      "name": "Jane Smith",
      "avatar_url": "https://example.com/avatars/jane.jpg"
    }
  ],
  "labels": [
    {
      "id": "label1",
      "name": "Backend",
      "color": "#0000FF"
    },
    {
      "id": "label2",
      "name": "Urgent",
      "color": "#FF0000"
    }
  ]
}
```

### Update Card

```
PUT /api/v1/cards/{cardId}
```

Update card details.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "title": "Updated feature name",
  "description": "Updated description with more details",
  "due_date": "2025-03-15T12:00:00Z",
  "assignee_ids": ["user_uuid1", "user_uuid3"],
  "label_ids": ["label2", "label3"]
}
```

**Response (200 OK):**
```json
{
  "id": "card_uuid",
  "title": "Updated feature name",
  "description": "Updated description with more details",
  "column_id": "col1", // Unchanged
  "position": 0, // Unchanged
  "due_date": "2025-03-15T12:00:00Z",
  "created_by": "current_user_uuid",
  "created_at": "2025-01-04T12:00:00Z",
  "updated_at": "2025-01-05T14:00:00Z",
  "assignees": [
    {
      "user_id": "user_uuid1",
      "name": "John Doe",
      "avatar_url": "https://example.com/avatars/john.jpg"
    },
    {
      "user_id": "user_uuid3",
      "name": "Alice Johnson",
      "avatar_url": "https://example.com/avatars/alice.jpg"
    }
  ],
  "labels": [
    {
      "id": "label2",
      "name": "Urgent",
      "color": "#FF0000"
    },
    {
      "id": "label3",
      "name": "Documentation",
      "color": "#00FFFF"
    }
  ]
}
```

### Move Card

```
PUT /api/v1/cards/{cardId}/position
```

Move card between columns or reorder within a column.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "column_id": "col2",
  "position": 1
}
```

**Response (200 OK):**
```json
{
  "id": "card_uuid",
  "column_id": "col2",
  "position": 1,
  "updated_at": "2025-01-05T12:00:00Z"
}
```

### Delete Card

```
DELETE /api/v1/cards/{cardId}
```

Delete a card.

**Headers:**
- Authorization: Bearer {token}

**Response (204 No Content)**

**Error Responses:**
- 403 Forbidden - Not authorized to delete this card
- 404 Not Found - Card doesn't exist

### Add Comment

```
POST /api/v1/cards/{cardId}/comments
```

Add a comment to a card.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "content": "This is a comment with some *markdown* and a @mention to #jane.smith"
}
```

**Response (201 Created):**
```json
{
  "id": "comment_uuid",
  "content": "This is a comment with some *markdown* and a @mention to #jane.smith",
  "created_by": {
    "user_id": "current_user_uuid",
    "name": "Current User",
    "avatar_url": "https://example.com/avatars/current_user.jpg"
  },
  "created_at": "2025-01-05T16:30:00Z",
  "updated_at": null,
  "mentions": [
    {
      "user_id": "user_uuid2",
      "name": "Jane Smith"
    }
  ]
}
```

## File API (File Service)

### Upload Attachment

```
POST /api/v1/cards/{cardId}/attachments
```

Upload a file attachment to a card.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: multipart/form-data

**Request Body:**
```
file: [binary file data]
description: "Optional file description"
```

**Response (201 Created):**
```json
{
  "id": "attachment_uuid",
  "file_name": "design.png",
  "file_size": 1048576,
  "mime_type": "image/png",
  "description": "Optional file description",
  "uploaded_by": {
    "user_id": "current_user_uuid",
    "name": "Current User"
  },
  "uploaded_at": "2025-01-05T14:30:00Z",
  "download_url": "https://example.com/api/v1/attachments/attachment_uuid"
}
```

**Error Responses:**
- 400 Bad Request - File too large or invalid type
- 403 Forbidden - Not authorized to upload to this card
- 404 Not Found - Card doesn't exist

### Download Attachment

```
GET /api/v1/attachments/{attachmentId}
```

Download an attachment.

**Headers:**
- Authorization: Bearer {token}

**Response:**
- Binary file data with appropriate Content-Type header
- Content-Disposition: attachment; filename="design.png"

**Error Responses:**
- 403 Forbidden - Not authorized to access this file
- 404 Not Found - Attachment doesn't exist

### Delete Attachment

```
DELETE /api/v1/attachments/{attachmentId}
```

Delete an attachment.

**Headers:**
- Authorization: Bearer {token}

**Response (204 No Content)**

**Error Responses:**
- 403 Forbidden - Not authorized to delete this attachment
- 404 Not Found - Attachment doesn't exist

## Notifications API (Notification Service)

### List Notifications

```
GET /api/v1/notifications
```

Get notifications for the current user.

**Headers:**
- Authorization: Bearer {token}

**Query Parameters:**
- `read` - Filter by read status (true/false)
- `type` - Filter by notification type
- `limit` - Number of items per page (default: 20)
- `offset` - Pagination offset (default: 0)

**Response (200 OK):**
```json
{
  "total": 15,
  "unread_count": 3,
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
      "created_at": "2025-01-05T10:30:00Z"
    },
    {
      "id": "notif2",
      "type": "card_due_soon",
      "content": {
        "card_id": "card2",
        "card_title": "Design database",
        "board_id": "board1",
        "board_name": "Project Alpha",
        "due_date": "2025-01-06T23:59:59Z"
      },
      "is_read": true,
      "created_at": "2025-01-05T08:00:00Z"
    },
    {
      "id": "notif3",
      "type": "comment_mentioned",
      "content": {
        "card_id": "card1",
        "card_title": "Implement login",
        "board_id": "board1",
        "board_name": "Project Alpha",
        "comment_by": "John Doe",
        "comment_preview": "We should ask @Current User about..."
      },
      "is_read": false,
      "created_at": "2025-01-04T16:45:00Z"
    }
  ]
}
```

### Mark Notification as Read

```
PUT /api/v1/notifications/{notificationId}/read
```

Mark a notification as read.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "id": "notif1",
  "is_read": true,
  "updated_at": "2025-01-05T11:00:00Z"
}
```

### Mark All Notifications as Read

```
PUT /api/v1/notifications/read-all
```

Mark all notifications as read.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "marked_count": 3,
  "updated_at": "2025-01-05T11:00:00Z"
}
```

## Admin API (Auth Service)

### List Users (Admin only)

```
GET /api/v1/admin/users
```

Get all users in the system.

**Headers:**
- Authorization: Bearer {token}

**Query Parameters:**
- `active` - Filter by user active status (true/false)
- `search` - Search by name or email
- `limit` - Number of items per page (default: 20)
- `offset` - Pagination offset (default: 0)

**Response (200 OK):**
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
      "created_at": "2025-01-01T12:00:00Z",
      "last_login": "2025-01-05T09:30:00Z",
      "has_2fa": true,
      "roles": ["user"]
    },
    {
      "id": "user_uuid2",
      "email": "admin@example.com",
      "name": "Admin User",
      "language": "en",
      "active": true,
      "created_at": "2025-01-01T12:00:00Z",
      "last_login": "2025-01-05T14:20:00Z",
      "has_2fa": true,
      "roles": ["user", "admin"]
    }
  ]
}
```

### Create User (Admin only)

```
POST /api/v1/admin/users
```

Create a new user.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "SecurePassword123", // Optional, will generate and send if omitted
  "language": "en",
  "roles": ["user"],
  "send_welcome_email": true
}
```

**Response (201 Created):**
```json
{
  "id": "user_uuid3",
  "email": "newuser@example.com",
  "name": "New User",
  "language": "en",
  "active": true,
  "created_at": "2025-01-06T10:00:00Z",
  "roles": ["user"],
  "welcome_email_sent": true
}
```

### Update User (Admin only)

```
PUT /api/v1/admin/users/{userId}
```

Update a user.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "name": "Updated Name",
  "active": false,
  "roles": ["user", "admin"]
}
```

**Response (200 OK):**
```json
{
  "id": "user_uuid3",
  "email": "newuser@example.com", // Unchanged
  "name": "Updated Name",
  "language": "en", // Unchanged
  "active": false,
  "updated_at": "2025-01-06T11:00:00Z",
  "roles": ["user", "admin"]
}
```

### System Settings (Admin only)

```
GET /api/v1/admin/system/settings
```

Get system settings.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
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
  "max_file_size_mb": 100,
  "allowed_file_types": ["image/*", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/zip"],
  "logo_url": "https://example.com/logo.png",
  "security": {
    "password_min_length": 10,
    "password_require_uppercase": true,
    "password_require_lowercase": true,
    "password_require_numbers": true,
    "password_require_special": true,
    "max_login_attempts": 5,
    "require_2fa_for_admins": true
  }
}
```

### Update System Settings (Admin only)

```
PUT /api/v1/admin/system/settings
```

Update system settings.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "smtp": {
    "host": "smtp.newprovider.com",
    "port": 465,
    "username": "notifications@example.com",
    "password": "SmtpPassword123",
    "from_email": "notifications@example.com",
    "from_name": "Updated Notifications"
  },
  "max_file_size_mb": 50,
  "security": {
    "max_login_attempts": 3,
    "require_2fa_for_admins": true
  }
}
```

**Response (200 OK):**
```json
{
  "smtp": {
    "host": "smtp.newprovider.com",
    "port": 465,
    "username": "notifications@example.com",
    "from_email": "notifications@example.com",
    "from_name": "Updated Notifications"
  },
  "telegram_bot_enabled": true, // Unchanged
  "max_file_size_mb": 50,
  "allowed_file_types": ["image/*", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/zip"], // Unchanged
  "logo_url": "https://example.com/logo.png", // Unchanged
  "security": {
    "password_min_length": 10, // Unchanged
    "password_require_uppercase": true, // Unchanged
    "password_require_lowercase": true, // Unchanged
    "password_require_numbers": true, // Unchanged
    "password_require_special": true, // Unchanged
    "max_login_attempts": 3,
    "require_2fa_for_admins": true
  },
  "updated_at": "2025-01-06T14:00:00Z"
}
```

### System Health (Admin only)

```
GET /api/v1/admin/system/health
```

Get system health status.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-06T16:00:00Z",
  "services": {
    "auth_service": {
      "status": "healthy",
      "version": "0.8.0",
      "uptime": "5d 2h 15m"
    },
    "user_service": {
      "status": "healthy",
      "version": "0.8.0",
      "uptime": "5d 2h 10m"
    },
    "board_service": {
      "status": "healthy",
      "version": "0.8.0",
      "uptime": "5d 2h 8m"
    },
    "notification_service": {
      "status": "healthy",
      "version": "0.8.0",
      "uptime": "5d 2h 5m"
    },
    "file_service": {
      "status": "healthy",
      "version": "0.8.0",
      "uptime": "5d 2h 3m"
    }
  },
  "databases": {
    "postgresql": {
      "status": "healthy",
      "version": "14.5",
      "connections": 24
    },
    "redis": {
      "status": "healthy",
      "version": "7.0.5",
      "memory_usage": "45%"
    }
  },
  "queue": {
    "rabbitmq": {
      "status": "healthy",
      "version": "3.10.0",
      "queued_messages": 5
    }
  }
}
```

## Health Check API (All Services)

### Service Health Check

```
GET /api/v1/health
```

Get basic health status of a service.

**Response (200 OK):**
```json
{
  "status": "healthy",
  "service": "auth_service",
  "version": "0.8.0",
  "timestamp": "2025-01-06T16:30:00Z"
}
```

### Service Diagnostic

```
GET /api/v1/health/diagnostic
```

Get detailed diagnostic information (admin only).

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "status": "healthy",
  "service": "auth_service",
  "version": "0.8.0",
  "build": "2025-01-01T10:00:00Z",
  "uptime": "5d 6h 30m",
  "memory_usage": {
    "rss": "120MB",
    "heapTotal": "80MB",
    "heapUsed": "65MB",
    "external": "10MB"
  },
  "cpu_usage": "2.5%",
  "connections": {
    "database": "connected",
    "redis": "connected",
    "rabbitmq": "connected"
  },
  "environment": "production",
  "node_version": "18.15.0",
  "timestamp": "2025-01-06T16:30:00Z"
}
```