-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS decorhome_shop;

-- Usar la base de datos decorhome_shop
USE decorhome_shop;

-- Crear la tabla de carrito
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índice adicional para optimizar las consultas por producto
CREATE INDEX idx_product_cart ON cart (product_id);
