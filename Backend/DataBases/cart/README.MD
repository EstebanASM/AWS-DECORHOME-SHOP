# Cart MYSQL

## Overview
This document provides information about setting up and configuring the MySQL database for the `decorhome_shop` project. The database includes a `cart` table for managing shopping cart items.

## MySQL Configuration
The following environment variables are used for database configuration:

```
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=decorhome_shop
MYSQL_USER=shop_user
MYSQL_PASSWORD=shop_password
```

## Docker Setup
The database is set up using the official MySQL 8.0 image with the following Dockerfile:

```dockerfile
# Use the official MySQL image
FROM mysql:8.0

# Copy the .env file and init.sql to the container
COPY .env /etc/environment
COPY init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306

# Start MySQL
CMD ["mysqld"]
```

## Database Schema
The database `decorhome_shop` is created if it does not exist, and it includes a `cart` table.

### `cart` Table Structure
```sql
-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS decorhome_shop;

-- Use the decorhome_shop database
USE decorhome_shop;

-- Create the cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Additional index for optimizing queries by product
CREATE INDEX idx_product_cart ON cart (product_id);
```

## How to Use
1. Ensure Docker is installed and running.
2. Build and run the MySQL container using Docker:
   ```sh
   docker build -t decorhome-mysql .
   docker run -d --name decorhome-db -p 3306:3306 decorhome-mysql
   ```
3. Connect to the MySQL database:
   ```sh
   mysql -u shop_user -p -h 127.0.0.1 -P 3306 decorhome_shop
   ```
4. Verify that the `cart` table exists:
   ```sql
   SHOW TABLES;
   ```

## Notes
- The database is initialized using `init.sql`, which is automatically executed during the first container startup.
- The `cart` table stores products added to the shopping cart, with timestamps for tracking additions and updates.
- The `idx_product_cart` index helps optimize queries that filter by `product_id`.

## License
This project follows the standard open-source licensing guidelines.

---

For any issues or improvements, please open a ticket in the project repository.

