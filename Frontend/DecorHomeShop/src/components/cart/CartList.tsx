// src/components/cart/CartList.tsx
import React, { useEffect, useState } from "react";
import { getCartItems, CartItem } from "../../services/cart/getCart";
import CartItemComponent from "./CartItem";

const CartList: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
      setLoading(false);
      localStorage.setItem("cart", JSON.stringify(items));
      window.dispatchEvent(new Event("storage"));
    };

    fetchCartItems();
  }, []);

  if (loading) return <p className="text-center">Cargando carrito...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItemComponent key={item.id} item={item} />
        ))
      ) : (
        <p className="text-center">El carrito está vacío.</p>
      )}
    </div>
  );
};

export default CartList;
