// src/services/categories/getCategories.ts
import axios from 'axios';

export const getCategories = async () => {
  const query = `
    query {
      categories {
        id
        name
      }
    }
  `;
  
  try {
    const response = await axios.post('http://localhost:8002/getgraphql', {
      query: query,
    });
    return response.data.data.categories; // Retorna las categorías
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw new Error("Error al obtener las categorías");
  }
};
