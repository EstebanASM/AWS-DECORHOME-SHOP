import React, { useState } from "react";
import "../../App.css";

interface ProductFormProps {
  onSubmit: (product: {
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    image: string;
  }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    image: "",
  });

  const [message, setMessage] = useState(""); // Mensaje de éxito o error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!product.name || !product.price || !product.category) {
      setMessage("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (isNaN(product.price) || isNaN(product.stock)) {
      setMessage("El precio y el stock deben ser números válidos.");
      return;
    }

    // Llamada a la función onSubmit
    onSubmit(product);

    // Limpiar el formulario después de un envío exitoso
    setProduct({
      name: "",
      price: 0,
      description: "",
      category: "",
      stock: 0,
      image: "",
    });

    // Establecer el mensaje de éxito
    setMessage("Producto registrado con éxito!");

    // Limpiar el mensaje después de un tiempo (por ejemplo, 3 segundos)
    setTimeout(() => {
      setMessage("");
    }, 3000); // 3000ms = 3 segundos
  };

  return (
    <div className="form-container">
      {message && <p className="success-message">{message}</p>} {/* Mostrar el mensaje de éxito o error */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={product.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={product.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen"
          value={product.image}
          onChange={handleChange}
        />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default ProductForm;
