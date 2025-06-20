# app/routes/booking_routes.py

from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.middlewares.auth_middleware import jwt_required_role
from app.controllers import booking_controller

bp = Blueprint('bookings', __name__, url_prefix='/bookings')

# Routes
bp.post('')(jwt_required()(booking_controller.book_room))
bp.get('')(jwt_required()(booking_controller.get_my_bookings))
bp.get('/all')(jwt_required_role('admin')(booking_controller.get_all_bookings))
bp.put('/<booking_id>/cancel')(jwt_required()(booking_controller.cancel_booking))
