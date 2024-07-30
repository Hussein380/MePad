# order.py
from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    order_date = Column(DateTime(timezone=True), default=func.now())  # Ensures current timestamp
    consumer_id = Column(Integer, ForeignKey("consumers.consumer_id"))
    chef_id = Column(Integer, ForeignKey("chefs.chef_id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Establish relationships
    chef = relationship("Chef", back_populates="orders")
    consumer = relationship("Consumer", back_populates="orders")
    order_dishes = relationship("OrderDishes", back_populates="order")

    # Define a string representation
    def __repr__(self):
        return f"<Order(order_id={self.order_id}, order_date={self.order_date}, consumer_id={self.consumer_id}, chef_id={self.chef_id})>"
