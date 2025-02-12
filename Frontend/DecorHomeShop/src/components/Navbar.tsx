import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

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
        <li style={{ position: "relative" }}>
          <Link to="/cart" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center" }}>
            🛒 Carrito
            {cartCount > 0 && (
              <span
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.9rem",
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
