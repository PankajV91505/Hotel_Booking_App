from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_executor import Executor
from app.config.db import db
from app.config.config import Config  # Recommended: Keep sensitive data in config.py
from app.routes.auth_routes import bp as auth_bp
from app.routes.hotel_routes import bp as hotel_bp
from app.routes.booking_routes import bp as booking_bp
from flask_migrate import Migrate 


app = Flask(__name__)

# Load Config from Config Class
app.config.from_object(Config)

# Initialize Extensions
CORS(app)
db.init_app(app)
jwt = JWTManager(app)
executor = Executor(app)

migrate = Migrate(app, db)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(hotel_bp, url_prefix='/api')
app.register_blueprint(booking_bp, url_prefix='/api')

# # Run Application
# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True)


if __name__ == '__main__':
    app.run(debug=True)