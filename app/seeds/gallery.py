from app.models import db, Review, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint

from app.models.gallery import Gallery_Item

fake = Faker()
images = [
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/206536638_2053051901500364_8262857468825895152_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/217675987_2036216079850613_5461487997110593271_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/218365828_2036881743117380_256092940625370265_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/218365828_2036881743117380_256092940625370265_n.jpg,',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/219579385_2039159302889624_7952353372449309556_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/219774822_2041419922663562_3890274719361436414_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/220220846_2040194012786153_4556174468906406882_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/224484826_2048101928662028_6158224988019278712_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/226864360_2051109665027921_8583150400124734057_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/234770209_2059278387544382_7158670208706235561_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/236107929_2060542557417965_352201259035297376_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/238112796_2062966057175615_6165012753499750592_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/238112796_2062966057175615_6165012753499750592_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/241373360_2103471109791776_2144553514182055636_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/241771801_2081532268652327_5799981579224719346_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/241815890_2082426461896241_6525956805010668243_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/241855578_2085440791594808_8738515770325667026_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/241940988_2086919868113567_6192709118161291503_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/241978547_2083413438464210_4781911301784706855_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/241995702_2083839445088276_324099997390679699_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/242088515_2089289697876584_6943032571489310397_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/242188791_2087805764691644_9010757160978678280_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/242243384_2090848107720743_1411336627777040821_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/242360214_2087805754691645_2059418063316293595_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/242590878_2092467694225451_3610719937009738273_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/242751646_2093919010746986_3476508061957433662_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/243297550_2096445540494333_7758419980560511248_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/244652623_2104737079665179_350514124565671811_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/245565912_2107291692743051_4486321643011462492_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/246436280_2112793772192843_1718012516886756624_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/247322885_2116403805165173_2923533087677769555_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/247630318_2119787458160141_8644903807555619706_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/249516761_2121549141317306_7994543464704952403_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/251017897_2122589477879939_73897315277045328_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/251192899_2124428554362698_3066900173315335709_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/251589005_2120678611404359_6454122087850699133_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/253676435_2125581887580698_2394449318410890837_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/254934104_2127021260770094_784707364616390418_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/256125727_2129493020522918_7451325272481895239_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/256586284_2131181707020716_7630260335543281103_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/257390029_2137414526397434_8604143883601748472_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/259438454_2138626222942931_2977477775469784372_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/260168374_2140279636110923_5894658452207614477_n.jpg',
   'https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/gallery_images/261010455_2142282255910661_4761765507379981381_n.jpg'
]
# Adds a demo user, you can add other users here if you want
def seed_gallery():

    for num in range(43):
        fake_description = fake.text(randint(100,800))
        fake_image = images[num - 1]
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
