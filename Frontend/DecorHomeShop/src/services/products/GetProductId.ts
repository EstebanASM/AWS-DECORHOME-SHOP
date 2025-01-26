// src/services/products/GetProductById.ts
import axios from "axios";

// Define el tipo de producto (opcional para mantener consistencia)
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

// Función para obtener un producto por ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    // Asegúrate de que la URL del microservicio sea la correcta
    const response = await axios.get<Product>(`http://localhost:3013/products/${id}`);
    return response.data; // Devuelve el producto desde la API
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error("No se pudo obtener el producto.");
  }
};
