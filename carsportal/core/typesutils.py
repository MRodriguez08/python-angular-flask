import re


def is_number(value):
    return value.isdigit()

def is_email(value):
    regex = re.compile('^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$')
    return regex.match(value) is not None

def is_boolean(value):
    return isinstance(value, bool)