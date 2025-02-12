#!/bin/bash
echo "⏳ Esperando a que MongoDB inicie..."
sleep 10

echo "📦 Creando usuario administrador en MongoDB..."
mongo admin --eval "
  db.createUser({
    user: '${MONGO_INITDB_ROOT_USERNAME}',
    pwd: '${MONGO_INITDB_ROOT_PASSWORD}',
    roles: [{ role: 'root', db: 'admin' }]
  });
"

echo "📂 Importando datos en db_products..."
mongoimport --host localhost --db db_products --collection products --type json --file /data/products.json --jsonArray

echo "✅ Datos importados correctamente."
