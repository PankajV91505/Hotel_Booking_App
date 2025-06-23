from app.config.db import db

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'))
    check_in = db.Column(db.String(50))
    check_out = db.Column(db.String(50))
    guests = db.Column(db.Integer)

    user = db.relationship('User', backref='bookings')
    hotel = db.relationship('Hotel', backref='bookings')
