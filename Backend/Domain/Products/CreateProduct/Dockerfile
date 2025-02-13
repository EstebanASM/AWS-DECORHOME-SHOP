# Utilizar la imagen base de Node.js
FROM node:20

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Instalar mongo-tools (cliente mongo)
RUN apt-get update && apt-get install -y mongodb-clients

# Copiar el resto de la aplicación al contenedor
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
