import { useState, useEffect } from "react";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherDescription } from "./components/WeatherDescription";
import { ForecastPeriods } from "./components/ForecastPeriods";
import { WeatherDetails } from "./components/WeatherDetails";
import { SearchBar } from "./components/SearchBar";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  coordinates: { lat: number; lon: number };
  forecast12h: string;
  forecast24h: string;
  aiPrediction?: string;
  aiNewPrediction?: string;
}

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    })
  );

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");
    
    try {
      console.log("📡 Sending request to Python for:", city); 
      
      const response = await fetch(`https://weather-app-loib.onrender.com/api/weather?city=${city}`);      
      const data = await response.json();

      console.log("Data received from Python:", data);

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.error || "City not found");
      }
    } catch (err) {
      setError("Cannot connect to server. Is python 'server.py' running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("London");
  }, []);

  const handleSearch = (searchQuery: string) => {
    fetchWeather(searchQuery);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#dfe7ee' }}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-foreground">Weather Forecast</h1>
        </div>
        
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="text-center">Fetching live weather data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {weatherData && !loading && (
          <>
            <WeatherCard
              temperature={weatherData.temperature}
              condition={weatherData.condition}
              location={weatherData.location}
              date={currentDate}
              high={weatherData.high}
              low={weatherData.low}
            />
            
            {/* AI Prediction Box */}
            {weatherData.aiNewPrediction && (
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                <h3 className="font-bold text-lg mb-2 text-purple-700">AI Prediction.</h3>
                <h5 className="font-bold text-lg mb-2 text-purple-700">Real Weather could vary*.</h5>
                <p className="text-gray-700 italic">"{weatherData.aiNewPrediction}"</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeatherDescription
                condition={weatherData.condition}
                temperature={weatherData.temperature}
                humidity={weatherData.humidity}
                windSpeed={weatherData.windSpeed}
              />
              <WeatherDetails
                humidity={weatherData.humidity}
                windSpeed={weatherData.windSpeed}
                visibility={weatherData.visibility}
                pressure={weatherData.pressure}
                sunrise={weatherData.sunrise}
                sunset={weatherData.sunset}
                coordinates={weatherData.coordinates}
              />
            </div>

            <ForecastPeriods
              realForecast12h={weatherData.forecast12h}
              realForecast24h={weatherData.forecast24h}
            />
          </>
        )}
      </div>
    </div>
  );
}