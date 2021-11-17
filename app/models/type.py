from .db import db

class Type(db.Model):
    __tablename__ = 'product_types'

    id = db.Column(db.Integer, primary_key=True)
    type_name = db.Column(db.String(120), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())




    def to_dict(self):
        return {
            'id': self.id,
            'type_name': self.type_name,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
        }
