from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.review_form import ReviewForm
from app.models import Review, db



review_routes = Blueprint('reviews', __name__)

# GET all route
@review_routes.route('/')
def reviews():
    reviews = Review.query.all()
    return {"reviews":[review.to_dict() for review in reviews]}

# GET by Id route
@review_routes.route('/<int:id>')
def review(id):
    review = Review.query.get(id)
    return review.to_dict()

# POST a review
@review_routes.route('/', methods=['POST'])

def review_post():
  """
  Creates a new review
  """

  form = ReviewForm()

  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    print(form.data)
    review = Review(
      user_id=form.data['user_id'],
      product_id = form.data['product_id'],
      content = form.data['content'],
      rating = form.data['rating'],
    )
    db.session.add(review)
    db.session.commit()
    return review.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit review
@review_routes.route('/edit/<int:id>', methods=['PUT'])
def reviews_edit(id):
  review_to_edit = Review.query.get_or_404(id)
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    review_to_edit.content = form.data['content'],
    review_to_edit.rating = form.data['rating']

  try:
    db.session.commit()
    return review_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"

@review_routes.route('/delete/<int:id>', methods=['DELETE'])
def review_delete(id):
  review = Review.query.get_or_404(id)
  try:
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()
  except:
    return "No Server Found"
