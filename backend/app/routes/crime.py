from flask import jsonify
from app import app, db
import csv
from app.models.crime import Crime
import requests
from datetime import datetime, timedelta  # import datetime and timedelta
from flask import jsonify, request
from app import app
from app.models.crime import Crime

@app.route('/fetch-data')
def fetch_data():
    api_url = "https://www.phoenixopendata.com/api/3/action/datastore_search?resource_id=0ce3411a-2fc6-4302-a33f-167f68608a20"
    response = requests.get(api_url)
    data = response.json()

    records = data['result']['records']

    for record in records:
        crime = Crime(_id=record['_id'], inc_number=record['INC NUMBER'], occurred_on=record['OCCURRED ON'],
                      occurred_to=record['OCCURRED TO'], ucr_crime_category=record['UCR CRIME CATEGORY'],
                      block_addr=record['100 BLOCK ADDR'], zip=record['ZIP'], premise_type=record['PREMISE TYPE'],
                      grid=record['GRID'])
        db.session.add(crime)

    db.session.commit()
    return jsonify({'message': 'Data fetched and stored successfully'})


@app.route('/crimes')
def get_crimes():
    year = request.args.get('year', default=2023, type=int)  # Get the year query parameter
    crimes = Crime.query.all()  # Get all crimes

    # Filter crimes by year
    crimes = [crime for crime in crimes if crime.occurred_on and datetime.strptime(crime.occurred_on, "%m/%d/%Y %H:%M").year == year]

    return jsonify([{
        '_id': crime._id,
        'inc_number': crime.inc_number,
        'occurred_on': crime.occurred_on,
        'ucr_crime_category': crime.ucr_crime_category,
        'block_addr': crime.block_addr,
        'zip': crime.zip,
        'premise_type': crime.premise_type,
        'grid': crime.grid,
        'latitude': crime.latitude,
        'longitude': crime.longitude
    } for crime in crimes])
    
@app.route('/import-data')
def import_data():
    with open('data.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            crime = Crime(_id=row['\ufeff_id'], inc_number=row['INC NUMBER'], occurred_on=row['OCCURRED ON'],
                          occurred_to=row['OCCURRED TO'], ucr_crime_category=row['UCR CRIME CATEGORY'],
                          block_addr=row['100 BLOCK ADDR'], zip=row['ZIP'], premise_type=row['PREMISE TYPE'],
                          grid=row['GRID'])
            db.session.add(crime)

    db.session.commit()
    return jsonify({'message': 'Data imported and stored successfully'})
