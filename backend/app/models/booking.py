from app import db
from datetime import datetime
import uuid

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    hotel_id = db.Column(db.String, db.ForeignKey('hotels.id'), nullable=False)
    room_id = db.Column(db.String, db.ForeignKey('rooms.id'), nullable=False)
    check_in = db.Column(db.Date, nullable=False)
    check_out = db.Column(db.Date, nullable=False)
    status = db.Column(db.String, default='confirmed')
    total_price = db.Column(db.Numeric(10, 2))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
