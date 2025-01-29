const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4010;

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "adminpass",
  database: process.env.DB_NAME || "auth_db",
});

// Registro de usuario
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "El nombre de usuario y contraseña son obligatorios" });
  }

  try {
    const [existingUser] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    await pool.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [
      username,
      password,
      role || "user", // El rol por defecto es 'user'
    ]);

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor de registro corriendo en http://localhost:${PORT}`);
});
