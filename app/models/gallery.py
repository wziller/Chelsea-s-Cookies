from .db import db

class Gallery_Item(db.Model):
    __tablename__ = 'gallery'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer(), db.ForeignKey('products.id'), nullable=False)
    image = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(800), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())



    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'image': self.image,
            'description': self.description,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
        }
