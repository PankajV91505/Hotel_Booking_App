from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app, resources={r"/auth/*": {"origins": "http://localhost:5173"}})  # Match Vite port

    db.init_app(app)
    jwt.init_app(app)

    from .routes import auth_routes, hotel_routes, room_routes, booking_routes
    app.register_blueprint(auth_routes.bp, url_prefix='/auth')
    app.register_blueprint(hotel_routes.bp)
    app.register_blueprint(room_routes.bp)
    app.register_blueprint(booking_routes.bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)