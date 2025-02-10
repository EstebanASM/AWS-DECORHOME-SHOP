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
      await addToCart(productId, quantity); // Mantén el productId como string
      alert("✅ Producto añadido al carrito");
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
      />
      <button onClick={handleAddToCart} disabled={loading}>
        {loading ? "Añadiendo..." : "Añadir al carrito"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddToCartButton;
