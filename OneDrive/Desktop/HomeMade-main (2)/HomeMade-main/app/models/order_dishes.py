from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from .base import Base

class OrderDishes(Base):
    __tablename__ = "order_dishes"

    order_dishes_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    dish_id = Column(Integer, ForeignKey("dishes.dish_id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Establish relationships
    order = relationship("Order", back_populates="order_dishes")
    dish = relationship("Dishes", back_populates="order_dishes")

    # Define a string representation
    def __repr__(self):
        return f"<OrderDishes(order_dishes_id={self.order_dishes_id}, order_id={self.order_id}, dish_id={self.dish_id}, quantity={self.quantity})>"