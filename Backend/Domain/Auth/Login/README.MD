# Login Microservice with JWT and MySQL

- This project implements a login microservice that authenticates users via JSON Web Token (JWT) and a MySQL database. The service validates user credentials and generates a JWT token if the credentials are correct.

# Requirements

To run this project, you need to have the following tools installed:

- Node.js (v18 or higher)
- MySQL (with a configured database)

# Installation
Install dependencies:

```bash
npm install

npm install mysql2 dotenv

npm install cors

npm install --save-dev nodemon
```
# Create a .env file in the root of the project and configure the following environment variables:
```bash
env
DB_HOST=auth_db
DB_USER=admin
DB_PASSWORD=adminpass
DB_NAME=auth_db
JWT_SECRET=secret
PORT=4012
```
Adjust the database values (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) based on your configuration.

# Run the project in development mode:

```bash
npm run dev
The server will listen on port 4012 by default.
```
# Functionality

- This microservice provides an endpoint for user authentication:

# POST /login
Description: Allows a user to log in by providing their username and password.

- Requires:

username: The registered username.
password: The user's password.

- Responses:

200 OK: If the credentials are correct, the server returns a JWT token and the user's role.
401 Unauthorized: If the user is not found or the password is incorrect.
400 Bad Request: If data is missing from the request.
500 Internal Server Error: In case of server errors.
The generated JWT token contains the user's id and role and has a validity of 1 hour.

# Docker
To run this microservice inside a Docker container, follow these steps:

Build the Docker image:

```bash
docker build -t login-service .
```
Run the container:
```bash
docker run -p 4012:4012 login-service
```
This will expose the service on port 4012.

# Dependencies
This microservice uses the following dependencies:

express: A web framework for Node.js.
cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
jsonwebtoken: To generate and verify JWT tokens.
mysql2: MySQL client for Node.js.
dotenv: To load environment variables from a .env file.

# Project Structure
app.js: Contains the main server logic, including the database connection and login handling.
Dockerfile: Configuration for building and running the service in a Docker container.
package.json: Defines the dependencies and startup scripts.