from fastapi import FastAPI
from ariadne.asgi import GraphQL
from graphql_schema import schema

app = FastAPI()
app.add_route("/graphql", GraphQL(schema, debug=True))
