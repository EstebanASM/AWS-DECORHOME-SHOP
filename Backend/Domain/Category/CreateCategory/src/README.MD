# Category Creation Microservice

## Overview
This microservice provides a GraphQL API to manage categories using FastAPI and Ariadne. It connects to a PostgreSQL database via SQLAlchemy and allows users to create new categories.

## Technologies Used
- **FastAPI** (v0.95.2) - Web framework for building APIs
- **Ariadne** (v0.17.0) - GraphQL library
- **SQLAlchemy** (v2.0.18) - ORM for database interaction
- **Pydantic** (v1.11.1) - Data validation
- **Uvicorn** (v0.23.2) - ASGI server
- **PostgreSQL** (via psycopg2-binary v2.9.3) - Database

## Installation
### Prerequisites
Ensure you have Python installed (version 3.8+ recommended).

1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/category-service.git
   cd category-service
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

## Environment Variables
Create a `.env` file and set up the database URL:
```sh
DATABASE_URL=postgresql://admin:1753791003@localhost:5432/db_categories
```

## Database Setup
1. Run migrations to set up the database:
   ```sh
   python -m database_setup  # Ensure you have a script for database setup
   ```

## Running the Microservice
Start the FastAPI server using Uvicorn:
```sh
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## GraphQL Endpoint
The GraphQL API is available at:
```
http://localhost:8000/graphql
```
You can interact with it using GraphQL Playground or Postman.

## API Endpoints
### Mutation: Create a Category
#### Request:
```graphql
mutation {
  createCategory(name: "New Category") {
    id
    name
  }
}
```
#### Response:
```json
{
  "data": {
    "createCategory": {
      "id": 1,
      "name": "New Category"
    }
  }
}
```

### Query: Test Connection
#### Request:
```graphql
query {
  hello
}
```
#### Response:
```json
{
  "data": {
    "hello": "¡Hola desde GraphQL!"
  }
}
```

## Docker Deployment
A `Dockerfile` is included for containerization:
```dockerfile
FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```
To build and run the container:
```sh
docker build -t category-service .
docker run -p 8000:8000 category-service
```

