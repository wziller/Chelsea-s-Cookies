from app.models import db, Review, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint

from app.models.gallery import Gallery_Item

fake = Faker()
images = [
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-vanilla-cupcake.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-sandwich-cookies-red-velvet.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-sandwich-cookies-carrot-cake.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-monster-cookie-1.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-sugar.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-shortbread.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-red-velvet.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-poppyseed-thumbprint.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-peanut-butter.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-oatmeal-raisin.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-mexican-wedding.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-double-chocolate-pecan.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-coconut-macaroon.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-chocolate-mexican-wedding.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-chocolate-coconut-macaroon.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-homestyle-almond-toffee-crunch.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-giant-white-chocolate-macadamia.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-giant-smores.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-giant-molassas.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-giant-mm.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-giant-gf-snickerdoodle.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-cookie-cc.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-chocolate-cupcake.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-bars-snickers-brownie.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-bars-snickerdoodle-blondie.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-bars-raspberry-crumble.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-bars-pecan-pie.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-bars-lemon.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-bars-hello-dolly.png",
    "https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/menu-bars-brownies.png"
]
# Adds a demo user, you can add other users here if you want
def seed_gallery():

    for _ in range(50):
        fake_description = fake.text(randint(100,800))
        fake_image = images[randint(0,28)]
        fake_product_id = randint(1,50)
        new_gallery_item = Gallery_Item(
            product_id = fake_product_id,
            image = fake_image,
            description = fake_description
            )
        db.session.add(new_gallery_item)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_gallery():
    db.session.execute('TRUNCATE gallery RESTART IDENTITY CASCADE;')
    db.session.commit()
