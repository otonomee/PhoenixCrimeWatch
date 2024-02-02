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
input_csv_file = "data.csv"
output_csv_file = "geocode-data.csv"
df = pd.read_csv(input_csv_file)

# Create new columns for latitude and longitude
df["Latitude"] = None
df["Longitude"] = None

with open(output_csv_file, 'w') as f:
    df.to_csv(f, index=False)  # Write the header

    # Iterate through each row and geocode the address based on "100 BLOCK ADDR" and "ZIP"
    # ...

    # Iterate through each row and geocode the address based on "100 BLOCK ADDR" and "ZIP"
    # ...

    # Iterate through each row and geocode the address based on "100 BLOCK ADDR" and "ZIP"
    # ...

    # Iterate through each row and geocode the address based on "100 BLOCK ADDR" and "ZIP"
    for index, row in df.iterrows():
        block_addr = row["A100_BLOCK_ADDR"].replace("XX", "")  # Remove "XX" from the address
        zip_code = str(int(row["ZIP"]))  # Convert ZIP to integer then to string
        latitude, longitude = geocode_address(block_addr, zip_code)
        print('Geocoding:', block_addr, zip_code, latitude, longitude)

        # Update the DataFrame first
        df.at[index, "Latitude"] = latitude
        df.at[index, "Longitude"] = longitude

        # Add a delay every 100 operations to avoid overloading the geocoding service
        if index % 100 == 0:
            time.sleep(1)

    # Write the entire updated DataFrame to the CSV file
    df.to_csv(output_csv_file, index=False)

    print("Geocoding and CSV writing complete.")
