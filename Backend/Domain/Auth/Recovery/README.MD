# Recovery Microservice

## Overview
This microservice provides a password recovery system, allowing users to generate and validate a recovery code before resetting their password.

## Technologies Used
- **Node.js** (Runtime environment)
- **Express.js** (Web framework)
- **MySQL** (Database)
- **dotenv** (Environment variable management)
- **cors** (Cross-Origin Resource Sharing support)
- **jsonwebtoken** (JWT authentication)
- **nodemailer** (Email sending, if needed for future expansion)
- **nodemon** (For development auto-restart)

## Installation

1.Install dependencies:
   ```sh
   npm install

   npm install mysql2 dotenv

   npm install cors

   npm install --save-dev nodemon
   ```

2.Set up the `.env` file:
   ```sh
   DB_HOST=auth_db
   DB_USER=admin
   DB_PASSWORD=adminpass
   DB_NAME=auth_db
   JWT_SECRET=secreto
   PORT=4014
   ```

3.Run the application in development mode:

   ```sh
   npm run dev
   ```
   Or start it normally:
   ```sh
   npm start
   ```

## API Endpoints

### 1. Generate Recovery Code
**Endpoint:** `POST /recovery`
- **Description:** Generates a 6-digit recovery code and stores it in the database.
- **Request Body:**
  ```json
  {
    "username": "user123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Code generated successfully",
    "recoveryCode": 123456
  }
  ```

### 2. Reset Password
**Endpoint:** `POST /reset-password`
- **Description:** Verifies the recovery code and updates the password.
- **Request Body:**
  ```json
  {
    "username": "user123",
    "recoveryCode": 123456,
    "newPassword": "newSecurePass"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password changed successfully"
  }
  ```

## Running with Docker

1. Build the Docker image:
   ```sh
   docker build -t recovery-service .
   ```

2. Run the container:
   ```sh
   docker run -p 4014:4014 --env-file .env recovery-service
   ```

## License
This project is licensed under the ISC License.

