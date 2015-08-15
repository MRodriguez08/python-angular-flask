'''Cars Portal main application module
'''
__author__ = 'mrodriguez'

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from carsportal import config  
from carsportal.core.exceptions import configure_error_handlers

def create_app(debug=False):
    _app = Flask(__name__)
    _app.config.from_object(config)
    _app.debug = debug
    return _app

app = create_app(debug=True)
db = SQLAlchemy(create_app())
configure_error_handlers(app)

from carsportal.entities.user import models, services, resources
from carsportal.entities.brand import models, services, resources