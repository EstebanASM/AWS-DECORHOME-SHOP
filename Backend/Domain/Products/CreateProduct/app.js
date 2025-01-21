const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importar el paquete cors

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI;

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

// Ruta para crear un producto
app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Crear una instancia del modelo con los datos enviados
    const savedProduct = await newProduct.save(); // Guardar en la base de datos
    res.status(201).json(savedProduct); // Responder con el producto creado
    console.log("Producto Creado");
  } catch (error) {
    res.status(400).json({ message: "Error al crear el producto", error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
