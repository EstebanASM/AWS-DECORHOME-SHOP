import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateProduct from "./pages/products/CreateProduct";
import GetProduct from "./pages/products/GetProduct";
import UpdateProduct from "./pages/products/UpdateProduct";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";

// Definir el tipo de usuario
type User = {
  username: string;
  role: "admin" | "user";
};

// Estado de autenticación
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Verificar usuario en localStorage al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar user={user} setUser={setUser} />
        <div style={{ flex: 1, padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getproduct" element={<GetProduct />} />
            
            {/* Rutas protegidas */}
            <Route path="/createproduct" element={<ProtectedRoute user={user} role="admin"><CreateProduct /></ProtectedRoute>} />
            <Route path="/updateproduct/:id" element={<ProtectedRoute user={user} role="admin"><UpdateProduct /></ProtectedRoute>} />

            {/* Autenticación */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout setUser={setUser} />} />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Componente para rutas protegidas
const ProtectedRoute: React.FC<{ user: User | null; role?: "admin" | "user"; children: React.ReactNode }> = ({ user, role, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default App;

