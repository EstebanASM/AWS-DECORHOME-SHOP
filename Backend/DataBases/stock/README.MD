# MongoDB Stock

## Overview
This setup initializes a MongoDB container with a pre-loaded stock collection. It uses a Docker container for MongoDB and imports initial stock data from a JSON file.

## Requirements
- Docker installed on your machine
- MongoDB client tools (for local testing)

## Environment Variables
Ensure you configure the MongoDB instance with the following settings:

- **MongoDB Container Host**: `localhost`
- **Database Name**: `db_stock`
- **Collection Name**: `stock`

## Docker Setup
### Dockerfile
This `Dockerfile` creates a MongoDB container and sets up the stock database.
```dockerfile
# Use the official MongoDB image
FROM mongo:latest

# Set working directory
WORKDIR /data

# Copy JSON data and initialization script
COPY stock.json /data/stock.json
COPY init-mongo.sh /docker-entrypoint-initdb.d/init-mongo.sh

# Grant execution permissions to the initialization script
RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.sh

# Expose the MongoDB default port
EXPOSE 27017
```

## Initialization Script
The `init-mongo.sh` script ensures MongoDB is running and imports stock data into the database.

```bash
#!/bin/bash

# Define MongoDB container host
MONGO_HOST="localhost"

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
until mongosh --host $MONGO_HOST --eval "print('MongoDB is ready')" &>/dev/null; do
  sleep 2
done

# Import stock data
echo "🚀 Importing stock data into db_stock..."
mongoimport --host $MONGO_HOST --db db_stock --collection stock --type json --file /data/stock.json --jsonArray

echo "✅ Data imported successfully."
```

## Stock Data Example
The `stock.json` file contains initial stock data:

```json
[
  {
    "product_id": "679eac645c9f0f854891c166",
    "stock": 50
  },
  {
    "product_id": "679ec91f5c9f0f854891c16a",
    "stock": 20
  }
]
```

## Running the Setup
To build and run the MongoDB container with stock data, use:

```sh
docker build -t mongo-stock .
docker run -d --name stock-container -p 27017:27017 mongo-stock
```

## Verifying Data Import
To check if the data was imported correctly, run:

```sh
docker exec -it stock-container mongosh db_stock --eval "db.stock.find().pretty()"
```

This command should display the stock entries.

## Conclusion
This setup provides a ready-to-use MongoDB instance with preloaded stock data. You can extend this configuration by integrating it with your application.

🚀 **Happy Coding!**

