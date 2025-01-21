import React, { useState, useEffect } from "react";

// Definir una interfaz para el producto
interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

interface UpdateProductProps {
  product: Product;
  onSubmit: (updatedProduct: Product) => Promise<void>;
}

const UpdateProductForm: React.FC<UpdateProductProps> = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState<Product>(product);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(product); // Actualiza los datos del formulario cuando el producto cambie
  }, [product]);

  // Maneja los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData); // Llama a la función onSubmit pasada como prop
    } catch (err) {
      setError("Error al actualizar el producto");
    }
  };

  return (
    <div>
      <h2>Actualizar Producto</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Imagen URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
