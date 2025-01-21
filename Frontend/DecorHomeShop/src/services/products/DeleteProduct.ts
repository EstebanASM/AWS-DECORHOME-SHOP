import axios from "axios";

const API_URL = "http://localhost:3011/products"; // Asegúrate de que la URL sea la correcta

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    throw error;
  }
};
