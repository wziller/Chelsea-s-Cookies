from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
  user_id = IntegerField('type_name', validators=[DataRequired()]),
  product_id = IntegerField('type_name', validators=[DataRequired()]),
  content = TextAreaField('content', validators=[DataRequired()]),
  rating = IntegerField('rating', validators=[DataRequired()]),
