import requests
import json
while True:
    api_key = "a22baab7f62ce183dab3a1b050ea3bf8"
    base_url = "http://api.openweathermap.org/data/2.5/weather"

    city_name = input("City name: ")

    request_url = f"{base_url}?q={city_name}&appid={api_key}&units=metric"

    response = requests.get(request_url)

    if response.status_code == 200:
     data = response.json()

     coordinates = data['coord']
     weather = data['weather'][0]['description']
     temperature = data['main']['temp']
     humidity = data['main']['humidity']

     print(f'The city is {city_name.upper()}')
     print(f'The weather is {weather}')
     print(f'The temperature is {temperature}C')
     print(f'The humidity is {humidity}')
     print(f'These are the coordinates of the city: {coordinates}')


    elif response.status_code == 404:
     print("City name does not exist")

    else:
     print("error")
    continue