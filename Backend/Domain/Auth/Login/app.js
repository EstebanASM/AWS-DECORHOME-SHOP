const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4002;
const SECRET_KEY = process.env.SECRET_KEY || "secret_key";

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "adminpass",
  database: process.env.DB_NAME || "auth_db",
});

// Inicio de sesión de usuario (Login)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Nombre de usuario y contraseña son obligatorios" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ? AND password = ?", [
      username,
      password,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const user = rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de login corriendo en http://localhost:${PORT}`);
});
