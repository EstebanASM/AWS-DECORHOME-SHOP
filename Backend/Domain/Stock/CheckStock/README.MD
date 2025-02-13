# Stock

Stock is a WebSocket-based API developed in **Go** that allows checking product stock in real-time using **MongoDB**.

## Technologies Used
- Go
- Gorilla WebSocket
- MongoDB (MongoDB Driver for Go)
- Docker (for containerization)

## Installation
1. Install dependencies:
   ```sh
   go mod tidy
   ```
2. Set up MongoDB connection:
   - The default MongoDB URI is `mongodb://localhost:27018`.
   - Ensure MongoDB is running with the correct database and collection.

## Usage

### Running the Application Locally
```sh
   go run main.go
```
The WebSocket server will be available at: `ws://localhost:8080`

### WebSocket Endpoint

#### Check Product Stock
**WebSocket Connection** `/check-stock`

**Request Format:**
```json
{
  "product_id": "123456"
}
```

**Response Format:**
```json
{
  "message": "✅ Stock available: 15"
}
```
If the stock is empty:
```json
{
  "message": "❌ Stock out for product: 123456"
}
```

## Database Structure

### MongoDB Collection: `stock`

Each document has the following structure:
```json
{
  "_id": "ObjectId",
  "product_id": "123456",
  "stock": 15
}
```

## Dockerization

You can run the application inside a Docker container:

1. Build the Docker image:
   ```sh
   docker build -t stock-check .
   ```
2. Run the container:
   ```sh
   docker run -p 8080:8080 stock-check
   ```


