from apps import db
from datetime import datetime

# TODO template below
# class User(db.Model):
#     __tablename__ = 'User'
#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     name = db.Column(db.String(128), unique=True, nullable=False)
#     email = db.Column(db.String(128), unique=True, nullable=False)
#     password = db.Column(db.String(128), default='', nullable=False)

# class Device(db.Model):
#     __tablename__ = 'Device'
#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
#     client_id = db.Column(db.String(128), default='', nullable=False)
#     type = db.Column(db.UnicodeText(128), nullable=False)
#     name = db.Column(db.String(128), unique=True, nullable=False)
#     description = db.Column(db.UnicodeText(255), nullable=False)
#     create_time = db.Column(db.DateTime, default=datetime.now, nullable=False)

# class Message(db.Model):
#     __tablename__ = 'Message'
#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     client_id = db.Column(db.String(128), default='', nullable=False)
#     longitude = db.Column(db.Double, default=0.0, nullable=False)
#     latitude = db.Column(db.Double, default=0.0, nullable=False)
#     alert = db.Column(db.Boolean, default=0, nullable=False)
#     time = db.Column(db.DateTime, default=datetime.now, nullable=False)
#     info = db.Column(db.String(255), default='', nullable=False)
#     value = db.Column(db.Integer, default=0, nullable=False)