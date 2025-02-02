import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../services/products/UpdateProduct";
import { getProductById } from "../../services/products/GetProductId";
import { getCategories } from "../../services/categories/getCategories"; // Servicio para obtener categorías

interface Product {
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

const UpdateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    stock: 0,
    image: "",
  });
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const fetchedProduct = await getProductById(id);
          setProduct(fetchedProduct);
        }
      } catch (err) {
        setError("Error al cargar el producto");
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories(); // Llama al servicio para obtener categorías
        const categoryNames: { [key: string]: string } = {};
        categoryData.forEach((category: { id: string, name: string }) => {
          categoryNames[category.id] = category.name;
        });
        setCategories(categoryNames);
      } catch (err) {
        setError("Error al cargar las categorías");
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct: Product) => ({
      ...prevProduct,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        const updatedProduct = await updateProduct(id, product);
        console.log("Producto actualizado:", updatedProduct);
        navigate("/getproduct");
      }
    } catch (err) {
      setError("Error al actualizar el producto");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Actualizar Producto</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            <option value="">Seleccione una categoría</option>
            {Object.keys(categories).map((categoryId) => (
              <option key={categoryId} value={categoryId}>
                {categories[categoryId]}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="image">Imagen URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
        >
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
