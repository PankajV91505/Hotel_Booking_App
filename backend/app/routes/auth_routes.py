from flask import Blueprint, request, jsonify
from app.config.db import db
from app.models.user import User
from flask_jwt_extended import create_access_token
from datetime import timedelta

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 409

    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id, expires_delta=timedelta(days=1))
    return jsonify({"access_token": token, "user": {"id": user.id, "name": user.name, "email": user.email}})
