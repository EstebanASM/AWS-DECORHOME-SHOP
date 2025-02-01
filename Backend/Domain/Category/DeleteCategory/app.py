from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os

# Variables de entorno para la conexión
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:1753791003@localhost:5432/db_categories")

# Configuración de SQLAlchemy
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los modelos
Base = declarative_base()

# Función para obtener la sesión
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Modelo Category (Definición de la tabla)
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

# Lógica de API (Servicios)
router = APIRouter(prefix="/categories", tags=["Categories"])

@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    # Buscar la categoría por ID
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    # Eliminar la categoría
    db.delete(db_category)
    db.commit()
    
    return {"message": "Categoría eliminada"}

# Inicializar FastAPI
app = FastAPI(title="Category Microservice")

# Incluir la ruta de DELETE
app.include_router(router)
