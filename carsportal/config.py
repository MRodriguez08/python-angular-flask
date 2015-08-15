"""
   cars portal application configuration file.
"""
__author__ = 'mrodriguez'

import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'mysql://root:ms_admin@localhost/carsportal'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, '/', 'db')