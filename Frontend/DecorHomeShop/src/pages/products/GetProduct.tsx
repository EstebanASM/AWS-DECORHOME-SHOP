import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import { getProducts } from "../../services/products/GetProduct"; // Importa la función para consumir la API

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]); // Estado para almacenar los productos
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set()); // Estado para productos seleccionados
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // Llama a la función de la API
        setProducts(data); // Almacena los productos en el estado
      } catch (error: any) {
        setError(error.message); // Maneja cualquier error
      }
    };

    fetchProducts(); // Llama a la función al cargar el componente
  }, []); // El efecto solo se ejecuta una vez cuando el componente se monta

  const handleCheckboxChange = (productId: string) => {
    const updatedSelectedProducts = new Set(selectedProducts);
    if (updatedSelectedProducts.has(productId)) {
      updatedSelectedProducts.delete(productId); // Desmarca el producto si ya está seleccionado
    } else {
      updatedSelectedProducts.add(productId); // Marca el producto
    }
    setSelectedProducts(updatedSelectedProducts); // Actualiza el estado con los productos seleccionados
  };

  // El botón solo se habilita cuando no hay productos seleccionados
  const isNoProductSelected = selectedProducts.size === 0;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Productos</h1>
      {error && <p>Error: {error}</p>} {/* Muestra el error si ocurre */}

      {/* Botón para ir a la página de crear producto */}
      <div style={{ marginBottom: "2rem" }}>
        <Link to="/createproduct">
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: isNoProductSelected ? "#007bff" : "#d6d6d6", // Cambia el color según si está habilitado o no
              color: isNoProductSelected ? "#fff" : "#aaa", // Cambia el color del texto cuando está deshabilitado
              border: "none",
              borderRadius: "4px",
              cursor: isNoProductSelected ? "pointer" : "not-allowed", // Cambia el cursor cuando está deshabilitado
              fontSize: "16px",
              transition: "background-color 0.3s ease",
            }}
            disabled={!isNoProductSelected} // Habilita el botón solo si no hay productos seleccionados
          >
            Agregar Producto
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                position: "relative", // Esto es importante para posicionar el checkbox en la esquina
              }}
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Precio:</strong> ${product.price}
              </p>
              <p>
                <strong>Categoría:</strong> {product.category}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

              {/* Cuadro de selección para marcar productos en la esquina superior derecha */}
              <input
                type="checkbox"
                checked={selectedProducts.has(product._id)}
                onChange={() => handleCheckboxChange(product._id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  transform: "scale(1.5)", // Hace el checkbox más grande
                }}
              />
            </div>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Home;
