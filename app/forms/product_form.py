from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from flask_wtf.file import FileField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

class ProductForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  price = StringField('price', validators=[DataRequired()])
  image_link = StringField('image_link', validators=[DataRequired()])
  category = StringField('category', validators=[DataRequired()])
