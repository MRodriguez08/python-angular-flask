from carsportal import app
from carsportal.entities.user.services import UserService
from carsportal.entities.user.models import User
from carsportal.core.responseutils import response_with_status
from flask import  jsonify, request, session, json
from carsportal.core.decorators import requires_roles, json_content
from carsportal.core.logger import get_logger

logger = get_logger(__name__)
logger.info('users resource')

@app.route('/users', methods=['GET'])
def get_users():
    user_service = UserService()
    list = user_service.get_collection()
    return response_with_status(list)

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user_service = UserService()
    user = user_service.get(id)
    if user is None:
        return response_with_status({'message': 'user not found'}, 404)
    else:
        return response_with_status(user.serialize)

@app.route('/users/<int:id>', methods=['PUT'])
@json_content(fields=['!email%e','!nick', 'name','surname'])
def update_user(id):
    data = request.get_json()
    user_service = UserService()
    op = user_service.update(id, data)
    return response_with_status(op.to_dict(), 200)


@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user_service = UserService()
    result = user_service.delete(id)
    if not(result is None):
        return response_with_status({'message': result}, 404)
    else:
        return response_with_status({'message': 'User deleted'}, 204)
    
@app.route('/register', methods=['POST'])
@json_content(fields=['!email%e','!nick', 'name','surname', '!password'])
def register():
    data = request.get_json()
    user_service = UserService()
    op = user_service.create(data)
    return response_with_status({'message': 'registered successfully'}, 201)

@app.route('/authentication', methods=['POST'])
@json_content(fields=['!user', '!password'])
def login():
    json_data = request.json
    service = UserService()
    auth = service.login(json_data.get('user'), json_data.get('password'))
    if auth is None:
        return response_with_status({'message': 'invalid username or password'}, 403)        
    else:
        session['user'] = json.dumps(auth.to_dict())
        return response_with_status({'message': 'you are logged in'}, 200)

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return response_with_status({'message': 'invalid username or password'}, 403)

@app.route('/account', methods=['GET'])
@requires_roles(['admin', 'user'])
def get_account():
    try:
        user_service = UserService()
        logger.info('session[user] = %s ' % str(session['user']))
        sess_user = json.loads('{}' if session['user'] is None else str(session['user']))
        user = user_service.get(int(sess_user.get('id')))
        if user is None:
            return response_with_status({'message': 'user not found'}, 404)
        else:
            return response_with_status(user.to_dict())
    except Exception as e:
        logger.exception(e)
        raise e
    
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
