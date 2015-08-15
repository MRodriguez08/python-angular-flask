'''
'''
from carsportal import app
from carsportal.entities.user.models import User
from flask.ext.sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

def _populate_users():    
    user_check = User.query.filter_by(email='mau.rod.81090@gmail.com').first()
    if user_check is None:
        new_user = User(
            email = 'mau.rod.81090@gmail.com',
            nick = 'mrodriguez',
            password = 'mrodriguez',
            name = 'Mauricio',
            phone_number = '096521211',
            enabled = True,
        );
    
        db.session.add(new_user)
        db.session.commit()
    
def populate():
    _populate_users()