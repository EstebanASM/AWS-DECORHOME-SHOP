from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
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

# Esquema de Validación
class CategoryCreate(BaseModel):
    name: str

# Lógica de API (Servicios)
router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/", status_code=201)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    # Verificar si la categoría ya existe
    db_category = db.query(Category).filter(Category.name == category.name).first()
    if db_category:
        raise HTTPException(status_code=400, detail="Categoría ya existe")

    # Crear la nueva categoría
    new_category = Category(name=category.name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    
    return {"message": "Categoría creada", "category": new_category}

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Inicializar FastAPI
app = FastAPI(title="Category Microservice")

# Incluir solo la ruta POST del microservicio
app.include_router(router)
