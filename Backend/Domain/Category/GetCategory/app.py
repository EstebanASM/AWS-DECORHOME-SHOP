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

@router.get("/")
def get_categories(db: Session = Depends(get_db)):
    # Obtener todas las categorías
    categories = db.query(Category).all()
    if not categories:
        raise HTTPException(status_code=404, detail="No hay categorías disponibles")
    
    return {"categories": categories}

# Inicializar FastAPI
app = FastAPI(title="Category Microservice")

# Incluir la ruta de GET
app.include_router(router)
