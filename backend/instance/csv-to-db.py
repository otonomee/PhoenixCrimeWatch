import csv
import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('site.db')
cur = conn.cursor()

# Create the table if it doesn't exist
# Create the table if it doesn't exist
cur.execute('''
    CREATE TABLE IF NOT EXISTS crimes(
        _id INTEGER PRIMARY KEY,
        INC_NUMBER TEXT,
        OCCURRED_ON TEXT,
        OCCURRED_TO TEXT,
        UCR_CRIME_CATEGORY TEXT,
        BLOCK_ADDR TEXT,
        ZIP TEXT,
        PREMISE_TYPE TEXT,
        GRID TEXT,
        LATITUDE REAL,
        LONGITUDE REAL
    )
''')

# Open the CSV file and insert each row into the database
# Open the CSV file and insert each row into the database
with open('data.csv', 'r') as f:
    reader = csv.DictReader(f)
    # Replace spaces in column names with underscores
    reader.fieldnames = [name.replace(' ', '_') for name in reader.fieldnames]
    for row in reader:
        cur.execute('''
            INSERT INTO crimes(_id, INC_NUMBER, OCCURRED_ON, OCCURRED_TO, UCR_CRIME_CATEGORY, BLOCK_ADDR, ZIP, PREMISE_TYPE, GRID) 
            VALUES(:\ufeff_id, :INC_NUMBER, :OCCURRED_ON, :OCCURRED_TO, :UCR_CRIME_CATEGORY, :BLOCK_ADDR, :ZIP, :PREMISE_TYPE, :GRID)
        ''', row)

# Commit the changes and close the connection
conn.commit()
conn.close()