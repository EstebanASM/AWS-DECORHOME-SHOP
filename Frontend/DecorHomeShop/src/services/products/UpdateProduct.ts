import axios from 'axios';

const API_URL = 'http://localhost:3012/products'; // URL de tu microservicio de actualización

export const updateProduct = async (id: string, product: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
};
