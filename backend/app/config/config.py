import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-jwt-secret')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:Pankajverma3110@localhost:5432/hotel_booking')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Mail Configuration (Optional)
    MAIL_SERVER = os.getenv('SMTP_SERVER')
    MAIL_PORT = int(os.getenv('SMTP_PORT'))
    MAIL_USERNAME = os.getenv('SMTP_EMAIL')
    MAIL_PASSWORD = os.getenv('SMTP_PASSWORD')
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
