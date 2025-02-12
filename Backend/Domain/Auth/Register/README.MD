# Registration Microservice

## Overview
This microservice provides an API for user registration. It validates user data, checks for duplicate accounts, and stores new user records in a MySQL database. The service is built with Node.js, Express, and MySQL.

## Features
- Registers new users with a username, email, and password.
- Validates email addresses using `validator`.
- Prevents duplicate usernames or emails.
- Stores user data in a MySQL database.
- Uses environment variables for configuration.

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for handling HTTP requests.
- **MySQL2**: Library for MySQL database interaction.
- **Dotenv**: Manages environment variables.
- **Cors**: Enables cross-origin resource sharing.
- **Validator**: Validates email format.

## Installation

### Prerequisites
- Node.js (version 16 or later)
- MySQL database
- Docker (optional for containerization)

### Steps
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd auth-register
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```sh
   DB_HOST=auth_db
   DB_USER=admin
   DB_PASSWORD=adminpass
   DB_NAME=auth_db
   JWT_SECRET=secreto
   PORT=4013
   ```
4. Start the service:
   ```sh
   npm start
   ```
   For development mode with automatic restarts:
   ```sh
   npm run dev
   ```

## API Endpoints

### Register a New User
- **Endpoint:** `POST /register`
- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "✅ User registered successfully"
  }
  ```
- **Errors:**
  - `400`: Missing fields or invalid email.
  - `400`: Username or email already exists.
  - `500`: Server error.

## Running with Docker
This microservice can be containerized using Docker.

1. Build the Docker image:
   ```sh
   docker build -t auth-register .
   ```
2. Run the container:
   ```sh
   docker run -p 4013:4013 --env-file .env auth-register
   ```

## License
This project is licensed under the ISC License.

---
**Developed with ❤️ using Node.js and MySQL.**

