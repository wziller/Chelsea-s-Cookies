from flask import Blueprint, jsonify, Flask, redirect, request
from flask_login import login_required, current_user
from app.forms.gallery_item_form import GalleryItemForm
from app.models import Gallery_Item, db



gallery_routes = Blueprint('gallery_items', __name__)

# GET all route
@gallery_routes.route('/')
def servers():
    gallery_items = Gallery_Item.query.all()
    return {"gallery_items":[item.to_dict() for item in gallery_items]}

# GET by Id route
@gallery_routes.route('/<int:id>')
def gallery_item(id):
    gallery_item = Gallery_Item.query.get(id)
    return gallery_item.to_dict()

# POST a gallery_item
@gallery_routes.route('/', methods=['POST'])
def gallery_item_post():
  """
  Creates a new gallery_item
  """

  form = GalleryItemForm()

  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    gallery_item = Gallery_Item(
      name=form.data['name'],
    )
    db.session.add(gallery_item)
    db.session.commit()
    return gallery_item.to_dict()
  else:
    print(form.errors)
    return "Bad data"

# PUT edit gallery_item
@gallery_routes.route('/edit/<int:id>', methods=['PUT'])
def gallery_item_edit(id):
  gallery_item_to_edit = Gallery_Item.query.get_or_404(id)
  form = GalleryItemForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    gallery_item_to_edit.name = form.data['name'],
  try:
    db.session.commit()
    return gallery_item_to_edit.to_dict()
  except:
    print(form.errors)
    return "Bad data"
