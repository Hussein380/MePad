# models/__init__.py

from .base import Base
from .consumer import Consumer
from .order import Order
from .dishes import Dishes
from .chef import Chef
from .review import Review
from .order_dishes import OrderDishes

# Optionally, create a convenience function to initialize the database session
def init_db(engine):
    Base.metadata.create_all(engine)
