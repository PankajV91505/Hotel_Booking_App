from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from app.config.db import db

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        # Validate input fields
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({"success": False, "msg": "All fields (name, email, password) are required."}), 400

        # Check if email is already registered
        if User.query.filter_by(email=email).first():
            return jsonify({"success": False, "msg": "Email already exists."}), 409

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create new user
        new_user = User(name=name, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        # Create JWT token
        access_token = create_access_token(identity={"id": new_user.id, "email": new_user.email, "name": new_user.name})

        return jsonify({
            "success": True,
            "msg": "User registered successfully.",
            "access_token": access_token
        }), 201

    except Exception as e:
        return jsonify({"success": False, "msg": "Registration failed.", "error": str(e)}), 500


# ✅ Add this Login Route
@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get('email') or not data.get('password'):
            return jsonify({"success": False, "msg": "Email and password are required."}), 400

        user = User.query.filter_by(email=data['email']).first()

        if not user or not check_password_hash(user.password_hash, data['password']):
            return jsonify({"success": False, "msg": "Invalid email or password."}), 401

        access_token = create_access_token(identity={"id": user.id, "email": user.email, "name": user.name})

        return jsonify({
            "success": True,
            "msg": "Login successful.",
            "access_token": access_token
        }), 200

    except Exception as e:
        return jsonify({"success": False, "msg": "Login failed.", "error": str(e)}), 500