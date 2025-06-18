from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__)

@api_bp.route("/hotels", methods=["GET"])
def get_hotels():
    # Dummy data
    hotels = [
        {"id": 1, "name": "Hotel Paradise", "city": "Delhi", "price": 1999},
        {"id": 2, "name": "Sea View Resort", "city": "Goa", "price": 2999}
    ]
    return jsonify(hotels)
