# app/routes/auth_routes.py

from flask import Blueprint
from app.controllers import auth_controller

bp = Blueprint('auth', __name__, url_prefix='/auth')

# Route bindings
bp.post('/register')(auth_controller.register_user)
bp.post('/login')(auth_controller.login_user)
bp.get('/profile')(auth_controller.get_profile)
