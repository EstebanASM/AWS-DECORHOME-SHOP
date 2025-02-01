-- Insertar categorías iniciales en la base de datos
INSERT INTO categories (name) VALUES 
('Sofás'),
('Mesas'),
('Sillas'),
('Camas'),
('Armarios'),
('Escritorios'),
('Decoración'),
('Iluminación')
ON CONFLICT (name) DO NOTHING; -- Evita duplicados si ya existen
