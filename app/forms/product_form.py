from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

class ProductForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = TextAreaField('description', validators=[DataRequired()]),
  price = IntegerField('price', validators=[DataRequired()]),
