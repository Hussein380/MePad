from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Media(Base):
    __tablename__ = 'media'
    
    media_id = Column(Integer, primary_key=True, autoincrement=True)
    media_url = Column(String(255), nullable=False)  # URL or path to the media file
    media_type = Column(Enum('image', 'video', name='media_types'), nullable=False)  # Type of media
    chef_id = Column(Integer, ForeignKey('chefs.chef_id'), nullable=False)
    
    chef = relationship('Chef', back_populates='media')

    def __repr__(self):
        return f"<Media(media_id={self.media_id}, media_url={self.media_url}, media_type={self.media_type}, chef_id={self.chef_id})>"
