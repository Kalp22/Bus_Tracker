from geopy.geocoders import Nominatim
import time

def get_current_location():
    geolocator = Nominatim(user_agent="geoapiExercises")
    location = geolocator.geocode("Your current location")
    if location:
        print("Latitude: {}, Longitude: {}".format(location.latitude, location.longitude))
    else:
        print("Unable to retrieve current location")

def main():
    while True:
        get_current_location()
        time.sleep(60)  # Sleep for 60 seconds (1 minute)

if __name__ == "__main__":
    main()
