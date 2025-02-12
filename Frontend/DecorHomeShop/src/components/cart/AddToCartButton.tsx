import React, { useState } from "react";
import { addToCart } from "../../services/cart/AddCart";

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);
    try {
      await addToCart(productId, quantity);
      alert("✅ Producto añadido al carrito");

      // Actualizar contador en la Navbar
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push({ productId, quantity });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
      
    } catch (err) {
      setError("❌ Hubo un error al añadir el producto al carrito");
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        max="10"
        style={{
          marginRight: "10px",
          padding: "5px",
          width: "50px",
        }}
      />
      <button 
        onClick={handleAddToCart} 
        disabled={loading} 
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Añadiendo..." : "🛒 Añadir al carrito"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddToCartButton;
