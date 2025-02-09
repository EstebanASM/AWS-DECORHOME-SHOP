CREATE DATABASE IF NOT EXISTS auth_db;
USE auth_db;

-- Tabla para usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,  -- Agregar campo de email
  role ENUM('admin', 'user') DEFAULT 'user'
);

-- Tabla para tokens de recuperación de contraseñas
CREATE TABLE IF NOT EXISTS passwordrecovery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla para registros de notificaciones
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertar usuarios de ejemplo
INSERT INTO users (username, password, email, role) 
VALUES ('admin', '12345', 'admin@example.com', 'admin'),
       ('user', 'password', 'user@example.com', 'user');

