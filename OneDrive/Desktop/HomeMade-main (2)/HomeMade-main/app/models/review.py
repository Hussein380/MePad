# review.py
from sqlalchemy import Column, Integer, String, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from .base import Base

class Review(Base):
    __tablename__ = 'reviews'
    
    review_id = Column(Integer, primary_key=True, autoincrement=True)
    review_comment = Column(String(255), nullable=False)
    review_rating = Column(Integer, nullable=False)
    chef_id = Column(Integer, ForeignKey('chefs.chef_id'), nullable=False)
    
    chef = relationship('Chef', back_populates='reviews')
    
    __table_args__ = (
        CheckConstraint('review_rating >= 1 AND review_rating <= 5', name='check_review_rating_range'),
    )

def __repr__(self):
        return f"<Review(review_id={self.review_id}, review_comment={self.review_comment}, review_rating={self.review_rating}, chef_id={self.chef_id})>"