
from functools import wraps
from flask import request, session, json
from carsportal.core.responseutils import response_with_status
from carsportal.core.typesutils import is_boolean, is_email, is_number
from carsportal.core.logger import get_logger

logger = get_logger(__name__)

def requires_roles(roles):
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            try:
                #logger.info('sess user = %r' % session['user'])
                user = json.loads(str(session['user'] if 'user' in session else '{}'))
                user_roles = user.get('roles')
                logger.info('user_roles = %r' % user_roles)
                if user_roles is None or str(user_roles[0]) not in roles:
                    return response_with_status({ 'message':'you are not authorized' }, 403)
                return f(*args, **kwargs)
            except Exception as e:
                logger.exception(e)
                raise e
        return wrapped
    return wrapper


def json_content(fields=[]):
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            try:
                content = request.get_json()
                if content is None:
                    return response_with_status({'message':'content is not json'}, 400)
                for field in fields:                    
                    field_type = ''
                    field_name = field
                    allow_empty = '!' not in field
                    if not allow_empty:
                        field_data = field.split('!')
                        field_name = field_data[1]                        
                    has_type = '%' in field
                    if has_type:
                        field_data = field_name.split('%')
                        field_name = field_data[0]
                        field_type = field_data[1]                                                                
                    if field_name not in content:
                        return response_with_status({'message': ('missing field %s' % field_name)}, 400)                    
                    if not allow_empty and content.get(field_name) == '':
                        return response_with_status({'message': ('%s cannot be empty' % field_name)}, 406)
                    if field_type != '':
                        if field_type not in ['e', 'i', 'b']:
                            return response_with_status({'message': ('invalid type %s' % field_type)}, 500)
                        if field_type == 'e' and not is_email(content.get(field_name)): 
                            return response_with_status({'message': ('%s is not an email' % field_name)}, 406)
                        elif field_type == 'i' and not is_number(content.get(field_name)):
                            return response_with_status({'message': ('%s is not an integer' % field_name)}, 406)
                        elif field_type == 'b' and not is_boolean(content.get(field_name)):
                            return response_with_status({'message': ('%s is not an integer' % field_name)}, 406)
                            
            except Exception as e:
                return response_with_status({'message': str(e)}, 400)
            return f(*args, **kwargs)
        return wrapped
    return wrapper