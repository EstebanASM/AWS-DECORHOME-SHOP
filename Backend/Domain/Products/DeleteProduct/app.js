const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3011;

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

// Ruta para eliminar un producto por su ID (DELETE)
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del producto de la URL

    // Elimina el producto usando el ID proporcionado
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado exitosamente", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
