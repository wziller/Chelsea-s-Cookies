from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Color

class ColorForm(FlaskForm):
  color_name = StringField('color_name', validators=[DataRequired()])
