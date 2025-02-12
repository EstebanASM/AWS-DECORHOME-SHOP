#!/bin/bash
echo "⏳ Esperando a que MongoDB inicie..."
sleep 10

# Importar los datos a MongoDB
echo "📦 Importando datos en db_products..."
mongoimport --host localhost --db db_products --collection products --type json --file /data/products.json --jsonArray

echo "✅ Datos importados correctamente."
