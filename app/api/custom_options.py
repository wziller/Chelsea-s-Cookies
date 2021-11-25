from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.custom_options_form import CustomOptionsForm
from app.models import Custom_Option, db



custom_options_routes = Blueprint('custom_options', __name__)

# GET all route
@custom_options_routes.route('/')
def custom_options():
    custom_options = Custom_Option.query.all()
    return {"custom_options":[order.to_dict() for order in custom_options]}

# GET by Id route
@custom_options_routes.route('/<int:id>')
def custom_option(id):
    custom_option = Custom_Option.query.get(id)
    return custom_option.to_dict()

# POST a order
@custom_options_routes.route('/custom_order/<int:id>', methods=['POST'])
def custom_options_post(id):
  """
  Creates a new custom order
  """

  form = CustomOptionsForm()

  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    custom_options = Custom_Option(
        order_id = id,
        more_colors = form.data['more_colors'],
        gold = form.data['gold'],
        silver = form.data['silver'],
        logo = form.data['logo'],
        custom_shape = form.data['custom_shape'],
        air_brushing = form.data['air_brushing'],
        flowers = form.data['flowers'],
    )
    db.session.add(custom_options)
    db.session.commit()
    return custom_options.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit options
@custom_options_routes.route('/edit/<int:id>', methods=['PUT'])
def custom_options_edit(id):
  custom_options_to_edit = Custom_Option.query.get_or_404(id)
  form = CustomOptionsForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    custom_options_to_edit.more_colors=form.data['more_colors'],
    custom_options_to_edit.gold = form.data['gold'],
    custom_options_to_edit.silver = form.data['silver'],
    custom_options_to_edit.logo = form.data['logo'],
    custom_options_to_edit.custom_shape = form.data['custom_shape'],
    custom_options_to_edit.air_brushing = form.data['air_brushing'],
    custom_options_to_edit.flowers = form.data['flowers'],
  try:
    db.session.commit()
    return custom_options_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"

@custom_options_routes.route('/delete/<int:id>', methods=['DELETE'])
def options_delete(id):
  custom_options = Custom_Option.query.filter(Custom_Option.id == id).first()
  try:
    db.session.delete(custom_options)
    db.session.commit()
    return custom_options.to_dict()
  except:
    return "No Server Found"
