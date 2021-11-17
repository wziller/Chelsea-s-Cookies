from app.models import db, User
from werkzeug.security import generate_password_hash
from faker import Faker
import random

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    for _ in range(100):
        new_User = User(
            firstName = fake.first_name(),
            lastName = fake.last_name(),
            username = fake.user_name(),
            email = fake.free_email(),
            password='password',
            phone = fake.phone_number()[0:9],
            orders = [],
            reviews = [],
            administrator = False,
            )
        db.session.add(new_User)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
