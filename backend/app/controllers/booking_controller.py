from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.booking import Booking
from app.models.room import Room
from datetime import datetime
from app.middlewares.auth_middleware import jwt_required_role
from app.utils.email_service import send_email
from flask import current_app
from flask_executor import Executor

# Optional: Use background email sending (recommended)
executor = Executor()

# ----------------------------
# Book a Room
# ----------------------------
@jwt_required()
def book_room():
    try:
        data = request.get_json()
        user = get_jwt_identity()

        # Get customer details from request
        customer_name = data.get('name', user.get('name'))
        customer_email = data.get('email', user.get('email'))
        customer_phone = data.get('phone')

        room = Room.query.get(data.get('room_id'))

        if not room or not room.is_available:
            return jsonify({"msg": "Room not available"}), 400

        check_in = datetime.strptime(data.get('check_in'), "%Y-%m-%d").date()
        check_out = datetime.strptime(data.get('check_out'), "%Y-%m-%d").date()

        if check_in >= check_out:
            return jsonify({"msg": "Check-out date must be after check-in date"}), 400

        # Check for overlapping bookings
        overlapping = Booking.query.filter(
            Booking.room_id == room.id,
            Booking.status == 'confirmed',
            Booking.check_in < check_out,
            Booking.check_out > check_in
        ).first()

        if overlapping:
            return jsonify({"msg": "Room is already booked for selected dates"}), 409

        # Calculate total price
        nights = (check_out - check_in).days
        total_price = nights * float(room.price_per_night)

        # Create booking
        booking = Booking(
            user_id=user.get('id'),
            customer_name=customer_name,
            customer_email=customer_email,
            customer_phone=customer_phone,
            hotel_id=room.hotel_id,
            room_id=room.id,
            check_in=check_in,
            check_out=check_out,
            total_price=total_price,
            status='confirmed'
        )
        db.session.add(booking)
        db.session.commit()

        # Send confirmation email (using background task)
        email_message = f"""
        Hello {customer_name},

        Your booking has been confirmed.

        Booking Details:
        Room: {room.room_number or room.id}
        Location: {room.location}
        Check-in Date: {check_in}
        Check-out Date: {check_out}
        Total Price: ₹{total_price}

        Thank you for booking with us!
        """
        
        executor.submit(send_email,
            to_email=customer_email,
            subject="Booking Confirmation",
            message=email_message
        )

        return jsonify({
            "msg": "Booking confirmed and email sent",
            "booking_id": booking.id,
            "total_price": total_price
        }), 201

    except Exception as e:
        return jsonify({"msg": "Error booking room", "error": str(e)}), 500

# ----------------------------
# Get User's Bookings
# ----------------------------
@jwt_required()
def get_my_bookings():
    try:
        user_id = get_jwt_identity()['id']
        bookings = Booking.query.filter_by(user_id=user_id).all()

        return jsonify([{
            "id": b.id,
            "room_id": b.room_id,
            "hotel_id": b.hotel_id,
            "customer_name": b.customer_name,
            "customer_email": b.customer_email,
            "customer_phone": b.customer_phone,
            "check_in": b.check_in.strftime("%Y-%m-%d"),
            "check_out": b.check_out.strftime("%Y-%m-%d"),
            "status": b.status,
            "total_price": float(b.total_price)
        } for b in bookings]), 200

    except Exception as e:
        return jsonify({"msg": "Error fetching bookings", "error": str(e)}), 500

# ----------------------------
# Cancel a Booking
# ----------------------------
@jwt_required()
def cancel_booking(booking_id):
    try:
        user_id = get_jwt_identity()['id']
        booking = Booking.query.get(booking_id)

        if not booking or booking.user_id != user_id:
            return jsonify({"msg": "Unauthorized or booking not found"}), 403

        if booking.status != 'confirmed':
            return jsonify({"msg": "Booking is already cancelled or cannot be cancelled"}), 400

        booking.status = 'cancelled'
        db.session.commit()

        return jsonify({"msg": "Booking cancelled successfully"}), 200

    except Exception as e:
        return jsonify({"msg": "Error cancelling booking", "error": str(e)}), 500

# ----------------------------
# Admin: Get All Bookings
# ----------------------------
@jwt_required_role('admin')
def get_all_bookings():
    try:
        bookings = Booking.query.all()
        return jsonify([{
            "id": b.id,
            "user_id": b.user_id,
            "customer_name": b.customer_name,
            "customer_email": b.customer_email,
            "customer_phone": b.customer_phone,
            "room_id": b.room_id,
            "hotel_id": b.hotel_id,
            "check_in": b.check_in.strftime("%Y-%m-%d"),
            "check_out": b.check_out.strftime("%Y-%m-%d"),
            "status": b.status,
            "total_price": float(b.total_price)
        } for b in bookings]), 200

    except Exception as e:
        return jsonify({"msg": "Error fetching all bookings", "error": str(e)}), 500