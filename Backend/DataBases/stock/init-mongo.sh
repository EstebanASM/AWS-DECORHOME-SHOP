#!/bin/bash

# Configurar variables
MONGO_HOST="localhost"

echo "Esperando a que MongoDB esté listo..."
until mongosh --host $MONGO_HOST --eval "print('MongoDB está listo')" &>/dev/null; do
  sleep 1
done

# Importar datos de ejemplo en la colección "stock"
echo "Importando datos en la base de datos db_stock..."
mongoimport --host $MONGO_HOST --db db_stock --collection stock --type json --file /data/stock.json --jsonArray

echo "Datos importados correctamente."
