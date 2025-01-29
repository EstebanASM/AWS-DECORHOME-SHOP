# Utilizamos la imagen oficial de Node.js
FROM node:16

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos el archivo package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el código fuente al contenedor
COPY . .

# Exponemos el puerto que utiliza el microservicio
EXPOSE 4002

# Comando para iniciar la aplicación
CMD ["npm", "start"]
