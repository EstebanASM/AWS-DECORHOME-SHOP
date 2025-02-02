import axios from 'axios';

export const getCategoryById = async (categoryId: string) => {
  const query = `
    query {
      getCategoryById(id: "${categoryId}") {
        id
        name
        description
      }
    }
  `;

  try {
    const response = await axios.post('http://localhost:8003/Idgraphql', {
      query: query,
    });

    return response.data.data.getCategoryById; // Retorna la categoría específica
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    throw new Error("Error al obtener la categoría");
  }
};