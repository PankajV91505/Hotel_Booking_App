from flask import request, jsonify
from app import db
from app.models.room import Room

def create_room():
    data = request.get_json()
    room = Room(
        hotel_id=data['hotel_id'],
        room_type=data['room_type'],
        price_per_night=data['price_per_night'],
        max_guests=data['max_guests'],
        amenities=data.get('amenities', []),
        is_available=data.get('is_available', True)
    )
    db.session.add(room)
    db.session.commit()
    return jsonify({"msg": "Room created", "room_id": room.id}), 201

def get_rooms():
    hotel_id = request.args.get('hotelId')
    query = Room.query
    if hotel_id:
        query = query.filter_by(hotel_id=hotel_id)
    return jsonify([{
        "id": r.id,
        "room_type": r.room_type,
        "price_per_night": float(r.price_per_night),
        "amenities": r.amenities,
        "max_guests": r.max_guests,
        "is_available": r.is_available
    } for r in query.all()])

def get_room_detail(room_id):
    room = Room.query.get(room_id)
    if not room:
        return jsonify({"msg": "Room not found"}), 404
    return jsonify({
        "id": room.id,
        "room_type": room.room_type,
        "price_per_night": float(room.price_per_night),
        "amenities": room.amenities,
        "max_guests": room.max_guests,
        "is_available": room.is_available
    })

def update_room(room_id):
    room = Room.query.get(room_id)
    if not room:
        return jsonify({"msg": "Room not found"}), 404
    data = request.get_json()
    room.room_type = data.get('room_type', room.room_type)
    room.price_per_night = data.get('price_per_night', room.price_per_night)
    room.max_guests = data.get('max_guests', room.max_guests)
    room.amenities = data.get('amenities', room.amenities)
    room.is_available = data.get('is_available', room.is_available)
    db.session.commit()
    return jsonify({"msg": "Room updated"})

def delete_room(room_id):
    room = Room.query.get(room_id)
    if not room:
        return jsonify({"msg": "Room not found"}), 404
    db.session.delete(room)
    db.session.commit()
    return jsonify({"msg": "Room deleted"})
