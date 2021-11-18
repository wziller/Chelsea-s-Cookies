from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.order_form import OrderForm
from app.models import Order, db



order_routes = Blueprint('orders', __name__)

# GET all route
@order_routes.route('/')
def orders():
    orders = Order.query.all()
    return {"orders":[order.to_dict() for order in orders]}

# GET by Id route
@order_routes.route('/<int:id>')
def order(id):
    order = Order.query.get(id)
    return order.to_dict()

# POST a order
@order_routes.route('/order/<int:id>', methods=['POST'])
def order_post(id):
  """
  Creates a new order
  """

  form = OrderForm()

  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    order = Order(
      user_id=form.data['user_id'],
      delivery_date = form.data['delivery_date'],
      delivery_address = form.data['delivery_address'],
      status = form.data['status'],
    )
    db.session.add(order)
    db.session.commit()
    return order.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit order
@order_routes.route('/edit/<int:id>', methods=['PUT'])
def order_edit(id):
  order_to_edit = Order.query.get_or_404(id)
  form = OrderForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    order_to_edit.user_id=form.data['user_id'],
    order_to_edit.delivery_date = form.data['delivery_date'],
    order_to_edit.delivery_address = form.data['delivery_address'],
    order_to_edit.status = form.data['status'],
  try:
    db.session.commit()
    return order_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"

@order_routes.route('/delete/<int:id>', methods=['DELETE'])
def order_delete(id):
  order = Order.query.filter(Order.id == id).first()
  try:
    db.session.delete(order)
    db.session.commit()
    return order.to_dict()
  except:
    return "No Server Found"
