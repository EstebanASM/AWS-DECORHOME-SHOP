# Category Deletion

This microservice allows category deletion using FastAPI and GraphQL.

## 📌 Features
- Implementation of GraphQL with `ariadne`.
- Category deletion via a GraphQL mutation.
- Connection to a PostgreSQL database using SQLAlchemy.

## 🛠️ Installation

1. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```

## ⚙️ Database Configuration
Make sure PostgreSQL is running and set up the `DATABASE_URL` environment variable in the `.env` file:
```env
DATABASE_URL=postgresql://admin:1753791003@localhost:5432/db_categories
```

## 🚀 Running the Server
To start the server:
```sh
uvicorn main:app --reload
```

## 📝 GraphQL Schema

### Mutation to delete a category
```graphql
mutation {
    deleteCategory(id: "1")
}
```
**Expected Response:**
```json
{
    "data": {
        "deleteCategory": true
    }
}
```

If the category does not exist:
```json
{
    "errors": [
        {
            "message": "Category not found",
            "path": ["deleteCategory"]
        }
    ]
}
```

## 🛠️ Technologies Used
- FastAPI
- GraphQL with `ariadne`
- SQLAlchemy
- PostgreSQL

## 📌 Additional Notes
- Ensure the database is properly configured before running the application.
- You can test GraphQL queries at `/delgraphql` after starting the server.

---

Ready to use! 🚀

