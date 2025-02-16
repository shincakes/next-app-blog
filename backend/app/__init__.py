import logging
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from config import Config
from app.utils import logger  

# Initialize extensions (without attaching to app yet)
db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()

def create_app():
    """Factory function to create a Flask app instance."""
    app = Flask(__name__)
    app.config.from_object("config.Config")
    
    # ✅ Move CORS inside create_app after app is created
    CORS(app, resources={r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000", "http://192.168.1.5:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE",  "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }})

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # Register routes
    from app.routes import register_routes
    register_routes(app)

    # Log application startup
    logger.info("Flask application initialized successfully!")

    return app
