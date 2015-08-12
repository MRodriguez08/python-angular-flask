from carsportal import app
from carsportal.entities.user.services import UserService
from carsportal.core.exceptions import RequiredDataException
from flask import  jsonify, request

@app.route('/users', methods=['GET'])
def get_users():
    user_service = UserService()
    list = user_service.get_all()
    return jsonify(json_list=[i.serialize for i in list])

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user_service = UserService()
    user = user_service.get(id)
    if user is None:
        return jsonify({'message': 'user not found'}), 404
    else:
        return jsonify(user.serialize)


@app.route('/users', methods=['POST'])
def update_user():
    data = request.get_json()
    user_service = UserService()
    op = user_service.create(data)
    if op is True:
        return jsonify({'message': 'User created'}), 201
    else:
        return jsonify({'message': op}), 400


@app.route('/users', methods=['PUT'])
def create_user():
    data = request.get_json()
    user_service = UserService()
    op = user_service.update(data)
    if op is True:
        return jsonify({'message': 'User updated'}), 204
    else:
        return jsonify({'message': op}), 400


@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user_service = UserService()
    result = user_service.delete(id)
    if not(result is None):
        return jsonify({'message': result}), 404
    else:
        return jsonify({'message': 'User deleted'}), 204

