# chef.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from base import Base


class Chef(Base):
    __tablename__ = 'chefs'
    
    chef_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String(120), nullable=False, unique=True)
    bio = Column(String(100))
    profile_picture = Column(String(255))
    rating = Column(Float)
    
    # Assuming a one-to-many relationship between chefs and dishes
    dishes = relationship('Dish', backref='chef', lazy=True)
    media = relationship('Media', back_populates='chef')  # Added

    # One-to-many relationship with Review
    reviews = relationship('Review', backref='chef', lazy=True)

    def __repr__(self):
        return f"<Chef(chef_id={self.chef_id}, username={self.username}, email={self.email})>"