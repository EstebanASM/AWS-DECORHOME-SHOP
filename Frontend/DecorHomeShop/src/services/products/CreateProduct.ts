import axios from "axios";

const API_URL = "http://localhost:3000";


//Microservicio Agregar producto
export const createProduct = async (product: {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string; // Nuevo campo para la imagen
}) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto", error);
    throw error;
  }
};
