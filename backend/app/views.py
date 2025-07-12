from flask import Blueprint, render_template, request, jsonify
from app import db
from app.models.user import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash

bp = Blueprint('views', __name__)

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            data = request.get_json() or request.form
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            if not name or not email or not password:
                return jsonify({"success": False, "msg": "All fields are required"}), 400

            if User.query.filter_by(email=email).first():
                return jsonify({"success": False, "msg": "Email already exists"}), 409

            hashed_password = generate_password_hash(password)
            new_user = User(name=name, email=email, password_hash=hashed_password)
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity={"id": new_user.id, "email": new_user.email, "name": new_user.name})
            return jsonify({
                "success": True,
                "msg": "User registered successfully",
                "access_token": access_token
            }), 201

        except Exception as e:
            return jsonify({"success": False, "msg": "Registration failed", "error": str(e)}), 500

    return render_template('register.html')
