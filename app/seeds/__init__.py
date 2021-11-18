from flask.cli import AppGroup
from app.seeds.custom_option import seed_custom_options
from app.seeds.custom_order import seed_custom_orders, undo_custom_orders

from app.seeds.orders import undo_orders
from .users import seed_users, undo_users
from .colors import seed_colors, undo_colors
from .types import seed_types, undo_types
from .categories import seed_categories, undo_categories
from .reviews import seed_reviews, undo_reviews
from .products import seed_products, undo_products
from .gallery import seed_gallery, undo_gallery
from .orders import seed_orders, undo_orders
from .order_detail import seed_order_details, undo_orders_details
from .custom_option import seed_custom_options, undo_custom_options
from .custom_order import seed_custom_orders, undo_custom_orders
from .reference_images import seed_reference_images, undo_reference_images
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_colors()
    seed_types()
    seed_categories()
    seed_products()
    seed_reviews()
    seed_gallery()
    seed_orders()
    seed_order_details()
    seed_custom_orders()
    seed_custom_options()
    seed_reference_images()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_colors()
    undo_types()
    undo_categories()
    undo_products()
    undo_reviews()
    undo_gallery()
    undo_orders()
    undo_orders_details()
    undo_custom_orders()
    undo_custom_options()
    undo_reference_images()

    # Add other undo functions here
