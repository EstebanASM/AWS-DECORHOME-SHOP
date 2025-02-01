-- Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Agregar restricción UNIQUE a la columna 'name' para evitar duplicados
ALTER TABLE categories
ADD CONSTRAINT unique_name UNIQUE (name);
