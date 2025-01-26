import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f8f9fa" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "1rem", margin: 0 }}>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/getproduct">Productos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
