from app.models import db, Review, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint, uniform
from app.models.custom_option import Custom_Option

fake = Faker()

images = [
        "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/191:100/w_1280,c_limit/google-logo.jpg",
        "https://bestlifeonline.com/wp-content/uploads/sites/3/2018/09/tostitos.jpg?quality=82&strip=1&resize=640%2C360",
        "https://creativereview.imgix.net/content/uploads/2020/11/colonel.jpg?auto=compress,format&q=60&w=818&h=797",
        "https://1000logos.net/wp-content/uploads/2017/03/LG-logo.png",
        "https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo.png",
        "http://cdn.cnn.com/cnnnext/dam/assets/180301124611-fedex-logo.png",
        "https://influencermarketinghub.com/wp-content/uploads/2021/01/starbucks-logo.png",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/10/900px-Olympic_flag.svg-e1506637318644.png?auto=format&q=60&fit=max&w=930",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ERqUqrJNGal6_2Ij6QUR17Lg6uV0v0KO1Q&usqp=CAU",
        "https://1000logos.net/wp-content/uploads/2017/03/Linkedin-logo.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9_9jgMO3RSE6z9PUYoVJLgdYSxPwe9NwpbA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX-cbTZ2Sp7WWwVMYkbmJEGuBdHx4-WO9eZg&usqp=CAU",
        "https://static.stacker.com/s3fs-public/styles/slide_desktop/s3/goodwill1png.PNG",
        "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/08/fiverr-logo-1.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3DB74U9pSgmrE0J8G0xUPqcGt8qasobmZw&usqp=CAU",
        "https://dynamic.brandcrowd.com/asset/logo/c34556a9-76c4-4592-a583-fafc938d9394/logo-search-grid-desktop?v=637638114212200000",
        "https://venngage-wordpress.s3.amazonaws.com/uploads/2021/08/Wellness-Spa-Creative-Logo.png",
        "https://www.logodesign.net/images/nature-logo.png",
        "https://lh3.googleusercontent.com/6n8UeRbQwQV1TPp1WgpWjciVkO0um_oDNSbnAqvYRCDAebCfv22RkgwPxkwRkV6aNHi98r9gyFsfOT2pbCMCeXBbIp-5vOqSrOnhbw",
        "https://dynamic.brandcrowd.com/asset/logo/b90a2e35-dbbf-44d6-9e91-0f424d831748/logo-search-grid-desktop?v=637690761941670000"
    ]



def fake_colors_array_generator(input):
    if input == False:
        basic_res = []
        num_of_colors = randint(1,3)
        for _ in range(num_of_colors):
            color_id = randint(1, 50)
            basic_res.append(color_id)
        return basic_res
    if input == True:
        res = []
        num_of_colors = randint(6,10)
        for _ in range(num_of_colors):
            color_id = randint(1, 50)
            res.append(color_id)
        return res

def fake_boolean_generator():
        num = randint(1,2)
        if num == 1: return True
        if num == 2: return False

def fake_logo_image_generator(input):
    if input == True: return images[randint(0,19)]
    if input == False: return "None"

# Adds a demo user, you can add other users here if you want
def seed_custom_options():

    for num in range(50):

        fake_type_id = randint(1,16)
        fake_logo = fake_boolean_generator()
        fake_more_colors = fake_boolean_generator()
        fake_logo_image = fake_logo_image_generator(fake_logo)

        new_Custom_Options = Custom_Option(
            type_id = fake_type_id,
            more_colors = fake_more_colors,
            gold = fake_boolean_generator(),
            silver = fake_boolean_generator(),
            logo = fake_logo,
            custom_shape = fake_boolean_generator(),
            air_brushing = fake_boolean_generator(),
            flowers = fake_boolean_generator(),
            logo_image = fake_logo_image,
            colors = fake_colors_array_generator(fake_more_colors)
            )
        db.session.add(new_Custom_Options)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_custom_options():
    db.session.execute('TRUNCATE custom_options RESTART IDENTITY CASCADE;')
    db.session.commit()
