# MongoDB Product

This guide provides a detailed setup for running a MongoDB Product, importing initial product data, and exposing the database for external connections.

## Prerequisites
- Docker installed on your system
- Basic knowledge of MongoDB

## Dockerfile
This `Dockerfile` sets up a MongoDB container and ensures that the necessary initialization scripts and product data are available within the container.

```dockerfile
# Use the official MongoDB image
FROM mongo:latest

# Install MongoDB shell client
RUN apt-get update && apt-get install -y mongodb-org-shell

# Set working directory
WORKDIR /data

# Copy initialization files
COPY products.json /data/products.json
COPY init-mongo.sh /docker-entrypoint-initdb.d/init-mongo.sh

# Set execution permissions for the initialization script
RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.sh

# Expose MongoDB default port
EXPOSE 27017
```

## Initialization Script (`init-mongo.sh`)
This script ensures that product data is imported into the MongoDB instance upon container startup.

```bash
#!/bin/bash
mongoimport --host localhost --db db_products --collection products --type json --file /data/products.json --jsonArray
```

## Sample Product Data (`products.json`)
The following JSON file contains a list of products that will be imported into the MongoDB `db_products` database under the `products` collection.

```json
[
  {
    "name": "Sofá Moderno",
    "description": "A comfortable and modern sofa ideal for living rooms.",
    "price": 250,
    "category": "Furniture",
    "stock": 15,
    "image": "https://example.com/images/sofa-moderno.jpg"
  },
  {
    "name": "Coffee Table",
    "description": "High-quality wooden coffee table.",
    "price": 120,
    "category": "Furniture",
    "stock": 20,
    "image": "https://example.com/images/mesa-centro.jpg"
  },
  {
    "name": "Office Chair",
    "description": "Ergonomic chair with adjustable lumbar support.",
    "price": 180,
    "category": "Office",
    "stock": 25
  },
  {
    "name": "King Size Bed",
    "description": "Large and comfortable bed with a solid wood frame.",
    "price": 450,
    "category": "Bedroom",
    "stock": 10
  },
  {
    "name": "Floor Lamp",
    "description": "Minimalist design floor lamp with LED light.",
    "price": 60,
    "category": "Decoration",
    "stock": 30
  }
]
```

## How to Build and Run the MongoDB Container
1. **Build the Docker image:**
   ```sh
   docker build -t my-mongo-container .
   ```
2. **Run the MongoDB container:**
   ```sh
   docker run -d --name mongo-container -p 27017:27017 my-mongo-container
   ```
3. **Verify that MongoDB is running:**
   ```sh
   docker ps
   ```
4. **Access MongoDB shell inside the container:**
   ```sh
   docker exec -it mongo-container mongo
   ```
5. **Check if the products are imported:**
   ```sh
   use db_products;
   db.products.find().pretty();
   ```

## Notes
- The container will automatically import the product data when it starts.
- If you modify `products.json`, rebuild the container to reflect the changes.
- Ensure that port `27017` is available before running the container.

## Conclusion
This setup provides a structured way to deploy MongoDB with predefined product data in a containerized environment, making it ideal for testing and development purposes.

