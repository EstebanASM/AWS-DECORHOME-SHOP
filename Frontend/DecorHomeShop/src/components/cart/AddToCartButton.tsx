import React, { useState, useEffect } from 'react';
import { addToCartWebSocket, socket } from '../../services/cart/AddCart';

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verifica si la conexión WebSocket está abierta
    if (socket.readyState === WebSocket.OPEN) {
      console.log('WebSocket ya está conectado');
    } else {
      socket.onopen = () => {
        console.log('Conectado al servidor WebSocket');
      };
    }

    // Manejamos el cierre de la conexión WebSocket
    socket.onclose = () => {
      console.log('Desconectado del servidor WebSocket');
    };

    // Manejamos los errores de conexión WebSocket
    socket.onerror = (event) => {
      console.error('Error en la conexión WebSocket', event);
      setError('No se pudo conectar al servidor WebSocket');
    };

    return () => {
      // Limpiar los eventos cuando el componente se desmonta
      socket.onclose = null;
      socket.onerror = null;
    };
  }, []);

  const handleAddToCart = () => {
    setLoading(true);
    setError(null);
    try {
      // Envía el producto al carrito a través del WebSocket
      addToCartWebSocket(productId, quantity);
      alert('Producto añadido al carrito');
    } catch (err) {
      setError('Hubo un error al añadir el producto al carrito');
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
        {loading ? 'Añadiendo...' : 'Añadir al carrito'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddToCartButton;
