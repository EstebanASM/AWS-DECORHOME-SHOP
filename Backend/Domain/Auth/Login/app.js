import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
let db;
try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST || 'auth_db',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'adminpass',
    database: process.env.DB_NAME || 'auth_db',
  });
  console.log('Conexión a la base de datos establecida.');
} catch (error) {
  console.error('Error conectando a la base de datos:', error);
  process.exit(1); // Detiene el servidor si la base de datos no está disponible
}

// Endpoint para login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(`Intento de login para: ${username}`);

    if (!username || !password) {
      return res.status(400).json({ message: 'Faltan datos de usuario o contraseña' });
    }

    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Comparación directa de contraseñas SIN encriptación
    if (password !== user.password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });

    console.log(`Login exitoso para: ${username}`);
    res.json({ token, role: user.role });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

const PORT = process.env.PORT || 4012;
app.listen(PORT, () => {
  console.log(`Servidor de login en el puerto ${PORT}`);
});
