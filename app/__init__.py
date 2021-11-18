import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User, Order, Product, Order_Detail, Review, Gallery_Item, Category, Custom_Order, Custom_Option, Color, Type
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.color_routes import color_routes
from .api.type_routes import type_routes
from .api.review_routes import review_routes
from .api.product_routes import product_routes
from .api.category_routes import category_routes
from .api.gallery_routes import gallery_routes
from .api.order_routes import order_routes
from .api.custom_order_routes import custom_order_routes
from .api.custom_options import custom_options_routes
from .api.order_detail_routes import order_details_routes

from .seeds import seed_commands

from .config import Config





app = Flask(__name__)



# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(color_routes, url_prefix='/api/colors')
app.register_blueprint(type_routes, url_prefix='/api/types')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(product_routes, url_prefix='/api/products')
app.register_blueprint(category_routes, url_prefix='/api/categories')
app.register_blueprint(gallery_routes, url_prefix='/api/gallery')
app.register_blueprint(order_routes, url_prefix='/api/orders')
app.register_blueprint(custom_order_routes, url_prefix='/api/custom_orders')
app.register_blueprint(custom_options_routes, url_prefix='/api/custom_options')
app.register_blueprint(order_details_routes, url_prefix='/api/order_details')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
