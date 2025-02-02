#!/bin/bash

# Esperar a que MongoDB esté listo
echo "Esperando a que MongoDB esté listo..."
until mongo --host $MONGO_HOST --eval "print('Esperando a MongoDB')" &>/dev/null; do
  sleep 1
done

# Importar datos de ejemplo en la colección "stock"
echo "Importando datos..."
mongoimport --host $MONGO_HOST --db db_stock --collection stock --type json --file /data/stock.json --jsonArray

echo "Datos importados correctamente"
