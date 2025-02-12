from ariadne import QueryType, MutationType, make_executable_schema, gql
from database import get_db
from crud import create_category
from schemas import CategoryCreate

type_defs = gql("""
    type Category {
        id: ID!
        name: String!
    }

    type Query {
        hello: String!
    }

    type Mutation {
        createCategory(name: String!): Category!
    }
""")

query = QueryType()
mutation = MutationType()

@query.field("hello")
def resolve_hello(_, info):
    return "¡Hola desde GraphQL!"

@mutation.field("createCategory")
def resolve_create_category(_, info, name):
    db = next(get_db())
    category_data = CategoryCreate(name=name)
    new_category = create_category(db, category_data)
    return new_category

schema = make_executable_schema(type_defs, query, mutation)
