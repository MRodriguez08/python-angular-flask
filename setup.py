import os
from setuptools import setup, find_packages

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "carsportal",
    version = "0.0.1",
    author = "Mauricio Rodriguez",
    author_email = "mrodriguez@gmail.com",
    description = (""),
    license = "BSD",
    keywords = "cars, cars portal, car catalogue",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Topic :: Utilities",
        "License :: OSI Approved :: BSD License",
    ],
    install_requires = [
        'Flask==0.10.1',
        'SQLAlchemy==1.0.8',
        'Flask-SQLAlchemy==2.0',
        'sqlalchemy-migrate==0.9.7',
        'bcrypt==1.0.1'
    ]
)