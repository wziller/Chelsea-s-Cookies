from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.order_details_form import OrderDetailsForm
from app.models import Order_Detail, db



order_details_routes = Blueprint('order_details', __name__)

# GET all route
@order_details_routes.route('/')
def order_details():
    order_details = Order_Detail.query.all()
    return {"order_details":[order.to_dict() for order in order_details]}

# GET by Id route
@order_details_routes.route('/<int:id>')
def order_detail(id):
    order_detail = Order_Detail.query.get(id)
    return order_detail.to_dict()

# POST a order
@order_details_routes.route('/', methods=['POST'])
def custom_options_post():

  """
  Creates a new custom order
  """

  form = OrderDetailsForm()
  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    order_details = Order_Detail(
        order_id = form.data['order_id'],
        product_id = form.data['product_id'],
        quantity = form.data['quantity']
    )
    db.session.add(order_details)
    db.session.commit()
    return order_details.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit options
@order_details_routes.route('/edit/<int:id>', methods=['PUT'])
def custom_options_edit(id):
  order_details_to_edit = Order_Detail.query.get_or_404(id)
  form = OrderDetailsForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    order_details_to_edit.quantity = form.data['quantity']
  try:
    db.session.commit()
    return order_details_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"

@order_details_routes.route('/delete/<int:id>', methods=['DELETE'])
def options_delete(id):
  order_details = Order_Detail.query.filter(Order_Detail.id == id).first()
  print('hit ================================>')
  try:
    db.session.delete(order_details)
    db.session.commit()
    return order_details.to_dict()
  except:
    return "No Server Found"
