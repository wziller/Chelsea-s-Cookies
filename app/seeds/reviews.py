from app.models import db, Review, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_reviews():

    for _ in range(50):
        fake_user_id = randint(1,100)
        fake_product_id = randint(1,20)
        fake_content = fake.text(randint(100,800))
        fake_rating = randint(1,5)
        new_Review = Review(
            user_id = fake_user_id,
            product_id = fake_product_id,
            content = fake_content,
            rating = fake_rating
            )
        db.session.add(new_Review)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
