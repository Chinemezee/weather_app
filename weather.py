import requests
import json
import csv
from dotenv import load_dotenv
from google import genai
import os

#create and append csv file with temperature info
open_csv = open("weather.csv", "a", newline="")
writer = csv.writer(open_csv)
#header
writer.writerow(["CITY", "WEATHER", "TEMPERATURE"])

load_dotenv()

#code for the generic cities
def generic_city():
    #request url for each city with api key
    request_url = f"{base_url}?q={city}&appid={api_key}&units=metric"
    #http get request in response
    response = requests.get(request_url)
    #shows if request is successful
    if response.status_code == 200:
        #to parse if its json
        data = response.json()
        #store weather data from dicts and lists in variables to be called
        coordinates = data['coord']
        coordinates = data['coord']
        weather = data['weather'][0]['description']
        temperature = data['main']['temp']
        humidity = data['main']['humidity']
        country = data['sys']['country']

        #output city data called
        generic_weather_info = f"""
        The city is {city.upper()}, {country}
        The weather is {weather}
        The temperature is {temperature}C
        The humidity is {humidity}
        These are the coordinates of the city: {coordinates}
        """
        print(generic_weather_info)
        global generic_prompt
        generic_prompt = f"predict the weather of the cities from {generic_weather_info}"
        print("\n")

        if response.status_code == 404:
            print("City name does not exist")

        #adds data to csv file
        writer.writerow([city, weather, temperature])


#code for the user input cities
def user_city():
    #request url for each city with api key
    request_url = f"{base_url}?q={city_name}&appid={api_key}&units=metric"
    #http get request in response
    response = requests.get(request_url)
    #shows if request is successful
    if response.status_code == 200:
        #to parse if its json
        data = response.json()
        #store weather data from dicts and lists in variable to be called
        coordinates = data['coord']
        weather = data['weather'][0]['description']
        temperature = data['main']['temp']
        humidity = data['main']['humidity']
        country = data['sys']['country']

        # output city data called
        user_weather_info = f"""
        The city is {city_name.upper()}, {country}
        The weather is {weather}
        The temperature is {temperature}C
        The humidity is {humidity}
        These are the coordinates of the city: {coordinates}
        """
        print(user_weather_info)
        global user_prompt
        user_prompt = f"predict the weather of the cities from {user_weather_info}"
        print("\n")

        if response.status_code == 404:
            print("City name does not exist")

        # adds data to csv file
        writer.writerow([city_name, weather, temperature])

def genericAI():
    client = genai.Client(api_key = os.getenv("GEMINI_KEY"))

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents= generic_prompt
    )
    print(response.text)

def userAI():
    client = genai.Client(api_key = os.getenv("GEMINI_KEY"))

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents= user_prompt
    )
    print(response.text)


while True:
    #api access
    api_key = os.getenv("WEATHER_KEY")
    base_url = "http://api.openweathermap.org/data/2.5/weather"

    cities = ["London", "Paris", "Madrid", "Berlin"]

    #loop to get "generic cities" weather data
    for city in cities:
        generic_city()
        genericAI()

    #get user "specific cities" weather data
    while True:
        city_name = input("City name: ")
        user_city()
        userAI()
        #more cities?
        another_city_request = input("another city? Y/N \n> ")
        if another_city_request.lower() == "y":
            continue
        else:
            print("you exited g")
            break


    break
open_csv.close()

