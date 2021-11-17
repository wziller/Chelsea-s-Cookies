from .db import db

class Custom_Order(db.Model):
    __tablename__ = 'custom_orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(),db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(800), nullable=False)
    options_id = db.Column(db.Integer(), db.ForeignKey('custom_options.id'), nullable=False)
    delivery_date = db.Column(db.DateTime)
    delivery_address = db.Column(db.String(120), nullable=False)
    suggestion_images = db.Column(db.String(800), nullable=False)
    status = db.Column(db.String(120), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'options_id': self.options_id,
            'delivery_date': self.delivery_date,
            'delivery_address': self.delivery_address,
            'suggestion_images': self.suggestion_images,
            'created_on': self.created_on,
            'status': self.status,
            'options': [custom_options.to_dict() for custom_options in self.custom_options]
        }
