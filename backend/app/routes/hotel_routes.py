from flask import Blueprint
from app.controllers import hotel_controller
from app.middlewares.auth_middleware import jwt_required_role
from flask_jwt_extended import jwt_required

bp = Blueprint('hotels', __name__, url_prefix='/hotels')

bp.post('')(jwt_required_role('admin')(hotel_controller.create_hotel))
bp.get('')(hotel_controller.get_hotels)
bp.get('/<hotel_id>')(hotel_controller.get_hotel_detail)
bp.put('/<hotel_id>')(jwt_required_role('admin')(hotel_controller.update_hotel))
bp.delete('/<hotel_id>')(jwt_required_role('admin')(hotel_controller.delete_hotel))
