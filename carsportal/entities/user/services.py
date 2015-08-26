from carsportal.core.exceptions import ConflictError, NotFoundError,\
    BadRequestError
from carsportal import db
from carsportal.entities.user.models import User, Role
from carsportal.core.service import Service

import bcrypt

__author__ = 'mrodriguez'


class UserService(Service):

    __model__ = User

    def create(self, data):
        # perform validations over user information
        user_check = self._find(email=data.get('email')).first()
        if not (user_check is None):
            raise ConflictError({'message': 'User email already in use'})
        user_check = self._find(nick=data.get('nick')).first()
        if not (user_check is None):
            raise ConflictError({'message': 'User nick already in use'})

        password = bcrypt.hashpw(data.get('password').encode('utf-8'),
                                 bcrypt.gensalt())
        new_user = User(
            email=data.get('email'),
            nick=data.get('nick'),
            password=password,
            name=data.get('name'),
            phone_number=data.get('phoneNumber'),
            enabled=True,
        )

        role = RoleService()._find(name='user').first()
        new_user.roles.append(role)

        self.save(new_user)

    def update(self, id, data):
        try:
            user = self.get(id)
            if user is None:
                raise NotFoundError()

            # check if the user's new email is not already in use
            user_check = self._find(email=data.get('email')).first()
            if user_check is not None and user_check.id != id:
                raise ConflictError({'message': 'User email already in use'})

            user_check = self._find(nick=data.get('nick')).first()
            if user_check is not None and user_check.id != id:
                raise ConflictError({'message': 'User nick already in use'})

            user = self.get(id)
            user.name = data.get('name')
            user.email = data.get('email')
            user.nick = data.get('nick')
            user.phone_number = data.get('phoneNumber')
            return self.save(user)
        except Exception as e:
            print str(e)

    def change_password(self, id, data):
        try:
            user = self.get(id)
            if user is None:
                raise NotFoundError()

            password = data.get('password')
            password_confirmation = data.get('passwordConfirmation')
            if password_confirmation != password:
                raise BadRequestError({'message': 'account.changepassword.messages.error.passwordsnotmatch'})

            password = bcrypt.hashpw(data.get('password').encode('utf-8'),
                                     bcrypt.gensalt())
            user.password = password
            return self.save(user)
        except Exception as e:
            print str(e)

    def login(self, user, password):
        user_check = self._find(nick=user).first()
        if user_check is None:
            user_check = self._find(email=user).first()
        if (user_check is None or
                bcrypt.hashpw(password.encode('utf-8'),
                              user_check.password.encode('utf-8')) !=
                              user_check.password.encode('utf-8')):
            return None
        else:
            return user_check


class RoleService(Service):

    __model__ = Role
