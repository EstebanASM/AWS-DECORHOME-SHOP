# GetProducts

This project is a REST API developed with **Node.js**, **Express**, and **MongoDB** to retrieve all stored products from the database.

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
   npm install cors
   npm install express
   ```
2. Configure the database:
   - Set the environment variable `MONGO_URI` or use the default: `mongodb://localhost:27017/db_products`.

## Usage

### Start the application locally
```sh
node app.js
```

The API will be available at: `http://localhost:3010`

### Endpoints

#### Get all products
**GET** `/products`

**Response:**
```json
[
  {
    "_id": "65a123456789",
    "name": "Sample Product",
    "price": 20.5,
    "description": "Product description",
    "category": "Category",
    "stock": 10,
    "image": "https://example.com/image.jpg"
  }
]
```

## Dockerization

You can run the application in a Docker container:

1. Build the image:
   ```sh
   docker build -t getproducts .
   ```
2. Run the container:
   ```sh
   docker run -p 3010:3010 getproducts
   ```

## License
This project is licensed under the ISC License.

``



