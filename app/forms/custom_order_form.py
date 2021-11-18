from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Custom_Order

class CustomOrderForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  description = TextAreaField('description', validators=[DataRequired()]),
  delivery_date = StringField('delivery_date', validators=[DataRequired()])
  delivery_address = StringField('delivery_address', validators=[DataRequired()]),
  status = StringField('status', validators=[DataRequired()]),
