from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.category_form import CategoryForm
from app.models import Category, db



category_routes = Blueprint('categories', __name__)

# GET all route
@category_routes.route('/')
def categories():
    categories = Category.query.all()
    return {"categories":[category.to_dict() for category in categories]}

# GET by Id route
@category_routes.route('/<int:id>')
def category(id):
    category = Category.query.get(id)
    return category.to_dict()

# POST a category
@category_routes.route('/', methods=['POST'])
def category_post():
  """
  Creates a new category
  """

  form = CategoryForm()

  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    category = Category(
      category_name=form.data['category_name'],
    )
    db.session.add(category)
    db.session.commit()
    return category.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit category
@category_routes.route('/edit/<int:id>', methods=['PUT'])
def categories_edit(id):
  category_to_edit = Category.query.get_or_404(id)
  form = CategoryForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    category_to_edit.category_name = form.data['category_name'],
  try:
    db.session.commit()
    return category_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"
