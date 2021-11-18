from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.fields.core import BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Order

class CustomOptionsForm(FlaskForm):
  product_id = IntegerField('product_id', validators=[DataRequired()])
  type_id = IntegerField('type_id', validators=[DataRequired()])
  more_colors = BooleanField('more_colors', validators=[DataRequired()])
  gold = BooleanField('gold', validators=[DataRequired()]),
  silver = BooleanField('silver', validators=[DataRequired()]),
  logo = BooleanField('logo', validators=[DataRequired()]),
  custom_shape = BooleanField('custom_shape', validators=[DataRequired()]),
  air_brushing = BooleanField('air_brushing', validators=[DataRequired()]),
  flowers = BooleanField('flowers', validators=[DataRequired()]),
  logo_image = StringField('logo_image', validators=[DataRequired()]),
