from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

environment = os.getenv("ENVIRONMENT", "development")  # Por defecto será "development"

if environment == "production":
    
    # URL de conexión a la base de datos en AWS RDS (para producción)
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:ksdkosndk1212..@categorydb.cvzr7pomd22b.us-east-1.rds.amazonaws.com:5432/categorydb")
else:
    # URL de conexión a la base de datos en localhost (para desarrollo)
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:1753791003@localhost:5432/db_categories")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ✅ Función para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
