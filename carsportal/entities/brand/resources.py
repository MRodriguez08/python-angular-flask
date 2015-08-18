from carsportal import app
from carsportal.entities.brand.services import BrandService
from carsportal.entities.user.models import User
from carsportal.core.responseutils import response_with_status
from flask import request
from carsportal.core.decorators import requires_roles, json_content

@app.route('/brand', methods=['GET'])
def get_brands():
    service = BrandService()
    list = service.get_collection()
    return response_with_status(list)

@app.route('/brand/<int:id>', methods=['GET'])
def get_brand(id):
    service = BrandService()
    e = service.get(id)
    if e is None:
        return response_with_status({'message': 'Brand not found'}, 404)
    else:
        return response_with_status(e.to_dict())

@app.route('/brand', methods=['POST'])
@json_content(fields=['!name'])
def create_brand():
    data = request.get_json()
    service = BrandService()
    service.create(data)
    return response_with_status({'message': 'success'}, 201)


@app.route('/brand/<int:id>', methods=['PUT'])
@json_content(fields=['!name'])
def update_brand(id):
    data = request.get_json()
    service = BrandService()
    service.update(id, data)
    return response_with_status({'message': 'success'}, 200)


@app.route('/brand/<int:id>', methods=['DELETE'])
def delete_brand(id):
    service = BrandService()
    result = service.delete(id)
    if not(result is None):
        return response_with_status({'message': result}, 404)
    else:
        return response_with_status({'message': 'Brand deleted'}, 204)
