from sqlalchemy import Column, String
from database import Base  # Asumiendo que tienes un archivo `database.py` que inicializa la DB

class Category(Base):
    __tablename__ = 'categories'

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
