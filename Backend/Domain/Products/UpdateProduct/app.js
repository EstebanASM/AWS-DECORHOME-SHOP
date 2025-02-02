const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3012;

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// Middleware para habilitar CORS
app.use(cors());

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
  category: String,
  stock: { type: Number, default: 0 },
  image: { type: String }, // Nuevo campo para la imagen
});

const Product = mongoose.model("Product", productSchema);


// Ruta para actualizar un producto por su ID (PUT)
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del producto de la URL
    const updatedData = req.body; // Obtiene los nuevos datos para actualizar el producto

    // Actualiza el producto usando el ID proporcionado
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto actualizado exitosamente", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
