# Create Product

This microservice allows the creation of products using **Express.js** and **MongoDB**.

## 📌 Features
- REST API built with **Express.js**.
- Uses **MongoDB** for data storage.
- Enables **CORS** to allow cross-origin requests.
- Supports **JSON** data processing.
- Includes Docker support for containerization.

## 🛠️ Installation

# Install dependencies:
   ```sh
   npm install
   npm install cors
   npm install express
   ```

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the MongoDB connection:
```env
MONGO_URI=mongodb://your_username:your_password@localhost:27017/your_database
```

## 🚀 Running the Server

Start the server using:
```sh
node app.js
```
The server will run at: `http://localhost:3000`

## 📝 API Endpoints

### Create a Product
**Endpoint:**
```http
POST /products
```
**Request Body (JSON):**
```json
{
  "name": "Sample Product",
  "price": 25.99,
  "description": "A great product",
  "category": "Electronics",
  "stock": 100,
  "image": "https://example.com/image.jpg"
}
```
**Response (201 Created):**
```json
{
  "_id": "65a12345abcd1234567890",
  "name": "Sample Product",
  "price": 25.99,
  "description": "A great product",
  "category": "Electronics",
  "stock": 100,
  "image": "https://example.com/image.jpg",
  "__v": 0
}
```

## 🐳 Running with Docker

1. Build the Docker image:
   ```sh
   docker build -t create-product-api .
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 --env-file .env create-product-api
   ```

## 📌 Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **CORS & Body-parser**
- **Docker**

---

Ready to use! 🚀

