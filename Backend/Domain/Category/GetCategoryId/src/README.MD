# Get Category by ID

This microservice allows retrieving a category by its ID using FastAPI and GraphQL.

## 📌 Features
- Implementation of GraphQL with `ariadne`.
- Query to fetch a category by its ID.
- PostgreSQL database connection using SQLAlchemy.
- CORS configuration for frontend integration.

## 🛠️ Installation

1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

## ⚙️ Database Configuration
Ensure PostgreSQL is running and set the `DATABASE_URL` environment variable in the `.env` file:
```env
DATABASE_URL=postgresql://admin:1753791003@localhost:5432/db_categories
```

## 🚀 Running the Application
To start the server:
```sh
uvicorn main:app --reload
```

## 📝 GraphQL Schema

### Query to Get a Category by ID
```graphql
query {
    getCategoryById(id: "1") {
        id
        name
    }
}
```

**Expected Response:**
```json
{
    "data": {
        "getCategoryById": {
            "id": "1",
            "name": "Electronics"
        }
    }
}
```

If the category does not exist:
```json
{
    "data": {
        "getCategoryById": null
    }
}
```

## 🛠️ Technologies Used
- FastAPI
- GraphQL with `ariadne`
- SQLAlchemy
- PostgreSQL

## 📌 Additional Notes
- Ensure the database is set up correctly before running the application.
- You can test GraphQL queries at `/Idgraphql` once the server is running.

---

Ready to use! 🚀
