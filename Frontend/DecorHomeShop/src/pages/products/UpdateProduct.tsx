import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Añadimos useParams para obtener el ID del producto
import { updateProduct } from "../../services/products/UpdateProduct"; // Servicio para hacer PUT a la API
import { getProductById } from "../../services/products/GetProductId"; // Servicio para obtener un producto por ID

// Definir una interfaz para el producto
interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

const UpdateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Obtenemos el ID del producto desde los parámetros de la URL
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    image: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener el producto por su ID y cargarlo en el formulario
    const fetchProduct = async () => {
      try {
        if (id) {
          const fetchedProduct = await getProductById(id); // Llama al servicio para obtener el producto
          setProduct(fetchedProduct); // Establece el producto en el estado
        }
      } catch (err) {
        setError("Error al cargar el producto");
      }
    };

    fetchProduct();
  }, [id]);

  // Maneja los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct: Product) => ({
      ...prevProduct,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // Maneja el envío del formulario para actualizar el producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        const updatedProduct = await updateProduct(id, product); // Actualiza el producto
        console.log("Producto actualizado:", updatedProduct);
        navigate("/getproduct"); // Redirige a la página de inicio después de la actualización
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
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
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
