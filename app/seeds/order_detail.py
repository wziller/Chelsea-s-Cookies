from app.models import db, Review, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint, uniform
from app.models.order_detail import Order_Detail

from app.models.order_detail import Order_Detail

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_order_details():

    for num in range(100):

        fake_product_id = randint(1,50)
        fake_quantity = randint(1,10)
        new_Product = Order_Detail(
            order_id = num + 1,
            product_id = fake_product_id,
            quantity = fake_quantity
            )
        db.session.add(new_Product)

    for _ in range(100):
        fake_product_id = randint(1,50)
        fake_quantity = randint(1,10)
        fake_order_id = randint(1,50)
        new_Product = Order_Detail(
            order_id = fake_order_id,
            product_id = fake_product_id,
            quantity = fake_quantity
            )
        db.session.add(new_Product)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_orders_details():
    db.session.execute('TRUNCATE order_details RESTART IDENTITY CASCADE;')
    db.session.commit()
