import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { logout } from "../../services/Auth/authService";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logoutContext } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        logoutContext();
        navigate("/login");
      } catch (error) {
        console.error("Error al cerrar sesión", error);
      }
    };
    handleLogout();
  }, [logoutContext, navigate]);

  return null;
};

export default Logout;
