import graphene
from graphene import ObjectType, Int, String
from .database import SessionLocal
from .crud import get_category_by_id
from .schemas import CategorySchema

class CategoryType(ObjectType):
    id = Int()
    name = String()

class Query(ObjectType):
    get_category = graphene.Field(CategoryType, id=Int(required=True))

    def resolve_get_category(self, info, id):
        db = SessionLocal()
        category = get_category_by_id(db, id)
        db.close()
        if category:
            return CategorySchema.from_orm(category)
        return None

schema = graphene.Schema(query=Query)
