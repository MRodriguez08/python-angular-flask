from carsportal.core.exceptions import ConflictError
__author__ = 'mrodriguez'

from carsportal import db
from carsportal.entities.brand.models import Brand
from carsportal.core.service import Service


class BrandService(Service):
    __model__ = Brand
        
    def create(self, data):
        
        brand_check = self._find(name=data.get('name')).first()
        if brand_check is not None:
            raise ConflictError({'message':'name already used'})
        model = Brand(name=data.get('name')) 
        self.save(model)
    
    def update(self, id, data):
        
        brand_check = self._find(name=data.get('name')).first()
        if brand_check is not None and brand_check.id != id:
            raise ConflictError({'message':'name already used'})
        model = self.get(id)
        model.name = data.get('name') 
        self.save(model)