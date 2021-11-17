from .db import db

class Custom_Option(db.Model):
    __tablename__ = 'custom_options'

    id = db.Column(db.Integer, primary_key=True)
    type_id = db.Column(db.Integer(),db.ForeignKey('product_types.id'), nullable=False)
    color_id = db.Column(db.Integer(),db.ForeignKey('colors.id'), nullable=False)
    gold = db.Column(db.Boolean(), nullable=False)
    silver = db.Column(db.Boolean(), nullable=False)
    logo = db.Column(db.Boolean(), nullable=False)
    custom_shape = db.Column(db.Boolean(), nullable=False)
    air_brushing = db.Column(db.Boolean(), nullable=False)
    logo_image = db.Column(db.String(255))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'type_id': self.type_id,
            'color_id': self.color_id,
            'logo': self.logo,
            'custom_shape': self.custom_shape,
            'air_brushing': self.air_brushing,
            'logo_image': self.logo_image,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
        }
 