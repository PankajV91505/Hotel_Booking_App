from flask import request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user import User
from app import db

bcrypt = Bcrypt()

def register_user():
    data = request.get_json()
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(full_name=data['name'], email=data['email'], password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered"}), 201

def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        token = create_access_token(identity={'id': user.id, 'role': user.role})
        return jsonify(access_token=token)
    return jsonify({"msg": "Invalid credentials"}), 401

@jwt_required()
def get_profile():
    user_id = get_jwt_identity()['id']
    user = User.query.get(user_id)
    return jsonify({
        "name": user.full_name,
        "email": user.email,
        "role": user.role
    })
