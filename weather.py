import requests
import json
import csv

#create and append csv file with temperature info
open_csv = open("weather.csv", "a", newline="")
writer = csv.writer(open_csv)
#header
writer.writerow(["CITY", "WEATHER", "TEMPERATURE"])

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
        print(f'The city is {city.upper()}, {country}')
        print(f'The weather is {weather}')
        print(f'The temperature is {temperature}C')
        print(f'The humidity is {humidity}')
        #print(f'These are the coordinates of the city: {coordinates}')
        #print(data)
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
        print(f'The city is {city_name.upper()}, {country}')
        print(f'The weather is {weather}')
        print(f'The temperature is {temperature}C')
        print(f'The humidity is {humidity}')
        #print(f'These are the coordinates of the city: {coordinates}')
        #print(data)
        print("\n")

        if response.status_code == 404:
            print("City name does not exist")

        # adds data to csv file
        writer.writerow([city_name, weather, temperature])


while True:
    #api access
    api_key = ""
    base_url = "http://api.openweathermap.org/data/2.5/weather"

    cities = ["London", "Paris", "Madrid", "Berlin"]

    #loop to get "generic cities" weather data
    for city in cities:
        generic_city()

    #get user "specific cities" weather data
    while True:
        city_name = input("City name: ")
        user_city()
        #more cities?
        another_city_request = input("another city? Y/N \n> ")
        if another_city_request.lower() == "y":
            continue
        else:
            print("you exited g")
            break
    break
open_csv.close()

