from app.config.db import db

class Hotel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    location = db.Column(db.String(100))
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    image = db.Column(db.String(300))
