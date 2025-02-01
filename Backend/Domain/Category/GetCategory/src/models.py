from sqlalchemy import Column, String
from database import Base

class Category(Base):
    __tablename__ = 'categories'

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
