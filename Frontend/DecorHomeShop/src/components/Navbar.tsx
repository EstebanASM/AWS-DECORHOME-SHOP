import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        padding: "1rem",
        backgroundColor: "#343a40",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "2rem",
          margin: 0,
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        <li>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/getproduct" style={{ color: "#fff", textDecoration: "none" }}>
            Productos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

