from sqlalchemy.orm import Session
from models import Category

def get_categories(db: Session):
    # Obtener todas las categorías de la base de datos
    return db.query(Category).all()
