import React from "react";
import ProductForm from "../../components/products/ProductForm";
import { createProduct } from "../../services/api";

const CreateProduct: React.FC = () => {
  const handleProductSubmit = async (product: {
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    image: string;
  }) => {
    try {
      const response = await createProduct(product);
      console.log("Producto creado exitosamente:", response);
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      <ProductForm onSubmit={handleProductSubmit} />
    </div>
  );
};

export default CreateProduct;
