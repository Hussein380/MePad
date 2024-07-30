# dishes.py
from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class Dishes(Base):
    __tablename__ = "dishes"

    dish_id = Column(Integer, primary_key=True, autoincrement=True)
    dish_name = Column(String(255), nullable=False)
    dish_image = Column(String(255), nullable=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    chef_id = Column(Integer, ForeignKey("chefs.chef_id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Establish relationships
    chef = relationship("Chef", back_populates="dishes")
    order_dishes = relationship("OrderDishes", back_populates="dish")	

    # Define a string representation
    def __repr__(self):
        return f"<Dishes(dish_id={self.dish_id}, dish_name={self.dish_name}, price={self.price}, quantity={self.quantity}, chef_id={self.chef_id})>"
