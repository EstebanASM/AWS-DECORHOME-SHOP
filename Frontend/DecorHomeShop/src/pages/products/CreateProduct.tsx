// src/pages/products/CreateProduct.tsx
import React, { useState, useEffect } from "react";
import ProductForm from "../../components/products/ProductForm";
import { createProduct } from "../../services/products/CreateProduct";
import { getCategories } from "../../services/categories/getCategories"; // Importar el servicio
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]); // Inicializar como arreglo vacío

  // Cargar categorías cuando el componente se monta
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getCategories(); // Obtener las categorías
        setCategories(categories); // Guardar las categorías en el estado
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    loadCategories();
  }, []);

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
      navigate("/getproduct");
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      {/* Asegurarse de pasar las categorías al formulario */}
      <ProductForm onSubmit={handleProductSubmit} categories={categories} />
    </div>
  );
};

export default CreateProduct;
