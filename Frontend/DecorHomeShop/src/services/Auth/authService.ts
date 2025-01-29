import axios from "axios";

// URLs específicas para cada microservicio
const LOGIN_API_URL = "http://localhost:4002/login"; // Microservicio de login
const REGISTER_API_URL = "http://localhost:4010/register"; // Microservicio de registro
const LOGOUT_API_URL = "http://localhost:4003/logout"; // Microservicio de logout (si es necesario)

// Función para iniciar sesión
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_API_URL, { username, password });
    return response.data.token; // Devuelve el token JWT
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw new Error("Error al iniciar sesión.");
  }
};

// Función para registrar un usuario
export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(REGISTER_API_URL, { username, password });
    return response.data.message; // Devuelve mensaje de éxito
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw new Error("Error al registrar usuario.");
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    const response = await axios.post(LOGOUT_API_URL);
    return response.data.message; // Devuelve mensaje de éxito
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw new Error("Error al cerrar sesión.");
  }
};
