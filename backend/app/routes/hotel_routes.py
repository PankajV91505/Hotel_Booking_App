from flask import Blueprint, jsonify
from app.models.hotel import Hotel

bp = Blueprint('hotel', __name__)

@bp.route('/hotels', methods=['GET'])
def get_hotels():
    hotels = Hotel.query.all()
    result = []
    for hotel in hotels:
        result.append({
            "id": hotel.id,
            "name": hotel.name,
            "location": hotel.location,
            "price": hotel.price,
            "rating": hotel.rating,
            "image": hotel.image
        })
    return jsonify(result)
