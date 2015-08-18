from carsportal import db

class Brand(db.Model):

    __tablename__ = 'brands'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), index=True, unique=True, nullable=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Brand %r>' % self.name

    def to_dict(self):
        dict = {
            'id': self.id,
            'name': self.name
        }
        return dict