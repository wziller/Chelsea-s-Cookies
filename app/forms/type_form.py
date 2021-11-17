from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Color

class TypeForm(FlaskForm):
  type_name = StringField('type_name', validators=[DataRequired()])
