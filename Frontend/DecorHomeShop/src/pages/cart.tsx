// src/pages/cart.tsx

import React from "react";
import CartList from "../components/cart/CartList";

const CartPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Carrito de Compras</h1>
      <CartList />
    </div>
  );
};

export default CartPage;
