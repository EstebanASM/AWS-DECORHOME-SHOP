const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importar el paquete cors
const axios = require("axios"); // Importar axios para hacer la solicitud HTTP

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

// Función para verificar si la categoría existe usando GraphQL
const checkCategoryExists = async (categoryId) => {
  const query = `
    query {
      categories {
        id
        name
      }
    }
  `;

  try {
    const response = await axios.post("http://localhost:8002/getgraphql", {
      query: query,
    });

    // Filtrar la categoría por ID
    const categories = response.data.data.categories;
    const categoryExists = categories.some(
      (category) => category.id === categoryId
    );

    return categoryExists;
  } catch (error) {
    throw new Error("Error al obtener las categorías del servicio de categorías.");
  }
};

// Ruta para crear un producto
app.post("/products", async (req, res) => {
  const { category } = req.body;

  try {
    // Verificar si la categoría existe en el microservicio de categorías
    const categoryExists = await checkCategoryExists(category);

    if (!categoryExists) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    // Crear y guardar el producto si la categoría es válida
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
