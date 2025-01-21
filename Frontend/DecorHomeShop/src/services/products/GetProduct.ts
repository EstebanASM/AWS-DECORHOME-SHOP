// src/services/products/getProducts.ts
import axios from "axios";

const API_URL = "http://localhost:3010"; // URL de la API

// Función para obtener todos los productos
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data; // Retorna la lista de productos
  } catch (error) {
    console.error("Error al obtener los productos", error);
    throw error; // Lanza el error si la petición falla
  }
};