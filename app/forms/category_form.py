from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Category

class CategoryForm(FlaskForm):
  category_name = StringField('category_name', validators=[DataRequired()])
