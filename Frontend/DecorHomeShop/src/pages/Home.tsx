import React from "react";

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#333" }}>
        Bienvenido a DecorHomeShop
      </h1>
      <p style={{ fontSize: "1.5rem", color: "#666" }}>
        Gestiona tus productos fácilmente.
      </p>
    </div>
  );
};

export default Home;

