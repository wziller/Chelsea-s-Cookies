from app.models import db, Color
from werkzeug.security import generate_password_hash
from faker import Faker
import random

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_colors():
    for _ in range(50):
        new_Color = Color(
            color_name = fake.color_name()
            )
        db.session.add(new_Color)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_colors():
    db.session.execute('TRUNCATE colors RESTART IDENTITY CASCADE;')
    db.session.commit()
