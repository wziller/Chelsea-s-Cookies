from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Color

class GalleryItemForm(FlaskForm):
  product_id = StringField('product_id', validators=[DataRequired()]),
  image = StringField('image', validators=[DataRequired()]),
  description = TextAreaField('description', validators=[DataRequired()]),
