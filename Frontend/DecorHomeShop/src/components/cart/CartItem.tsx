// src/components/cart/CartItem.tsx

import React from "react";
import { CartItem } from "../../services/cart/GetCart";

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <p className="text-lg font-semibold">Producto ID: {item.product_id}</p>
      <p>Cantidad: {item.quantity}</p>
      <p>Agregado el: {new Date(item.added_at).toLocaleString()}</p>
    </div>
  );
};

export default CartItem;
