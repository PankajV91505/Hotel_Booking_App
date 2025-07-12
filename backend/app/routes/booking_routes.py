from flask import Blueprint, request, jsonify
from app.config.db import db
from app.models.booking import Booking
from app.models.hotel import Hotel
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.email_service import send_email

bp = Blueprint('booking', __name__)

@bp.route('/book', methods=['POST'])
@jwt_required()
def book_hotel():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()

        hotel_id = data.get('hotelId')
        check_in = data.get('checkIn')
        check_out = data.get('checkOut')
        guests = data.get('guests')

        # ✅ New customer info from frontend
        customer_email = data.get('customer_email')
        customer_phone = data.get('customer_phone')

        if not customer_email or not customer_phone:
            return jsonify({"msg": "Customer email and phone are required"}), 400

        hotel = Hotel.query.get(hotel_id)
        if not hotel:
            return jsonify({"msg": "Hotel not found"}), 404

        booking = Booking(
            user_id=user_id,
            hotel_id=hotel_id,
            check_in=check_in,
            check_out=check_out,
            guests=guests,
            customer_email=customer_email,
            customer_phone=customer_phone
        )
        db.session.add(booking)
        db.session.commit()

        # ✅ Send Email
        email_message = f"""
        Hello,

        Your booking has been confirmed.

        Hotel: {hotel.name}
        Location: {hotel.location}
        Check-in: {check_in}
        Check-out: {check_out}
        Guests: {guests}

        Thank you for booking with us!
        """
        send_email(customer_email, "Booking Confirmation", email_message)

        return jsonify({"message": "Booking successful! Confirmation email sent."}), 201

    except Exception as e:
        return jsonify({"msg": "Error booking hotel", "error": str(e)}), 500


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
            "guests": booking.guests,
            "customer_email": booking.customer_email,
            "customer_phone": booking.customer_phone
        })
    return jsonify(result)
