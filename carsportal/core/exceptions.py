# -*- coding: utf-8 -*-
__author__ = 'mrodriguez'

from flask import Response, json, jsonify


class BaseExceptionError(Exception):
    _status_code = None
    _payload = None

    def __init__(self, payload=None):
        Exception.__init__(self)
        if self.status_code is None:
            raise NotImplementedError()
        self._payload = payload

    @staticmethod
    def get_headers():
        """Get a list of headers."""
        return [('Content-Type', 'application/json')]

    def get_response(self):
        json_str = '' if self._payload is None else json.dumps(self._payload)
        return Response(json_str, self.status_code, self.get_headers())


class BadRequestError(BaseExceptionError):
    status_code = 400


class ValidationError(BadRequestError):
    # Parameters:
    # missing (list of string)
    #  This means a resource does not exist.
    # missing_field (list of string)
    #  This means a required field on a resource has not been set.
    # invalid (list of string)
    #  This means the formatting of a field is invalid.
    #  The documentation for that resource should be able to
    #  give you more specific information.
    # already_exists (list of string)
    #  This means another resource has the same value as this field.
    #  This can happen in resources that must have some unique key.
    # payload format:
    # [{ "field": name, "code": code}, .... ]
    def __init__(self, missing=None, missing_fields=None,
                 invalid=None, already_exists=None):
        errors = []
        if missing is not None:
            for field in missing:
                errors.append({
                    "field": field,
                    "code": "missing"
                })
        if missing_fields is not None:
            for field in missing_fields:
                errors.append({
                    "field": field,
                    "code": "missing_field"
                })
        if invalid is not None:
            for field in invalid:
                errors.append({
                    "field": field,
                    "code": "invalid"
                })
        if already_exists is not None:
            for field in already_exists:
                errors.append({
                    "field": field,
                    "code": "already_exists"
                })
        BadRequestError.__init__(self,
                                 payload={"message": "ValidationError",
                                          "errors": errors})


class InternalServerError(BaseExceptionError):
    status_code = 500


class NotFoundError(BaseExceptionError):
    status_code = 404


class BadGatewayError(BaseExceptionError):
    status_code = 502
    
class ConflictError(BaseExceptionError):
    status_code = 409
    
def configure_error_handlers(app):

    # pylint: disable=W0612
    @app.errorhandler(NotFoundError)
    def handle_notfound(error):
        return error.get_response()

    @app.errorhandler(404)
    def handle_notfound_404(_):
        err = NotFoundError()
        return err.get_response()

    @app.errorhandler(BadRequestError)
    def handle_badrequesterror(error):
        return jsonify(error.to_dict()), error.status_code

    @app.errorhandler(ConflictError)
    def handle_conflict(error):
        return error.get_response()

    @app.errorhandler(InternalServerError)
    def handle_internalservererror(error):
        return error.get_response()

    @app.errorhandler(BadGatewayError)
    def handle_badgatewayerror(error):
        return error.get_response()

    #Unexpected error.
    @app.errorhandler(Exception)
    def handle_default_error(error):
        err = InternalServerError(error)
        return err.get_response()

