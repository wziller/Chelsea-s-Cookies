from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.custom_order_form import CustomOrderForm
from app.models import Custom_Order, db



custom_order_routes = Blueprint('custom_orders', __name__)

# GET all route
@custom_order_routes.route('/')
def custom_orders():
    custom_orders = Custom_Order.query.all()
    return {"custom_orders":[order.to_dict() for order in custom_orders]}

# GET by Id route
@custom_order_routes.route('/<int:id>')
def cusom_order(id):
    cusom_order = Custom_Order.query.get(id)
    return cusom_order.to_dict()

# POST a order
@custom_order_routes.route('/order/<int:id>', methods=['POST'])
def custom_order_post(id):
  """
  Creates a new custom order
  """

  form = CustomOrderForm()

  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    custom_order = Custom_Order(
      user_id=form.data['user_id'],
      description = form.data['description'],
      delivery_date = form.data['delivery_date'],
      delivery_address = form.data['delivery_address'],
      status = form.data['status'],
    )
    db.session.add(custom_order)
    db.session.commit()
    return custom_order.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit order
@custom_order_routes.route('/edit/<int:id>', methods=['PUT'])
def custom_order_edit(id):
  custom_order_to_edit = Custom_Order.query.get_or_404(id)
  form = CustomOrderForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    custom_order_to_edit.user_id=form.data['user_id'],
    custom_order_to_edit.delivery_date = form.data['delivery_date'],
    custom_order_to_edit.delivery_address = form.data['delivery_address'],
    custom_order_to_edit.status = form.data['status'],
  try:
    db.session.commit()
    return custom_order_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"

@custom_order_routes.route('/delete/<int:id>', methods=['DELETE'])
def order_delete(id):
  custom_order = Custom_Order.query.filter(Custom_Order.id == id).first()
  try:
    db.session.delete(custom_order)
    db.session.commit()
    return custom_order.to_dict()
  except:
    return "No Server Found"
