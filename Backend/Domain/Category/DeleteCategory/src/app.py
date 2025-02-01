from fastapi import FastAPI, HTTPException
from ariadne import QueryType, MutationType, make_executable_schema
from ariadne.asgi import GraphQL
from crud import delete_category
from sqlalchemy.orm import Session
from database import get_db
import uvicorn

# Definir el esquema GraphQL
type_defs = """
    type Category {
        id: ID!
        name: String!
    }

    type Query {
        categories: [Category]!
    }

    type Mutation {
        deleteCategory(id: ID!): Boolean!
    }
"""

# Crear el resolutor para las consultas y mutaciones
query = QueryType()
mutation = MutationType()


# Resolver la mutación para eliminar una categoría
@mutation.field("deleteCategory")
def resolve_delete_category(_, info, id: str):
    db: Session = next(get_db())
    success = delete_category(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found")
    return success

# Crear el esquema ejecutable
schema = make_executable_schema(type_defs, query, mutation)

# Crear la aplicación FastAPI y la ruta GraphQL
app = FastAPI()
app.add_route("/delgraphql", GraphQL(schema))



if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
