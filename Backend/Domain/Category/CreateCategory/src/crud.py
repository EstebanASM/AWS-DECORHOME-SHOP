from sqlalchemy.orm import Session
from models import Category
from schemas import CategoryCreate
from sqlalchemy.exc import IntegrityError
import graphql

def create_category(db: Session, category: CategoryCreate):
    # Verificar si la categoría ya existe
    existing_category = db.query(Category).filter(Category.name == category.name).first()
    
    if existing_category:
        # Retornar un error adecuado de GraphQL en vez de lanzar una excepción
        raise graphql.GraphQLError(f"La categoría '{category.name}' ya existe.")
    
    # Crear la nueva categoría
    new_category = Category(name=category.name)  # Cambié 'nombre' por 'name'
    db.add(new_category)
    
    try:
        db.commit()
        db.refresh(new_category)  # Obtener el id generado
    except IntegrityError:
        db.rollback()  # En caso de error, revertir la transacción
        raise graphql.GraphQLError(f"Error: La categoría '{category.name}' ya existe.")
    
    return new_category
