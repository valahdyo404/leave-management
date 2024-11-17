
# Leave Management System

A full-stack leave management system built with NestJS (Backend) and Next.js (Frontend).

## Development Setup

  

### Prerequisites

- Docker and Docker Compose

- Node.js 18+ (for local development)

- Git

  

### Quick Start with Docker

```bash

git  clone <repository-url>

cp  backend/.env-example  backend/.env

cp  frontend/.env-example  frontend/.env

docker-compose  up  -d

```

  

## The services will be available at:

Frontend: http://localhost:4000

Backend API: http://localhost:3000

  
  

### Quick Start without Docker

```bash

cd  backend

npm  install

npm  run  prisma:generate

npm  run  prisma:migrate

npm  run  prisma:seed

npm  run  start:dev

```

  

```bash

cd  frontend

npm  install

npm  run  dev

```

  

## API Docs
#### Swagger Docs 
```localhost:3000/api/docs```
#### Authentication Endpoints
##### POST /api/auth/login
```
Request body:
{
"email": "string",
"password": "string"
}


Response:
{
"user": {
"id": "number",
"email": "string",
"firstName": "string",
"lastName": "string",
"role": "ADMIN | EMPLOYEE"
},
"accessToken": "string"
}
````

##### POST /api/auth/register
```
{
"firstName": "string",
"lastName": "string",
"email": "string",
"password": "string",
"dateOfBirth": "date",
"gender": "string"
}
```

##### GET /api/users
##### GET /api/users/profile
##### GET /api/users/:id
##### PATCH /api/users/:id
```
Request body:
{
"firstName": "string?",
"lastName": "string?",
"email": "string?",
"phoneNumber": "string?",
"address": "string?",
"dateOfBirth": "date?",
"gender": "string?"
}
```

##### DELETE /api/users/:id
##### POST /api/users/:id/change-password
```
Request body:
{
"currentPassword": "string",
"newPassword": "string"
}
```
#### Leave Management Endpoints
##### GET /api/leaves
##### GET /api/leaves/summary
```
Response:
{
"totalLeaveBalance": "number",
"leavesUsed": "number",
"remainingLeaves": "number",
"leaveHistory": "array
}
```
##### GET /api/leaves/:id
#### POST /api/leaves
```
Request body:
{
"reason": "string",
"startDate": "date",
"endDate": "date"
}
```
##### PATCH /api/leaves/:id
```
Request body:
{
"reason": "string?",
"startDate": "date?",
"endDate": "date?",
"status": "PENDING | APPROVED | REJECTED"
}
```

##### DELETE /api/leaves/:id

#### Authentication
All endpoints except /auth/login and /auth/register require authentication using Bearer token:
Authorization: Bearer <access_token>