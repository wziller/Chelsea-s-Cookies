from .db import db

class Color(db.Model):
    __tablename__ = 'colors'

    id = db.Column(db.Integer, primary_key=True)
    color_name = db.Column(db.String(120), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())




    def to_dict(self):
        return {
            'id': self.id,
            'color_name': self.category_name,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
        }
