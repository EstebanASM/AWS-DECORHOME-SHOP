import React from "react";
import type { CartItem } from "../../services/cart/getCart";

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex items-center">
      <img
        src={item.productImage}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded-md mr-4"
      />
      <div>
        <p className="text-lg font-semibold">{item.productName}</p>
        <p>Cantidad: {item.quantity}</p>
        <p>Agregado el: {new Date(item.addedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CartItem;
