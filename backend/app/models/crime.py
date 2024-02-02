from app import db

class Crime(db.Model):
    __tablename__ = 'crimes'  # specify the table name
    _id = db.Column(db.Integer, primary_key=True)
    inc_number = db.Column(db.String(20))
    occurred_on = db.Column(db.String(50))
    occurred_to = db.Column(db.String(50))
    ucr_crime_category = db.Column(db.String(50))
    block_addr = db.Column(db.String(100))
    zip = db.Column(db.String(10))
    premise_type = db.Column(db.String(50))
    grid = db.Column(db.String(10))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def __repr__(self):
        return f'<Crime {_id}>'