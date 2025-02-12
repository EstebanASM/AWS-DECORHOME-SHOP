# GetProductID Microservice

This microservice provides an endpoint to retrieve a product by its ID from a **MongoDB** database using **Node.js** and **Express**.

## Requirements

To run this project, you need to have the following tools installed:

- **Node.js** 
- **MongoDB** 

## Installation

1.Install the project dependencies:
   ```bash
   npm install
   npm install cors
   npm install express
   ```

2.Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/db_products
   PORT=3013
   ```
   If you are using a remote MongoDB database, replace `MONGO_URI` with the appropriate connection string.

3.Run the project in development mode:
   ```bash
   node app.js
   ```
   The server will start on port `3013` by default.

## Functionality

### `GET /products/:id`

- **Description**: Retrieves a product by its ID.
- **Requires**:
  - `id`: The MongoDB ObjectId of the product.
- **Responses**:
  - **200 OK**: Returns the product data.
  - **404 Not Found**: If the product does not exist.
  - **500 Internal Server Error**: If there is an issue retrieving the product.

## Docker

To run this microservice inside a Docker container, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t get-product-service .
   ```

2. Run the container:
   ```bash
   docker run -p 3013:3013 get-product-service
   ```

This will expose the service on port `3013`.

## Dependencies

This microservice uses the following dependencies:

- **express**: A web framework for Node.js.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **mongoose**: ODM for MongoDB.
- **body-parser**: Middleware for parsing request bodies.

## Project Structure

- `app.js`: Contains the main server logic, including the database connection and request handling.
- `Dockerfile`: Configuration for building and running the service in a Docker container.
- `package.json`: Defines the dependencies and startup scripts.

---

This README provides the necessary details to install, configure, and run the **Get Product by ID** microservice. Let me know if you need any modifications!

