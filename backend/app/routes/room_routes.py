from flask import Blueprint
from app.controllers import room_controller
from app.middlewares.auth_middleware import jwt_required_role

bp = Blueprint('rooms', __name__, url_prefix='/rooms')

bp.post('')(jwt_required_role('admin')(room_controller.create_room))
bp.get('')(room_controller.get_rooms)
bp.get('/<room_id>')(room_controller.get_room_detail)
bp.put('/<room_id>')(jwt_required_role('admin')(room_controller.update_room))
bp.delete('/<room_id>')(jwt_required_role('admin')(room_controller.delete_room))
