from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():
    good_categories = [
        'Cake',
        'Cookie Cake',
        'Brownie',
        'Cinnamon Roll',
        'Doughnut',
        'Biscuit',
        'Bagel',
        'Bread',
        'Cookie',
        'Macaron',
        'Vegan Cake',
        'Vegan Cookie',
        'Cupcakes',
        'Muffins',
        'Cheesecake',
        ]
    for category in good_categories:
        new_Category = Category(
            category_name = category
            )
        db.session.add(new_Category)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE product_categories RESTART IDENTITY CASCADE;')
    db.session.commit()
