# Delete Product 

This API allows users to retrieve and delete products from a MongoDB database using Express.js and Mongoose.

## 📌 Features
- Retrieve all products from the database.
- Delete a product by its ID.
- Uses MongoDB as the database.
- CORS enabled for cross-origin requests.

## 🛠️ Installation

# Install dependencies:
   ```sh
   npm install
   npm install cors
   npm install express
   ```

## ⚙️ Environment Variables
Create a `.env` file in the root directory and configure your MongoDB connection:
```env
MONGO_URI=mongodb://localhost:27017/db_products
```

## 🚀 Running the Server
Start the server with the following command:
```sh
node app.js
```
By default, the server runs on `http://localhost:3011`

## 📌 API Endpoints

### Get All Products
**GET** `/products`

**Response:**
```json
[
  {
    "_id": "65a123b4c567d8e9f0123456",
    "name": "Example Product",
    "price": 19.99,
    "description": "A sample product description.",
    "category": "Electronics",
    "stock": 10,
    "image": "url-to-image"
  }
]
```

### Delete a Product by ID
**DELETE** `/products/:id`

**Response:**
```json
{
  "message": "Producto eliminado exitosamente",
  "deletedProduct": {
    "_id": "65a123b4c567d8e9f0123456",
    "name": "Example Product",
    "price": 19.99
  }
}
```
If the product does not exist:
```json
{
  "message": "Producto no encontrado"
}
```

## 🛠️ Technologies Used
- Node.js
- Express.js
- Mongoose
- MongoDB
- CORS
- Docker

## 🐳 Docker Support
To containerize this application, use the provided `Dockerfile`.

### Build and Run the Docker Container
```sh
docker build -t deleteproduct .
docker run -p 3011:3011 deleteproduct
```

## 📌 Notes
- Ensure MongoDB is running before starting the application.
- Update `MONGO_URI` in `.env` for a production database.

---

🚀 Ready to delete products efficiently!
