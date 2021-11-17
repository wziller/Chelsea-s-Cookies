from app.models import db, Type


# Adds a demo user, you can add other users here if you want
def seed_types():
    cookie_types = [
        'Black And White',
        'Chocolate Chip',
        'Fried Cookie',
        'Gingerbread',
        'Gingersnap',
        'Macaroons',
        'Molasses',
        'Oatmeal',
        'Peanut Butter',
        'Oreo',
        'Shortbread',
        'Snickerdoodle',
        'Sugar',
        'Biscotti',
        'Rum ball',
        'Stroopwafel'
        ]
    for type in cookie_types:
        new_Type = Type(
            type_name = type
            )
        db.session.add(new_Type)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_types():
    db.session.execute('TRUNCATE product_types RESTART IDENTITY CASCADE;')
    db.session.commit()
