
from flask import make_response
import json


def response_with_status(data, status=200, content_type='application/json'):
    resp = make_response(json.dumps(data), status)
    resp.headers['Content-Type'] = content_type
    return resp