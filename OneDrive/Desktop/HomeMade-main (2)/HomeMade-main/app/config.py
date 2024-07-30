# app/config.py

import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql://HomeMade:hzg@746789@localhost/HomeMade'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'mysecretkey')  # Use environment variable or default
