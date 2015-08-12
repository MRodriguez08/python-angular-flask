__author__ = 'mrodriguez'

from carsportal import db
from carsportal.entities.user.models import User


class UserService:
    def __init__(self):
        self.dummyData = 0

    def get(self, id):
        return User.query.get(id) 

    def delete(self, id):
        try:
            user = User.query.get(id)
            if user is None:
                return 'user not found'
            db.session.delete(user);
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return repr(e)

    def get_all(self):
        return User.query.all()

    def create(self, data):
        try:

            # perform validations over user information
            validation = self._check_user_data(data)
            if not (validation is None):
                return validation

            user_check = User.query.filter_by(email=data.get('email')).first()
            if not (user_check is None):
                return "User email already in use"

            new_user = User(
                email = data.get('email'),
                nick = data.get('nick'),
                password = data.get('password'),
                name = data.get('name'),
                phone_number = data.get('phoneNumber'),
                device_id = data.get('deviceId'),
                enabled = True,
            );

            db.session.add(new_user)
            db.session.commit()

            return True
        except Exception as e:
            db.session.rollback()
            return repr(e)

    def update(self, data):
        try:

            # perform validations over user information
            user_id = data.get('id', '')
            if len(user_id) == 0:
                return 'user id is empty'
            validation = self._check_user_data(data)
            if not (validation is None):
                return validation

            user = User.query.get(user_id)
            if user is None:
                return 'user not found'

            # check if the user's new email is not already in use
            users = User.query.filter_by(email=data.get('email'))
            for u in users:
                if u.id != user.id:
                    return "User email already in use"

            user.name = data.get('name', '')
            user.email = data.get('email', '')
            user.device_id = data.get('deviceId', '')
            user.nick = data.get('nick', '')
            user.phone_number = data.get('phoneNumber', '')

            db.session.add(user)
            db.session.commit()

            return True
        except Exception as e:
            db.session.rollback()
            return repr(e)

    # returns None in case al validations are checked ok, otherwise returns the validation error messagesd
    def _check_user_data(self, data):
        email = data.get('email', '')
        if len(email) == 0:
            return "User email is empty"
        email = data.get('deviceId', '')
        if len(email) == 0:
            return "Device id is empty"
        return None