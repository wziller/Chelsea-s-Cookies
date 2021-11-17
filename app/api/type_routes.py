from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.type_form import TypeForm
from app.models import Type, db



type_routes = Blueprint('types', __name__)

# GET all route
@type_routes.route('/')
def types():
    types = Type.query.all()
    return {"types":[type.to_dict() for type in types]}

# GET by Id route
@type_routes.route('/<int:id>')
def type(id):
    type = Type.query.get(id)
    return type.to_dict()

# POST a type
@type_routes.route('/', methods=['POST'])
def type_post():
  """
  Creates a new type
  """

  form = TypeForm()

  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    type = Type(
      name=form.data['name'],
    )
    db.session.add(type)
    db.session.commit()
    return type.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit type
@type_routes.route('/edit/<int:id>', methods=['PUT'])
def types_edit(id):
  type_to_edit = Type.query.get_or_404(id)
  form = TypeForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    type_to_edit.name = form.data['name'],
  try:
    db.session.commit()
    return type_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"
