const API_URL = "http://localhost:8015/cart"; // Asegúrate de que este sea el endpoint correcto

export const addToCart = async (productId: string, quantity: number) => {
  try {
    // Convertir productId a string
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId, quantity }), // Mantén productId como string
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al añadir el producto al carrito: ${errorMessage}`);
    }

    // Si la respuesta es un mensaje de texto, maneja esa respuesta
    const message = await response.text();
    return { message };
  } catch (error) {
    console.error("❌ Error en addToCart:", error);
    throw error;
  }
};
