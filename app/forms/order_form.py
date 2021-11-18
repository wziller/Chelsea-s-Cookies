from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Order

class OrderForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  delivery_date = StringField('name', validators=[DataRequired()])
  delivery_address = StringField('delivery_address', validators=[DataRequired()]),
  suggestion_images = StringField('suggestion_images', validators=[DataRequired()]),
  status = StringField('status', validators=[DataRequired()]),
