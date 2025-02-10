import React, { useEffect } from "react";
import CartList from "../../components/cart/CartList";

const GetCart: React.FC = () => {
  useEffect(() => {
    return () => {
      // Cuando el usuario sale del carrito, vaciar localStorage y actualizar navbar
      localStorage.setItem("cart", "[]");
      window.dispatchEvent(new Event("storage"));
    };
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <CartList />
    </div>
  );
};

export default GetCart;
