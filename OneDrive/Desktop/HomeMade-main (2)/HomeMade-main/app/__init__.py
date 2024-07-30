# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Import routes to register them
from app.routes import main_routes

db = SQLAlchemy()

def create_app(config_class='app.config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    
    with app.app_context():
        # Create database tables
        db.create_all()
    
    # Register routes
    app.register_blueprint(main_routes.bp)
    
    return app
