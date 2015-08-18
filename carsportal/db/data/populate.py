'''
'''
from carsportal import app
from carsportal.entities.user.models import User, Role
from flask.ext.sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

def _populate_users():   
    

    role_admin = Role(id = 1, name = 'admin');
    role_user = Role(id = 2, name = 'user');
        
    user = User.query.filter_by(email='mau.rod.81090@gmail.com').first()
    if user is None:
        user = User(
            email = 'mau.rod.81090@gmail.com',
            nick = 'mrodriguez',
            password = 'mrodriguez',
            name = 'Mauricio',
            phone_number = '096521211',
            enabled = True
        );
        
        user.roles.append(role_admin)
        user.roles.append(role_user)
        db.session.add(user)
        db.session.commit()    
    
def populate():
    _populate_users()
    
    
    