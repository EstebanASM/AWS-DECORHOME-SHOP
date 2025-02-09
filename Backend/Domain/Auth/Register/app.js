import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import validator from 'validator';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
let db;
async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "admin",
      password: process.env.DB_PASSWORD || "adminpass",
      database: process.env.DB_NAME || "auth_db",
    });
    console.log('✅ Conexión a la base de datos establecida');
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error.message);
    process.exit(1); // Salir si hay un error crítico
  }
}
await connectDB();

// Endpoint para registro
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Validar el correo electrónico
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'El correo electrónico no es válido' });
  }

  try {
    // Verificar si el usuario o correo ya existen
    const [existingUser] = await db.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ message: 'El usuario o el correo ya existen' });
    }

    // Insertar usuario en la base de datos sin encriptar la contraseña
    await db.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, 'user']
    );

    res.status(201).json({ message: '✅ Usuario registrado correctamente' });
  } catch (error) {
    console.error('❌ Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

const PORT = process.env.PORT || 4013;
app.listen(PORT, () => {
  console.log(`🚀 Microservicio de registro en el puerto ${PORT}`);
});





