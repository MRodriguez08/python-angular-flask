from carsportal import app
from carsportal.entities.user.services import UserService
from carsportal.entities.user.models import User
from carsportal.core.responseutils import response_with_status
from flask import  jsonify, request
from carsportal.core.decorators import requires_roles, json_content

@app.route('/api/users', methods=['GET'])
@requires_roles([])
def get_users():
    user_service = UserService()
    list = user_service.get_all()
    return response_with_status(json_list=[i.serialize for i in list])

@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    user_service = UserService()
    user = user_service.get(id)
    if user is None:
        return response_with_status({'message': 'user not found'}, 404)
    else:
        return response_with_status(user.serialize)


@app.route('/api/users', methods=['POST'])
@json_content(fields=['e!email'])
def update_user():
    data = request.get_json()
    user_service = UserService()
    op = user_service.create(data)
    if op is True:
        return jsonify({'message': 'User created'}), 201
    else:
        return jsonify({'message': op}), 400


@app.route('/api/users', methods=['PUT'])
def create_user():
    data = request.get_json()
    user_service = UserService()
    op = user_service.create(data)
    if op is True:
        return response_with_status({'message': 'User updated'}, 204)
    else:
        return response_with_status({'message': op}, 400)


@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user_service = UserService()
    result = user_service.delete(id)
    if not(result is None):
        return response_with_status({'message': result}, 404)
    else:
        return response_with_status({'message': 'User deleted'}, 204)
    
@app.route('/api/register', methods=['POST'])
def register():
    json_data = request.json
    user = User(
        email=json_data['email'],
        password=json_data['password']
    )
    try:
        db.session.add(user)
        db.session.commit()
        status = 'success'
    except: 
        status = 'this user is already registered'
    db.session.close()
    return response_with_status({'result': status})

