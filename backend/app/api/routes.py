from flask import Blueprint

# Import route blueprints from individual modules
from app.routes.auth_routes import bp as auth_bp
from app.routes.hotel_routes import bp as hotel_bp
from app.routes.room_routes import bp as room_bp
from app.routes.booking_routes import bp as booking_bp

# Create a parent API blueprint
api_bp = Blueprint('api', __name__, url_prefix='/api')

# Register all route blueprints under /api
api_bp.register_blueprint(auth_bp)
api_bp.register_blueprint(hotel_bp)
api_bp.register_blueprint(room_bp)
api_bp.register_blueprint(booking_bp)
