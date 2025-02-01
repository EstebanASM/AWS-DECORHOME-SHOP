from sqlalchemy.orm import Session
from models import Category

def delete_category(db: Session, category_id: str):
    # Buscar la categoría por su ID
    category = db.query(Category).filter(Category.id == category_id).first()
    
    if category:
        db.delete(category)
        db.commit()
        return True  # Categoría eliminada exitosamente
    return False  # Si no se encuentra la categoría
