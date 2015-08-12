from carsportal import db
from carsportal.core.model import BaseModel


class User(db.Model, BaseModel):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    nick = db.Column(db.String(60), nullable=True)
    password = db.Column(db.String(60), nullable=True)
    name = db.Column(db.String(60), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    enabled = db.Column(db.SmallInteger)

    def __init__(self, email, nick, password, name, phone_number, device_id, enabled):
        self.email = email
        self.nick = nick
        self.password = password
        self.name = name
        self.phone_number = phone_number
        self.enabled = enabled

    def __repr__(self):
        return '<User %r>' % self.email

    @property
    def serialize(self):
       return {
           'id': self.id,
           'email': self.email,
           'nick': self.nick,
           'name': self.name,
           'phone_number': self.phone_number
       }
