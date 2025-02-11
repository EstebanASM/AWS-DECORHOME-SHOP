// src/services/cart/getCart.ts
import { getProductById } from "../../services/products/GetProductId";

export interface CartItem {
  id: number;
  productID: string;
  quantity: number;
  addedAt: string;
  updatedAt: string;
  productName?: string;
  productImage?: string;
}

const API_URL = "http://localhost:8016/getcart";

export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los productos del carrito");
    }
    const items: CartItem[] = await response.json();

    const cartWithDetails = await Promise.all(
      items.map(async (item: CartItem) => {
        if (!item.productID) {
          console.error(`Producto sin ID en el carrito: ${JSON.stringify(item)}`);
          return {
            ...item,
            productName: "Nombre no disponible",
            productImage: "imagen_no_disponible.png",
          };
        }

        try {
          const productDetails = await getProductById(item.productID);
          return {
            ...item,
            productName: productDetails?.name || "Nombre no disponible",
            productImage: productDetails?.image || "imagen_no_disponible.png",
          };
        } catch (error) {
          console.error(`Error al obtener el producto con ID ${item.productID}:`, error);
          return {
            ...item,
            productName: "Nombre no disponible",
            productImage: "imagen_no_disponible.png",
          };
        }
      })
    );

    return cartWithDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};
