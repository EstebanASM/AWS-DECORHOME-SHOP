const API_URL = "http://localhost:3000"; // URL de tu API backend

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error al crear el producto");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
