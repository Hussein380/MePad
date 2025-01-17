# Meeting Management System API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All API routes (except registration and login) require JWT token in the header:
```
Authorization: Bearer <your_token>
```

## 1. Authentication Endpoints

### Register User
```http
POST /auth/register
```
**Request Body:**
```json
{
    "email": "user@example.com",
    "password": "123456",
    "role": "admin" // or "participant"
}
```
**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "user_id",
        "email": "user@example.com",
        "role": "admin",
        "token": "jwt_token"
    }
}
```

### Login
```http
POST /auth/login
```
**Request Body:**
```json
{
    "email": "user@example.com",
    "password": "123456"
}
```
**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "user_id",
        "email": "user@example.com",
        "role": "admin",
        "token": "jwt_token",
        "dashboardData": {
            "upcomingMeetings": [],
            "recentPainPoints": [],
            "type": "admin"
        }
    }
}
```

### Delete User (Admin Only)
```http
DELETE /auth/users/:id
```
**Response:**
```json
{
    "success": true,
    "data": {}
}
```

## 2. Meeting Endpoints

### Create Meeting (Admin Only)
```http
POST /meetings
```
**Request Body:**
```json
{
    "title": "Team Meeting",
    "description": "Weekly team sync",
    "date": "2024-01-20T10:00:00Z",
    "duration": 60,
    "participants": ["participant_id1", "participant_id2"]
}
```
**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "meeting_id",
        "title": "Team Meeting",
        "description": "Weekly team sync",
        "date": "2024-01-20T10:00:00Z",
        "duration": 60,
        "status": "scheduled",
        "createdBy": "admin_id",
        "participants": ["participant_id1", "participant_id2"],
        "painPoints": []
    }
}
```

### Get All Meetings
```http
GET /meetings
```
**Response:**
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "meeting_id",
            "title": "Team Meeting",
            "description": "Weekly team sync",
            "date": "2024-01-20T10:00:00Z",
            "duration": 60,
            "status": "scheduled",
            "createdBy": {
                "_id": "user_id",
                "email": "admin@example.com"
            },
            "participants": [],
            "painPoints": [],
            "tasks": []
        }
    ]
}
```

### Get Single Meeting
```http
GET /meetings/:id
```
**Response:** Same as single meeting object above

### Delete Meeting (Admin Only)
```http
DELETE /meetings/:id
```
**Response:**
```json
{
    "success": true,
    "data": {}
}
```

## 3. Task Endpoints

### Create Task
```http
POST /meetings/:meetingId/tasks
```
**Request Body:**
```json
{
    "title": "Update Documentation",
    "description": "Add API documentation",
    "priority": "high",
    "deadline": "2024-01-25T18:00:00Z",
    "assignedTo": "user_id"
}
```
**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "task_id",
        "title": "Update Documentation",
        "description": "Add API documentation",
        "status": "pending",
        "priority": "high",
        "deadline": "2024-01-25T18:00:00Z",
        "assignedTo": {
            "_id": "user_id",
            "email": "user@example.com"
        },
        "createdBy": {
            "_id": "admin_id",
            "email": "admin@example.com"
        }
    }
}
```

### Update Task Status
```http
PUT /tasks/:taskId
```
**Request Body:**
```json
{
    "status": "in-progress" // or "completed", "pending"
}
```
**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "task_id",
        "status": "in-progress",
        // ... other task fields
    }
}
```

### Delete Task (Admin Only)
```http
DELETE /tasks/:id
```
**Response:**
```json
{
    "success": true,
    "data": {}
}
```

## 4. Pain Points (Admin Only)

### Add Pain Point
```http
POST /meetings/:id/painpoints
```
**Request Body:**
```json
{
    "title": "Communication Gap",
    "description": "Team updates not regular",
    "severity": "high"
}
```
**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "painpoint_id",
        "title": "Communication Gap",
        "description": "Team updates not regular",
        "severity": "high",
        "status": "identified",
        "addedBy": "admin_id",
        "addedAt": "2024-01-16T15:42:17.317Z"
    }
}
```

## 5. Dashboard Endpoints

### Get Admin Dashboard
```http
GET /dashboard/admin
```
**Response:**
```json
{
    "success": true,
    "data": {
        "stats": {
            "totalMeetings": 5,
            "upcomingMeetings": 3,
            "totalPainPoints": 2,
            "totalTasks": 8
        },
        "meetings": []
    }
}
```

### Get Participant Dashboard
```http
GET /dashboard/participant
```
**Response:**
```json
{
    "success": true,
    "data": {
        "stats": {
            "upcomingMeetings": 2,
            "completedMeetings": 1,
            "pendingTasks": 3,
            "completedTasks": 2
        },
        "meetings": [],
        "tasks": []
    }
}
```

## 6. Onboarding Endpoints

### Get Admin Onboarding
```http
GET /dashboard/admin/onboarding
```
**Response:**
```json
{
    "success": true,
    "data": {
        "welcomeMessage": "Welcome to Meeting Management System",
        "quickActions": [
            {
                "title": "Create Meeting",
                "endpoint": "/api/meetings",
                "method": "POST"
            }
        ],
        "stats": {
            "totalMeetings": 0,
            "pendingTasks": 0
        }
    }
}
```

### Get Participant Onboarding
```http
GET /dashboard/participant/onboarding
```
**Response:**
```json
{
    "success": true,
    "data": {
        "welcomeMessage": "Welcome to Your Meeting Dashboard",
        "upcomingMeetings": [],
        "pendingTasks": [],
        "actions": [
            {
                "title": "View Meetings",
                "endpoint": "/api/meetings",
                "method": "GET"
            }
        ]
    }
}
```

## Error Responses
All endpoints return error responses in this format:
```json
{
    "success": false,
    "error": {
        "message": "Error description here"
    }
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
