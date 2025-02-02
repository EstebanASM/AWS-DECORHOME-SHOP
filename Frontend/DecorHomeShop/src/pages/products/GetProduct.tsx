import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/products/GetProduct";
import { deleteProduct } from "../../services/products/DeleteProduct";
import { getCategoryById } from "../../services/categories/getCategoryById";
import { Grid, Button, Typography, Box } from '@mui/material';

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
  
        // Obtener los nombres de las categorías
        const categoryNames: { [key: string]: string } = {};

        await Promise.all(
          data.map(async (product: Product) => {
            if (product.category && !categoryNames[product.category]) {
              try {
                const categoryData = await getCategoryById(product.category);
                categoryNames[product.category] = categoryData.name;
              } catch (error) {
                console.error("Error al obtener la categoría", error);
              }
            }
          })
        );
  
        // Establecer las categorías solo cuando todos los datos estén listos
        setCategories(categoryNames);
      } catch (error: any) {
        setError(error.message);
      }
    };
  
    fetchProducts();
  }, []);
  

  const handleCheckboxChange = (productId: string) => {
    const updatedSelectedProducts = new Set(selectedProducts);
    if (updatedSelectedProducts.has(productId)) {
      updatedSelectedProducts.delete(productId);
    } else {
      updatedSelectedProducts.add(productId);
    }
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleDelete = async () => {
    if (selectedProducts.size > 0) {
      const confirmation = window.confirm(
        `¿Estás seguro de que deseas eliminar ${selectedProducts.size} productos?`
      );

      if (confirmation) {
        try {
          await Promise.all(
            Array.from(selectedProducts).map((productId) =>
              deleteProduct(productId)
            )
          );
          setProducts((prevProducts) =>
            prevProducts.filter(
              (product) => !selectedProducts.has(product._id)
            )
          );
          setSelectedProducts(new Set());
          setConfirmationMessage(null);
        } catch (error) {
          console.error("Error al eliminar productos", error);
          setConfirmationMessage("Hubo un error al eliminar los productos.");
        }
      }
    }
  };

  const isNoProductSelected = selectedProducts.size === 0;
  const isSingleProductSelected = selectedProducts.size === 1;
  const isMultipleProductsSelected = selectedProducts.size > 0;
  const selectedProductId = Array.from(selectedProducts)[0];

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>Productos</Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* Botones en una fila */}
      <Box display="flex" justifyContent="space-between" marginBottom="2rem">
        <Link to="/createproduct">
          <Button
            variant="contained"
            color="primary"
            disabled={isMultipleProductsSelected}
            sx={{
              width: "200px",
            }}
          >
            Agregar Producto
          </Button>
        </Link>

        <Link to={`/updateproduct/${selectedProductId}`}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!isSingleProductSelected}
            sx={{
              width: "200px",
            }}
          >
            Editar Producto
          </Button>
        </Link>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={!isMultipleProductsSelected}
          sx={{
            width: "200px",
          }}
        >
          Eliminar Producto{selectedProducts.size > 1 ? "s" : ""}
        </Button>
      </Box>

      {confirmationMessage && <Typography>{confirmationMessage}</Typography>}

      {/* Mostrar los productos */}
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  position: "relative",
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
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body1" color="primary">
                  <strong>Precio:</strong> ${product.price}
                </Typography>
                <Typography variant="body2">
                  <strong>Categoría:</strong> {categories[product.category] || "Cargando..."}
                </Typography>
                <Typography variant="body2">
                  <strong>Stock:</strong> {product.stock}
                </Typography>

                {/* Cuadro de selección para marcar productos */}
                <input
                  type="checkbox"
                  checked={selectedProducts.has(product._id)}
                  onChange={() => handleCheckboxChange(product._id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    transform: "scale(1.5)",
                  }}
                />
              </Box>
            </Grid>
          ))
        ) : (
          <Typography>No hay productos disponibles</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Home;
