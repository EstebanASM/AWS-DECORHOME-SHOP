import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// **1️⃣ Conectar a la Base de Datos**
const db = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "adminpass",
    database: process.env.DB_NAME || "auth_db",
});

// **2️⃣ Generar Código de Recuperación**
app.post('/recovery', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "El nombre de usuario es obligatorio" });
    }

    try {
        const [user] = await db.execute('SELECT id FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Generar código aleatorio de 6 dígitos
        const recoveryCode = Math.floor(100000 + Math.random() * 900000);

        // Guardar el código en la tabla `passwordrecovery`
        await db.execute('INSERT INTO passwordrecovery (user_id, token) VALUES (?, ?)', [user[0].id, recoveryCode]);

        res.json({ message: "Código generado correctamente", recoveryCode });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

// **3️⃣ Verificar Código y Cambiar Contraseña**
app.post('/reset-password', async (req, res) => {
    const { username, recoveryCode, newPassword } = req.body;

    if (!username || !recoveryCode || !newPassword) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Obtener el usuario
        const [user] = await db.execute('SELECT id FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar el código en `passwordrecovery`
        const [validToken] = await db.execute(
            'SELECT * FROM passwordrecovery WHERE user_id = ? AND token = ?',
            [user[0].id, recoveryCode]
        );

        if (validToken.length === 0) {
            return res.status(400).json({ message: "Código incorrecto" });
        }

        // Actualizar la contraseña del usuario
        await db.execute('UPDATE users SET password = ? WHERE id = ?', [newPassword, user[0].id]);

        // Eliminar el token después de usarlo
        await db.execute('DELETE FROM passwordrecovery WHERE user_id = ?', [user[0].id]);

        res.json({ message: "Contraseña cambiada exitosamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

// **4️⃣ Iniciar Servidor**
const PORT = process.env.PORT | 4014;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));

