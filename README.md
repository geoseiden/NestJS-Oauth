# NestJS Application with JWT Authentication, RBAC, and User Management

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
  - [User Management](#user-management)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction
This is a **NestJS** application that implements JWT-based authentication and authorization. It features a Role-Based Access Control (RBAC) system and a comprehensive User Management module. The application is designed to be scalable, maintainable, and secure, making it suitable for production-ready projects.

## Features
- **JWT Authentication**: Secure login and token-based authentication.
- **Role-Based Access Control (RBAC)**: Grant specific permissions to users based on their roles.
- **User Management**: CRUD operations for managing user profiles.
- **Mongoose Integration**: MongoDB as the database with Mongoose ORM.
- **Testing**: Unit and End-to-End (E2E) tests using Jest.
- **Security**: Implements security best practices, such as password hashing and request validation.

## Technologies Used
- **NestJS**: Framework for building efficient, reliable, and scalable server-side applications.
- **JWT**: JSON Web Tokens for secure authentication.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ORM for MongoDB.
- **Passport**: Authentication middleware.
- **TypeScript**: Strongly typed programming language.

## Getting Started

### Prerequisites
- Node.js (v16.x or higher)
- npm or yarn
- MongoDB instance (local or cloud-hosted, e.g., MongoDB Atlas)

### Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600 # In seconds
NODE_ENV=development
PORT=3000
```

### Running the Application
- **Development Mode**:
  ```bash
  npm run start:dev
  ```
- **Production Mode**:
  ```bash
  npm run build
  npm run start:prod
  ```

## Usage

### Authentication
- **Login**: `/auth/login` (POST)
  - Payload:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "token": "<JWT Token>"
    }
    ```
- **Protected Routes**: Use the JWT token in the `Authorization` header as a Bearer token.

### Role-Based Access Control (RBAC)
- Assign roles to users to restrict or allow access to specific resources.
- Example:
  - Admin role can access `/users` endpoints.
  - Regular users can only access `/users/profile`.

### User Management
- **Create User**: `/users/create` (POST)
- **Get All Users**: `/users` (GET)
- **Get User by ID**: `/users/:id` (GET)
- **Update User**: `/users/update/:id` (PUT)
- **Delete User**: `/users/delete/:id` (DELETE)

## License
This project is licensed under the MIT License. See the [LICENSE]() file for details.

