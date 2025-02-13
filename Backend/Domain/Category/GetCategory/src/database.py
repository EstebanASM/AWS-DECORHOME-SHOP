import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexión de la base de datos PostgreSQL desde la variable de entorno
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:ksdkosndk1212..@categorydb.cvzr7pomd22b.us-east-1.rds.amazonaws.com:5432/categorydb")

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
