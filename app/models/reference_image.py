from .db import db

class Reference_Image(db.Model):
    __tablename__ = 'reference_images'

    id = db.Column(db.Integer, primary_key=True)
    custom_order_id = db.Column(db.Integer(), db.ForeignKey('custom_orders.id'), nullable=False)
    image_link = db.Column(db.String(350), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())




    def to_dict(self):
        return {
            'id': self.id,
            'image_link': self.image_link,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
        }
