from flask import request, jsonify
from app.models.user_model import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity
from datetime import timedelta

# Register new user
def register_user():
    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    if not full_name or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(full_name=full_name, email=email, password=hashed_password, role='user')

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Login user and return JWT token
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(
        identity={"id": user.id, "email": user.email, "role": user.role},
        expires_delta=timedelta(days=1)
    )
    return jsonify({"access_token": access_token}), 200

# Get profile of current user
def get_profile():
    identity = get_jwt_identity()
    user = User.query.filter_by(id=identity["id"]).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role
    }), 200
