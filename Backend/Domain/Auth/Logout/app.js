const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 4003;

// Cerrar sesión (Logout)
app.post("/logout", (req, res) => {
  // No se necesita hacer nada en el backend para "cerrar sesión"
  // El logout se maneja eliminando el token del frontend
  res.status(200).json({ message: "Logout exitoso" });
});

app.listen(PORT, () => {
  console.log(`Servidor de logout corriendo en http://localhost:${PORT}`);
});
