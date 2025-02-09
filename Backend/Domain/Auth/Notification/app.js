import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint para enviar notificación con usuario y contraseña
app.post('/send-notification', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario y contraseña están presentes
    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // Aquí simplemente devolvemos el mensaje con los datos proporcionados
    const notificationMessage = `Notificación: Usuario "${username}" con contraseña "${password}" ha sido procesado.`

    res.status(200).json({ message: notificationMessage });
  } catch (error) {
    console.error('Error al procesar notificación:', error);
    res.status(500).json({ message: 'Error al procesar notificación', error: error.message });
  }
});

const PORT = process.env.PORT || 4020;
app.listen(PORT, () => {
  console.log(`Microservicio de notificaciones en el puerto ${PORT}`);
});


