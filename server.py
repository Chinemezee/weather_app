import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Constants
API_KEY = os.getenv("WEATHER_KEY")
GEMINI_KEY = os.getenv("GEMINI_KEY")
BASE_URL = "http://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast"

def get_ai_prediction(weather_summary):
    if not GEMINI_KEY:
        print("ERROR: GEMINI_KEY is missing in .env file")
        return "AI Setup Error: Missing API Key."
        
    try:
        client = genai.Client(api_key=GEMINI_KEY)
        response = client.models.generate_content(
            model="gemini-2.5-flash", # Updated model name
            contents=[
                f"You are a weather reporter. Give a short, 2-sentence fun outlook for this weather: {weather_summary}"
            ],
            )
        return response.text
    except Exception as e:
        print(f"AI ERROR: {e}")
        return "AI Unavailable (Check terminal for details)"
                        
def new_ai_predict(weather_data):
    client = genai.Client(api_key=GEMINI_KEY)
    ai_response = client.models.generate_content(
        model="gemini-2.5-flash", # Updated model name
        contents=[
                f"You are a weather reporter. Give a short, 2-sentence fun outlook for this weather: {weather_data}"
            ],
    )
    return ai_response.text

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city_name = request.args.get('city')
    if not city_name:
        return jsonify({"error": "City name is required"}), 400

    print(f"Searching for: {city_name}")

    # 1. Fetch Current Weather
    current_url = f"{BASE_URL}?q={city_name}&appid={API_KEY}&units=metric"
    current_resp = requests.get(current_url)

    # 2. Fetch Forecast (To fix the random numbers)
    forecast_url = f"{FORECAST_URL}?q={city_name}&appid={API_KEY}&units=metric"
    forecast_resp = requests.get(forecast_url)

    if current_resp.status_code == 200:
        curr_data = current_resp.json()
         
        # Parse Forecast (Grab data for 12h and 24h from now)
        forecast_text_12h = "Data unavailable"
        forecast_text_24h = "Data unavailable"
        
        if forecast_resp.status_code == 200:
            fore_data = forecast_resp.json()['list']
            # OpenWeather returns data every 3 hours. 
            # Index 4 is approx 12 hours from now (4 * 3 = 12)
            # Index 8 is approx 24 hours from now (8 * 3 = 24)
            if len(fore_data) > 8:
                f12 = fore_data[4]
                f24 = fore_data[8]
                forecast_text_12h = f"Expect {f12['weather'][0]['description']} with temps around {f12['main']['temp']}°C."
                forecast_text_24h = f"Expect {f24['weather'][0]['description']} with temps around {f24['main']['temp']}°C."

        # Prepare Data for Frontend
        weather_desc = curr_data['weather'][0]['description']
        temp = curr_data['main']['temp']
        country = curr_data['sys']['country']
        
        weather_data = {
            "location": f"{curr_data['name']}, {country}",
            "temperature": temp,
            "condition": weather_desc.title(),
            "high": curr_data['main']['temp_max'],
            "low": curr_data['main']['temp_min'],
            "humidity": curr_data['main']['humidity'],
            "windSpeed": curr_data['wind']['speed'],
            "visibility": curr_data.get('visibility', 0) / 1000,
            "pressure": curr_data['main']['pressure'],
            "coordinates": curr_data['coord'],
            "sunrise": datetime.fromtimestamp(curr_data['sys']['sunrise']).strftime('%I:%M %p'),
            "sunset": datetime.fromtimestamp(curr_data['sys']['sunset']).strftime('%I:%M %p'),
            # NEW: Real forecast data sent to frontend
            "forecast12h": forecast_text_12h,
            "forecast24h": forecast_text_24h
        }

        # 3. Get AI Prediction
        print("Asking Gemini...")
        ai_summary = f"City: {curr_data['name']}. Weather: {weather_desc}. Temp: {temp}C."
        weather_data["aiPrediction"] = get_ai_prediction(ai_summary)
        weather_data["aiNewPrediction"] = new_ai_predict(weather_data)


        return jsonify(weather_data)
    
    elif current_resp.status_code == 404:
        return jsonify({"error": "City not found"}), 404
    else:
        return jsonify({"error": "Weather API Error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)