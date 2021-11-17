from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.color_form import ColorForm
from app.models import Color, db



color_routes = Blueprint('colors', __name__)

# GET all route
@color_routes.route('/')
def servers():
    colors = Color.query.all()
    return {[color.to_dict() for color in colors]}

# GET by Id route
@color_routes.route('/<int:id>')
def color(id):
    color = Color.query.get(id)
    return color.to_dict()

# POST a color
@color_routes.route('/', methods=['POST'])
def color_post():
  """
  Creates a new color
  """

  form = ColorForm()

  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    color = Color(
      name=form.data['name'],
    )
    db.session.add(color)
    db.session.commit()
    return server.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit color
@color_routes.route('/edit/<int:id>', methods=['PUT'])
def colors_edit(id):
  color_to_edit = Color.query.get_or_404(id)
  form = ColorForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    color_to_edit.name = form.data['name'],
  try:
    db.session.commit()
    return color_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"
