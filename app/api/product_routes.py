from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.product_form import ProductForm
from app.config import Config
from app.aws_s3 import *
from app.models import Product, db



product_routes = Blueprint('products', __name__)

# GET all route
@product_routes.route('/')
def products():
    products = Product.query.all()
    return {"products":[product.to_dict() for product in products]}

# GET by Id route
@product_routes.route('/<int:id>')
def product(id):
    product = Product.query.get(id)
    return product.to_dict()

# POST a product
@product_routes.route('/', methods=['POST'])
def product_post():
  """
  Creates a new order
  """

  form = ProductForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  print(form.data)
  if form.validate_on_submit():
    newMenuItem = Product(
      name=form.data['name'],
      description = form.data['description'],
      price = form.data['price'],
      category = form.data['category'],
      image_link= form.data['image_link']
    )
    db.session.add(newMenuItem)
    db.session.commit()
    return newMenuItem.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit product
@product_routes.route('/edit/<int:id>', methods=['PUT'])
def product_edit(id):
  product_to_edit = Product.query.get_or_404(id)
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    product_to_edit.name = form.data['name'],
    product_to_edit.description = form.data['description']
    product_to_edit.price = form.data['price']
  try:
    db.session.commit()
    return product_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"

@product_routes.route('/delete/<int:id>', methods=['DELETE'])
def product_delete(id):
  product = Product.query.filter(Product.id == id).first()
  try:
    db.session.delete(product)
    db.session.commit()
    return product.to_dict()
  except:
    return "No Server Found"
