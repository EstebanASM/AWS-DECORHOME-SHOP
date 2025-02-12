# GetCategory 

This project implements a FastAPI application using GraphQL to manage categories in a PostgreSQL database.

## Features
- **Create a category** (`createCategory`)
- **Delete a category** (`deleteCategory`)
- **Retrieve categories** (`categories`)
- Uses **SQLAlchemy** for database interactions
- Supports **CORS** for frontend integration

---

## Installation

### Prerequisites
- Python 3.8+
- PostgreSQL database
- Virtual environment (recommended)

### Setup
1. **Create a virtual environment and activate it**
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
2. **Install dependencies**
   ```sh
   pip install -r requirements.txt
   ```
3. **Set up the database**
   - Update the `DATABASE_URL` in `.env` file (or modify `database.py` directly):
     ```env
     DATABASE_URL=postgresql://admin:1753791003@localhost:5432/db_categories
     ```
   - Create database tables:
     ```sh
     python -c 'from database import Base, engine; Base.metadata.create_all(engine)'
     ```

---

## Running the Application

### Start the server
```sh
uvicorn main:app --reload
```

### Available Endpoints
| Endpoint         | Method | Description |
|-----------------|--------|-------------|
| `/graphql`      | POST   | GraphQL endpoint for category creation |
| `/delgraphql`   | POST   | GraphQL endpoint for category deletion |
| `/getgraphql`   | POST   | GraphQL endpoint for retrieving categories |

---

## GraphQL Schema

### Category Type
```graphql
type Category {
    id: ID!
    name: String!
}
```

### Queries
```graphql
type Query {
    categories: [Category]!
}
```

### Mutations
```graphql
type Mutation {
    createCategory(name: String!): Category!
    deleteCategory(id: ID!): Boolean!
}
```

## Dependencies
```txt
fastapi==0.95.2
uvicorn==0.23.2
ariadne==0.17.0
sqlalchemy==2.0.18
pydantic==1.11.1
psycopg2-binary==2.9.3  # Required for PostgreSQL
```



