const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3010;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/db_products";

// Conexión a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Definir el esquema y modelo de la colección
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  stock: { type: Number, default: 0 },
  image: { type: String }, // Nuevo campo para la imagen
});

const Product = mongoose.model("Product", productSchema);

// Ruta para obtener todos los productos (GET)
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Recupera todos los productos de la base de datos
    res.status(200).json(products); // Responde con los productos en formato JSON
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
