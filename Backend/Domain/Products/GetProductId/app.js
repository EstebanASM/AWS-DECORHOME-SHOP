const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3013;


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

// Ruta para obtener un producto por su ID (GET)
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del producto de los parámetros de la URL
    const product = await Product.findById(id); // Busca el producto por ID en la base de datos

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" }); // Si no existe, responde con un 404
    }

    res.status(200).json(product); // Si se encuentra, responde con el producto
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error }); // Manejo de errores
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
