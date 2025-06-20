from app import db
from datetime import datetime
import uuid

class Room(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    hotel_id = db.Column(db.String, db.ForeignKey('hotels.id'), nullable=False)
    room_type = db.Column(db.String, nullable=False)
    price_per_night = db.Column(db.Numeric(10, 2), nullable=False)
    max_guests = db.Column(db.Integer, nullable=False)
    amenities = db.Column(db.ARRAY(db.String))
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    bookings = db.relationship("Booking", backref="room", lazy=True)
