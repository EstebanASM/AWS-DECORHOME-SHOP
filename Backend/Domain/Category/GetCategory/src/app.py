from fastapi import FastAPI
from ariadne import gql, load_schema_from_path
from ariadne.asgi import GraphQL
from sqlalchemy.orm import Session
from crud import get_categories
from database import get_db

# Cargar el esquema GraphQL desde el archivo
schema = load_schema_from_path("graphql_schema.graphql")

# Crear el ejecutor de GraphQL
app = FastAPI()

# Resolver la consulta de categories
from ariadne import QueryType

query = QueryType()

@query.field("categories")
def resolve_categories(_, info):
    db: Session = next(get_db())
    return get_categories(db)

# Crear el esquema ejecutable
from ariadne import make_executable_schema
executable_schema = make_executable_schema(schema, query)

# Ruta para GraphQL
app.add_route("/getgraphql", GraphQL(executable_schema))
