from app.models import db, Review, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint, uniform
from app.models.reference_image import Reference_Image




def seed_reference_images():

    images = [
        "https://modernreston.com/wp-content/uploads/2015/01/prellycookies2.jpg",
        "https://www.oishiiisweets.com/wp-content/uploads/2018/03/IMG_20190925_143328.jpg",
        "https://www.bushascustomcookies.com/wp-content/uploads/2019/04/IMG_3532-e1561168288902.jpg",
        "https://cdn.shopify.com/s/files/1/0334/1729/products/100492_Magic_Mushroom_Custom_Cookies_Custom_Cookies_1024x1024.jpg?v=1556722425",
        "https://www.coriannescustomcookies.com/uploads/1/1/8/0/118018527/p461_orig.png",
        "https://www.hillcitybride.com/wp-content/uploads/2020/08/25-37954-post/Personalized-Wedding-Cookies-Toronto-Canada(pp_w768_h1023).jpeg",
        "https://cdn.meetingstoday.com/sites/default/files/2021-08/Funny%20Face%20Bakery%20Pic_1.jpeg",
        "https://live.staticflickr.com/8344/8171051265_1953434dab_z.jpg",
        "https://parkerscrazycookies.com/blog/wp-content/uploads/2017/11/Zynga-cookies2.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNREbObTdPDhABvOFZLxRo8MHUnYlVBTBsg&usqp=CAU",
        "http://media-cache-ec0.pinimg.com/640x/06/23/e1/0623e11a00e12d6ccf0f88147d4069c6.jpg",
        "https://www.playideas.com/wp-content/uploads/2016/07/milk-cookies-1.jpg",
        "https://cdn.meetingstoday.com/sites/default/files/inline-images/Funny%20Face%20Bakery%20Pic_2.jpg.png",
        "https://i.pinimg.com/736x/2c/a1/19/2ca1196a4660dca8394671496a10f007.jpg",
        "https://images-gmi-pmc.edge-generalmills.com/a8029888-f414-48f4-82ab-de498912546a.jpg",
        "https://handletheheat.com/wp-content/uploads/2014/08/Cosmic-Brownies.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcvA3r4s0VbCAZSgGK2kDI-nHIysMwtwjRlw&usqp=CAU",
        "https://www.persnicketyplates.com/wp-content/uploads/2016/09/halloween-cream-cheese-swirl-brownies5.jpg",
        "https://img.buzzfeed.com/buzzfeed-static/static/enhanced/webdr04/2012/10/30/19/enhanced-buzz-12803-1351640164-10.jpg?output-quality=auto&output-format=auto&downsize=640:*",
        "https://cdn.shopify.com/s/files/1/1831/6807/products/C3FF010D-14F5-4160-8036-79EA5CFA4AD0_600x.jpg?v=1636077268",
        "https://noshingwiththenolands.com/wp-content/uploads/2021/04/cookie-monster-cupcakes-IMG_5716-720x540.jpg",
        "https://i.pinimg.com/originals/ca/a1/53/caa153a2be95329174d4df6a9cdb9e2c.jpg",
        "https://lh3.googleusercontent.com/proxy/Ki6Lax8rvzzY5GYLoCK3rHEfBZ6_pr34UbMSKlsTVcuXIVrXh917lyhWOPFOfzyBD-yoxe14q49qkmludRYYOwQiraGX3WGLQ9xJ8io4qSynq0ohurgqI-zi-ds",
        "https://images.squarespace-cdn.com/content/v1/5a286f29aeb625cdb4267bfe/1625157090828-XC55W4CJJ0S7EECM3ZKO/IMG_1385.JPG?format=500w",
        "https://images.getbento.com/accounts/fdf452a6018cdec4834eba7feebafee3/media/images/17738IMG_1880.jpg?w=1800&fit=max&auto=compress,format&h=1800",
    ]

    for num in range(50):

        fake_order_id = randint(1,50)

        new_Reference_Image = Reference_Image(
            custom_order_id = fake_order_id,
            image_link = images[randint(0,24)],
            )
        db.session.add(new_Reference_Image)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reference_images():
    db.session.execute('TRUNCATE reference_images RESTART IDENTITY CASCADE;')
    db.session.commit()
