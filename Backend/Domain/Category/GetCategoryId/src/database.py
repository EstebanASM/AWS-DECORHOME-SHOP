from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# URL de conexión de la base de datos PostgreSQL desde la variable de entorno
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:ksdkosndk1212..@categorydb.cvzr7pomd22b.us-east-1.rds.amazonaws.com:5432/categorydb")


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
