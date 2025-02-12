# UpdateProduct

This project is a REST API built with **Node.js**, **Express**, and **MongoDB** that allows updating products stored in the database.

## Technologies Used
- Node.js
- Express
- MongoDB (Mongoose)
- Body-parser
- CORS
- Docker (for containerization)

## Installation

1. Install dependencies:
   ```sh
   npm install
   snpm install cors
   npm install express
   ```
 
2. Configure the database:
   - Set the environment variable `MONGO_URI` or use the default: `mongodb://localhost:27017/db_products`.

## Usage

### Start the application locally
```sh
node app.js
```

The API will be available at: `http://localhost:3012`

### Endpoints

#### Update a product by ID
**PUT** `/products/:id`

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 25.99,
  "category": "New Category",
  "stock": 15,
  "image": "https://example.com/new-image.jpg"
}
```

**Response:**
```json
{
  "message": "Producto actualizado exitosamente",
  "updatedProduct": {
    "_id": "65a123456789",
    "name": "Updated Product Name",
    "price": 25.99,
    "category": "New Category",
    "stock": 15,
    "image": "https://example.com/new-image.jpg"
  }
}
```

## Dockerization

You can run the application inside a Docker container:

1. Build the image:
   ```sh
   docker build -t updateproduct .
   ```
2. Run the container:
   ```sh
   docker run -p 3012:3012 updateproduct
   ```


