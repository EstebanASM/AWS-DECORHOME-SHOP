# PostgreSQL Categories Database 

## Overview
This setup initializes a PostgreSQL database to store product categories. The database is configured with predefined categories and constraints to ensure data integrity.

## Environment Variables
Before starting the PostgreSQL container, ensure the following environment variables are set:

```plaintext
POSTGRES_DB=db_categories
POSTGRES_USER=admin
POSTGRES_PASSWORD=1753791003
```

## Docker Setup
This setup uses the official PostgreSQL Docker image.

### Dockerfile
```dockerfile
# Use the official PostgreSQL image
FROM postgres:latest

# Copy SQL initialization scripts
COPY init-db.sql /docker-entrypoint-initdb.d/
COPY insert-data.sql /docker-entrypoint-initdb.d/

# Expose default PostgreSQL port
EXPOSE 5432

# Default command to run PostgreSQL
CMD ["postgres"]
```

## Database Initialization
### Creating the Categories Table
```sql
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Add a UNIQUE constraint to prevent duplicate category names
ALTER TABLE categories
ADD CONSTRAINT unique_name UNIQUE (name);
```

### Inserting Default Categories
```sql
INSERT INTO categories (name) VALUES
('Sofas'),
('Tables'),
('Chairs'),
('Beds'),
('Wardrobes'),
('Desks'),
('Decorations'),
('Lighting')
ON CONFLICT (name) DO NOTHING; -- Avoids duplicate entries
```

## Running the Container
To run the PostgreSQL database with the configured settings, use the following command:

```sh
docker run --name categories_db -e POSTGRES_DB=db_categories -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=1753791003 -p 5432:5432 -d postgres:latest
```

## Accessing the Database
You can access the database using:

```sh
docker exec -it categories_db psql -U admin -d db_categories
```

## Notes
- The `init-db.sql` and `insert-data.sql` files should be placed in the same directory as the Dockerfile.
- The `ON CONFLICT (name) DO NOTHING` ensures no duplicate categories are inserted.
- The default PostgreSQL port `5432` is exposed for connections.

## Conclusion
This setup provides a structured way to manage product categories within a PostgreSQL database using Docker. 🚀
