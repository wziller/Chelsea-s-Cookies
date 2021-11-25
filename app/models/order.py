from app.models import order_detail
from .db import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(),db.ForeignKey('users.id'), nullable=False)
    details_id = db.relationship("Order_Detail", cascade="delete", backref=db.backref('order_details', lazy=True))
    delivery_date = db.Column(db.DateTime)
    delivery_address = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(120), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'details_id': [details.to_dict() for details in self.details_id],
            'delivery_date': self.delivery_date.strftime("%d-%b-%Y"),
            'delivery_address': self.delivery_address,
            'status': self.status,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
        }
