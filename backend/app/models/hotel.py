from app import db
from datetime import datetime
import uuid

class Hotel(db.Model):
    __tablename__ = 'hotels'
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(100), nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)
    created_by = db.Column(db.String, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    rooms = db.relationship("Room", backref="hotel", lazy=True)
    bookings = db.relationship("Booking", backref="hotel", lazy=True)
