from carsportal import db

users_roles = db.Table('users_roles',
    db.Column('role_id', db.Integer, db.ForeignKey('roles.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)  

class User(db.Model):

    __tablename__ = 'users' 

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    nick = db.Column(db.String(60), nullable=True)
    password = db.Column(db.String(60), nullable=True)
    name = db.Column(db.String(60), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    enabled = db.Column(db.SmallInteger)
    
    roles = db.relationship('Role', secondary=users_roles,
        backref=db.backref('roles', lazy='dynamic'))

    def __init__(self, email, nick, password, name, phone_number, enabled):
        self.email = email
        self.nick = nick
        self.password = password
        self.name = name
        self.phone_number = phone_number
        self.enabled = enabled

    def __repr__(self):
        return '<User %r>' % self.email

    def to_dict(self):
       return {
           'id': self.id,
           'email': self.email,
           'nick': self.nick,
           'name': self.name,
           'phone_number': self.phone_number,
           'roles' : [role.to_dict().get('name')
                                for role in self.roles]
       }

class Role(db.Model):
    
    __tablename__ = 'roles'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return '<Role %r>' % self.name
    
    def to_dict(self):
       return {
           'id': self.id,
           'name': self.name
       }
       