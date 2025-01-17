# Node.js Authentication and Authorization with OTP

This project implements user authentication and authorization using Node.js, including the functionality to send One-Time Passwords (OTP) via email for additional security.

## Features

- User registration with email verification
- Authentication for normal users and admin users
- Authorization for normal users and admin users with role-based access
- OTP implementation for secure email verification

## Prerequisites

- Node.js
- npm (Node Package Manager)
- A valid email service (for sending OTP emails, like Gmail or SendGrid)

## Setup

Follow these steps to get the project running locally.

### 1. Clone the repository

```bash
git clone https://github.com/PratikW09/car_rental_assinment.git
cd car_rental_assinment
npm install

env file content

PORT=3000
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
OTP_EXPIRY=5m
npm start



```

## Features

- User registration with email verification
- Authentication for normal users and admin users
- Authorization for normal users and admin users with role-based access
- OTP implementation for secure email verification

## Prerequisites

- Node.js
- npm (Node Package Manager)
- A valid email service (for sending OTP emails, like Gmail or SendGrid)


## Roles
- Normal User: Can access user-related endpoints and perform user-specific actions.
- Admin User: Has access to both user-related and admin-specific routes. Admins can perform all actions, such as managing users and viewing the admin dashboard.
## Technologies Used
- Node.js for backend development
- Express.js for routing and handling HTTP requests
- JWT (JSON Web Tokens) for authentication and authorization
- Nodemailer for sending OTP emails
- dotenv for environment variable management
