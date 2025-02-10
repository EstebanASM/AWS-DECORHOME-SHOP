// src/services/cart/getCart.ts

export interface CartItem {
    productName: string;
    quantity: number;
    addedAt: string;
    productImage: string;
  }
  const API_URL = "http://localhost:8016/getcart";
  
  export const getCartItems = async (): Promise<CartItem[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error al obtener los productos del carrito");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  