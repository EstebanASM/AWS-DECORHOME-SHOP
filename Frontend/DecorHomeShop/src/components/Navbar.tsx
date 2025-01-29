import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#343a40",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",  // Asegura que el navbar ocupe todo el ancho de la pantalla
      }}
    >
      <Toolbar style={{ padding: "1rem", justifyContent: "center", width: "100%" }}>
        <Button color="inherit" component={Link} to="/" style={{ fontSize: "1.2rem", textDecoration: "none" }}>
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/getproduct" style={{ fontSize: "1.2rem", textDecoration: "none" }}>
          Productos
        </Button>
        <Button color="inherit" component={Link} to="/login" style={{ fontSize: "1.2rem", textDecoration: "none" }}>
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register" style={{ fontSize: "1.2rem", textDecoration: "none" }}>
          Register
        </Button>
        <Button color="inherit" component={Link} to="/logout" style={{ fontSize: "1.2rem", textDecoration: "none" }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


