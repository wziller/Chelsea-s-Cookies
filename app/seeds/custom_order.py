from app.models import db, Review, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint, uniform
from app.models.custom_order import Custom_Order

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_custom_orders():
    statuses = ['requested', 'accepted', 'complete', 'delivered']

    for _ in range(50):

        fake_user_id = randint(1,50)
        fake_status = statuses[randint(0,2)]
        fake_description = fake.text(randint(100,800))
        fake_delivery_date = fake.date_time_this_year(before_now=False, after_now=True, tzinfo=None)
        fake_delivery_address = fake.address()

        new_Custom_Order = Custom_Order(
            user_id = fake_user_id,
            description = fake_description,
            delivery_date = fake_delivery_date,
            delivery_address = fake_delivery_address,
            status = fake_status
            )
        db.session.add(new_Custom_Order)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_custom_orders():
    db.session.execute('TRUNCATE custom_orders RESTART IDENTITY CASCADE;')
    db.session.commit()
