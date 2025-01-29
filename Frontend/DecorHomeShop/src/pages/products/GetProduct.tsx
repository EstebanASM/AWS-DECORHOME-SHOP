import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import { getProducts } from "../../services/products/GetProduct"; 
import { deleteProduct } from "../../services/products/DeleteProduct"; 
import { Grid, Button, Typography, Box } from '@mui/material'; 

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]); 
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set()); 
  const [error, setError] = useState<string | null>(null); 
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); 
        setProducts(data); 
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
        `Are you sure you want to delete ${selectedProducts.size} products?`
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
          console.error("Error deleting products", error);
          setConfirmationMessage("There was an error deleting the products.");
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
      <Typography variant="h4" gutterBottom>Products</Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* Buttons in a row */}
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
            Add Product
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
            Edit Product
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
          Delete Product{selectedProducts.size > 1 ? "s" : ""}
        </Button>
      </Box>

      {confirmationMessage && <Typography>{confirmationMessage}</Typography>}

      {/* Display products */}
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
                  <strong>Price:</strong> ${product.price}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body2">
                  <strong>Stock:</strong> {product.stock}
                </Typography>

                {/* Checkbox for selecting products */}
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
          <Typography>No products available</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Home;



