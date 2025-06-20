from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from app import db
from app.models.hotel import Hotel

def create_hotel():
    data = request.get_json()
    user = get_jwt_identity()
    new_hotel = Hotel(
        name=data['name'],
        description=data.get('description', ''),
        location=data['location'],
        star_rating=data['star_rating'],
        created_by=user['id']
    )
    db.session.add(new_hotel)
    db.session.commit()
    return jsonify({"msg": "Hotel created", "hotel": new_hotel.id}), 201

def get_hotels():
    location = request.args.get('location')
    star = request.args.get('star')

    query = Hotel.query
    if location:
        query = query.filter(Hotel.location.ilike(f"%{location}%"))
    if star:
        query = query.filter(Hotel.star_rating == int(star))

    hotels = query.all()
    return jsonify([{
        "id": h.id,
        "name": h.name,
        "location": h.location,
        "star_rating": h.star_rating
    } for h in hotels])

def get_hotel_detail(hotel_id):
    hotel = Hotel.query.get(hotel_id)
    if not hotel:
        return jsonify({"msg": "Hotel not found"}), 404
    return jsonify({
        "id": hotel.id,
        "name": hotel.name,
        "description": hotel.description,
        "location": hotel.location,
        "star_rating": hotel.star_rating
    })

def update_hotel(hotel_id):
    hotel = Hotel.query.get(hotel_id)
    if not hotel:
        return jsonify({"msg": "Hotel not found"}), 404

    data = request.get_json()
    hotel.name = data.get('name', hotel.name)
    hotel.description = data.get('description', hotel.description)
    hotel.location = data.get('location', hotel.location)
    hotel.star_rating = data.get('star_rating', hotel.star_rating)

    db.session.commit()
    return jsonify({"msg": "Hotel updated"})

def delete_hotel(hotel_id):
    hotel = Hotel.query.get(hotel_id)
    if not hotel:
        return jsonify({"msg": "Hotel not found"}), 404
    db.session.delete(hotel)
    db.session.commit()
    return jsonify({"msg": "Hotel deleted"})
