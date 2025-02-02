// src/components/products/ProductForm.tsx
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
  categories: { id: string; name: string }[]; // Recibe las categorías
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, categories }) => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    image: "",
  });

  const [message, setMessage] = useState(""); // Mensaje de éxito o error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    if (isNaN(product.price) || isNaN(product.stock) || product.price <= 0 || product.stock < 0) {
      setMessage("El precio debe ser un número positivo y el stock no puede ser negativo.");
      return;
    }

    const imageUrlPattern = /^(http|https):\/\/[^ "]+$/;
    if (product.image && !imageUrlPattern.test(product.image)) {
      setMessage("La URL de la imagen no es válida.");
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
        <div className="form-group">
          <label htmlFor="name">Nombre del producto:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre del producto"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Precio"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Categoría</option>
            {/* Verifica que categories tenga elementos antes de llamar map */}
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="">No hay categorías disponibles</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la imagen:</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="URL de la imagen"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default ProductForm;
