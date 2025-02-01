from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# URL de conexión a la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:1753791003@localhost:5432/db_categories")

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL)

# Crear la sesión de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crear una clase base para los modelos
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
