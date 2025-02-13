# Notifications MYSQL

This README provides instructions for setting up the MySQL database for the notifications service.

## MySQL Configuration

Ensure the following environment variables are set before running the database:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=notifications_db
MYSQL_USER=admin
MYSQL_PASSWORD=adminpass
```

## MySQL Dockerfile

Below is the Dockerfile to create a MySQL container for the notifications database:

```dockerfile
# Official MySQL image
FROM mysql:8.0

# Copy the initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306

# Default command
CMD ["mysqld"]
```

## Database Initialization Script

The following SQL script initializes the `notifications_db` and creates the necessary table:

```sql
CREATE DATABASE IF NOT EXISTS notifications_db;
USE notifications_db;

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## How to Use

1. Ensure you have Docker installed.
2. Build and run the MySQL container using Docker:
   ```sh
   docker build -t notifications-db .
   docker run --name notifications-db -e MYSQL_ROOT_PASSWORD=root -d notifications-db
   ```
3. Connect to the MySQL database:
   ```sh
   docker exec -it notifications-db mysql -uadmin -padminpass -D notifications_db
   ```
4. Verify that the `notifications` table exists:
   ```sql
   SHOW TABLES;
   ```

## Notes
- The default MySQL credentials are provided in the environment variables above. Change them for production environments.
- The database will automatically be created and initialized with the provided script when the container starts for the first time.

---

This README ensures a smooth setup and deployment of the notifications database using MySQL and Docker.
