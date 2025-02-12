from fastapi import FastAPI
from ariadne import QueryType, make_executable_schema
from ariadne.asgi import GraphQL
from sqlalchemy.orm import Session
from database import get_db
from crud import get_category_by_id
from fastapi.middleware.cors import CORSMiddleware

# Definir el esquema GraphQL
type_defs = """
    type Category {
        id: ID!
        name: String!
    }

    type Query {
        getCategoryById(id: ID!): Category
    }
"""

# Crear el resolutor para la consulta
query = QueryType()

@query.field("getCategoryById")
def resolve_get_category_by_id(_, info, id: str):
    db: Session = next(get_db())
    return get_category_by_id(db, id)

# Crear el esquema ejecutable
schema = make_executable_schema(type_defs, query)

# Crear la aplicación FastAPI con GraphQL
app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Cambia esto si tienes otro origen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_route("/Idgraphql", GraphQL(schema))

