from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.booking import Booking
from app.models.room import Room
from datetime import datetime

def book_room():
    data = request.get_json()
    user = get_jwt_identity()
    room = Room.query.get(data['room_id'])

    if not room or not room.is_available:
        return jsonify({"msg": "Room not available"}), 400

    check_in = datetime.strptime(data['check_in'], "%Y-%m-%d").date()
    check_out = datetime.strptime(data['check_out'], "%Y-%m-%d").date()

    # Check overlap
    overlapping = Booking.query.filter(
        Booking.room_id == room.id,
        Booking.status == 'confirmed',
        Booking.check_in < check_out,
        Booking.check_out > check_in
    ).first()

    if overlapping:
        return jsonify({"msg": "Room is already booked for selected dates"}), 409

    # Calculate price
    nights = (check_out - check_in).days
    total_price = nights * float(room.price_per_night)

    booking = Booking(
        user_id=user['id'],
        hotel_id=room.hotel_id,
        room_id=room.id,
        check_in=check_in,
        check_out=check_out,
        total_price=total_price
    )
    db.session.add(booking)
    db.session.commit()

    return jsonify({"msg": "Booking confirmed", "booking_id": booking.id}), 201

@jwt_required()
def get_my_bookings():
    user_id = get_jwt_identity()['id']
    bookings = Booking.query.filter_by(user_id=user_id).all()

    return jsonify([{
        "id": b.id,
        "room_id": b.room_id,
        "hotel_id": b.hotel_id,
        "check_in": b.check_in.strftime("%Y-%m-%d"),
        "check_out": b.check_out.strftime("%Y-%m-%d"),
        "status": b.status,
        "total_price": float(b.total_price)
    } for b in bookings])

@jwt_required()
def cancel_booking(booking_id):
    user_id = get_jwt_identity()['id']
    booking = Booking.query.get(booking_id)

    if not booking or booking.user_id != user_id:
        return jsonify({"msg": "Unauthorized or not found"}), 403

    booking.status = 'cancelled'
    db.session.commit()
    return jsonify({"msg": "Booking cancelled"})

# Admin-only
from app.middlewares.auth_middleware import jwt_required_role

@jwt_required_role('admin')
def get_all_bookings():
    bookings = Booking.query.all()
    return jsonify([{
        "id": b.id,
        "user_id": b.user_id,
        "room_id": b.room_id,
        "hotel_id": b.hotel_id,
        "check_in": b.check_in.strftime("%Y-%m-%d"),
        "check_out": b.check_out.strftime("%Y-%m-%d"),
        "status": b.status,
        "total_price": float(b.total_price)
    } for b in bookings])
