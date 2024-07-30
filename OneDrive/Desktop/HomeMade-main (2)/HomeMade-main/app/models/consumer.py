from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base

class Consumer(Base):
    __tablename__ = "consumers"

    consumer_id = Column(Integer, primary_key=True, autoincrement=True)
    consumer_username = Column(String(255), unique=True, nullable=False)
    consumer_email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    profile_image = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    
    # Relationship with Order
    orders = relationship("Order", back_populates="consumer")

    # Define a string representation
    def __repr__(self):
        return f"<Consumer(consumer_id={self.consumer_id}, consumer_username={self.consumer_username}, consumer_email={self.consumer_email})>"
