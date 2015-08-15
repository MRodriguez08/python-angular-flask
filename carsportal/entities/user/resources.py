from carsportal import app
from carsportal.entities.user.services import UserService
from carsportal.entities.user.models import User
from carsportal.core.responseutils import response_with_status
from flask import  jsonify, request
from carsportal.core.decorators import requires_roles, json_content

@app.route('/api/users', methods=['GET'])
def get_users():
    user_service = UserService()
    list = user_service.get_collection()
    return response_with_status(list)

@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    user_service = UserService()
    user = user_service.get(id)
    if user is None:
        return response_with_status({'message': 'user not found'}, 404)
    else:
        return response_with_status(user.serialize)

@app.route('/api/users', methods=['POST'])
@json_content(fields=['!email%e','!nick', 'name','surname'])
def create_user():
    data = request.get_json()
    user_service = UserService()
    op = user_service.create(data)
    return jsonify({'message': 'User created'}), 201


@app.route('/api/users/<int:id>', methods=['PUT'])
@json_content(fields=['!email%e','!nick', 'name','surname'])
def update_user(id):
    data = request.get_json()
    user_service = UserService()
    op = user_service.update(id, data)
    return response_with_status(op.to_dict(), 200)


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

@app.route('/api/account', methods=['POST'])
def get_account():
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

@app.route('/api/login', methods=['POST'])
@json_content(fields=['!user', '!password'])
def login():
    json_data = request.json
    service = UserService()
    auth = service.login(json_data.get('user'), json_data.get('password'))
    if auth is None:
        return response_with_status({'message': 'invalid username or password'}, 403)        
    else:
        return response_with_status({'message': 'you are logged in'}, 200)
