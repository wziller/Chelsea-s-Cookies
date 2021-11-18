from .db import db

class Custom_Order(db.Model):
    __tablename__ = 'custom_orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(),db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(800), nullable=False)
    options_id = db.relationship("Custom_Option", backref=db.backref('custom_options', lazy=True))
    delivery_date = db.Column(db.DateTime)
    delivery_address = db.Column(db.String(120), nullable=False)
    reference_images = db.relationship("Reference_Image", backref=db.backref('reference_images', lazy=True))
    status = db.Column(db.String(120), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'options': [options.to_dict() for options in self.options_id],
            'delivery_date': self.delivery_date,
            'delivery_address': self.delivery_address,
            'created_on': self.created_on,
            'reference_images': [image.to_dict() for image in self.reference_images],
            'status': self.status,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
        }
