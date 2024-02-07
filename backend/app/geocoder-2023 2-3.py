import pandas as pd
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import time

# Function to geocode an address and return its coordinates (latitude and longitude)
def geocode_address(block_addr, zip_code):
    address = f"{block_addr}, {zip_code}"
    geolocator = Nominatim(user_agent="address_geocoder", timeout=10)  # Increase timeout

    try:
        location = geolocator.geocode(address)
        if location:
            return location.latitude, location.longitude
        else:
            return None, None
    except GeocoderTimedOut:
        time.sleep(1)
        return geocode_address(block_addr, zip_code)  # Retry in case of a timeout

# Load the CSV file into a DataFrame
input_csv_file = "crime-2023-2-3.csv"
output_csv_file = "geocode-crime-2023-2-3.csv"
df = pd.read_csv(input_csv_file)

# Create new columns for latitude and longitude
df["Latitude"] = None
df["Longitude"] = None

import csv

# ...

# Open the CSV file for writing
with open(output_csv_file, 'a', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(df.columns.tolist())  # Write the header

    # Iterate through each row and geocode the address based on "100 BLOCK ADDR" and "ZIP"
    for index, row in df.iterrows():
        block_addr = row["100 BLOCK ADDR"].replace("XX", "")  # Remove "XX" from the address
        zip_code = str(int(row["ZIP"]))  # Convert ZIP to integer then to string
        latitude, longitude = geocode_address(block_addr, zip_code)
        print('Geocoding:', block_addr, zip_code, latitude, longitude)

        # Update the DataFrame first
        df.at[index, "Latitude"] = latitude
        df.at[index, "Longitude"] = longitude

        # Write the updated row to the CSV file
        writer.writerow(df.loc[index].tolist())

        # Add a delay every 100 operations to avoid overloading the geocoding service
        if index % 100 == 0:
            time.sleep(1)

print("Geocoding and CSV writing complete.")
