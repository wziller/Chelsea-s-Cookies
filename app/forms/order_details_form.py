from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.fields.core import BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Order

class OrderDetailsForm(FlaskForm):
    order_id = IntegerField('order_id', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
