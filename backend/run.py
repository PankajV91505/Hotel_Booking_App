# run.py

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config.db import db
from app.routes.auth_routes import bp as auth_bp

app = Flask(__name__)

# Secret keys and configs
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['JWT_SECRET_KEY'] = 'your-jwt-secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Pankajverma3110@localhost:5432/hotel_booking'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Extensions
CORS(app)
db.init_app(app)
JWTManager(app)

# Routes
app.register_blueprint(auth_bp, url_prefix='/auth')

# Run App
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
