from flask import Blueprint, request, jsonify
from app.config.db import db
from app.models.booking import Booking
from app.models.hotel import Hotel
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('booking', __name__)

@bp.route('/book', methods=['POST'])
@jwt_required()
def book_hotel():
    data = request.get_json()
    user_id = get_jwt_identity()
    hotel_id = data.get('hotelId')
    check_in = data.get('checkIn')
    check_out = data.get('checkOut')
    guests = data.get('guests')

    booking = Booking(user_id=user_id, hotel_id=hotel_id, check_in=check_in, check_out=check_out, guests=guests)
    db.session.add(booking)
    db.session.commit()

    return jsonify({"message": "Booking successful!"})

@bp.route('/mybookings', methods=['GET'])
@jwt_required()
def my_bookings():
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user_id).all()
    result = []
    for booking in bookings:
        result.append({
            "hotel_name": booking.hotel.name,
            "location": booking.hotel.location,
            "check_in": booking.check_in,
            "check_out": booking.check_out,
            "guests": booking.guests
        })
    return jsonify(result)
