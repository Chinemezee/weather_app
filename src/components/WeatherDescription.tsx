import { Card } from "./ui/card";
import { Shirt, Umbrella, AlertCircle } from "lucide-react";

interface WeatherDescriptionProps {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export function WeatherDescription({ condition, temperature, humidity, windSpeed }: WeatherDescriptionProps) {
  const getDescription = () => {
    const lower = condition.toLowerCase();
    if (lower.includes("rain")) {
      return "Rainy conditions expected. The sky is overcast with precipitation throughout the day. Visibility may be reduced and roads could be slippery.";
    }
    if (lower.includes("cloud")) {
      return "Cloudy skies with limited sunshine. Temperatures will remain moderate with a comfortable atmosphere. No precipitation expected.";
    }
    if (lower.includes("snow")) {
      return "Snowy conditions ahead. Winter weather is in effect with accumulation possible. Travel may be affected and surfaces will be slippery.";
    }
    if (lower.includes("sunny") || lower.includes("clear")) {
      return "Clear skies and abundant sunshine. Perfect weather for outdoor activities. Expect pleasant conditions throughout the day.";
    }
    return "Mixed weather conditions. The day will see varying cloud cover with generally stable conditions. Stay updated on any changes.";
  };

  const getWhatToWear = () => {
    if (temperature < 5) {
      return "Heavy winter coat, scarf, gloves, and warm layers. Thermal clothing recommended.";
    }
    if (temperature < 15) {
      return "Light jacket or sweater. Long sleeves recommended with an extra layer for evening.";
    }
    if (temperature < 25) {
      return "Light clothing with a thin layer. Comfortable for most outdoor activities.";
    }
    return "Light summer clothing. Shorts and t-shirts are ideal. Don't forget sunscreen.";
  };

  const getWhatToExpect = () => {
    const expectations = [];
    
    if (condition.toLowerCase().includes("rain")) {
      expectations.push("Bring an umbrella or raincoat");
    }
    
    if (windSpeed > 25) {
      expectations.push("Strong winds - secure loose items");
    }
    
    if (humidity > 80) {
      expectations.push("High humidity - may feel warmer than actual temperature");
    }
    
    if (temperature > 28) {
      expectations.push("Stay hydrated and seek shade during peak hours");
    }
    
    if (temperature < 5) {
      expectations.push("Watch for icy conditions");
    }
    
    if (expectations.length === 0) {
      expectations.push("Great day for outdoor activities");
    }
    
    return expectations;
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Weather Overview</h3>
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground leading-relaxed">{getDescription()}</p>
        </div>

        <div className="flex items-start gap-3">
          <Shirt className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground">What to Wear</p>
            <p>{getWhatToWear()}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground">What to Expect</p>
            <ul className="space-y-1">
              {getWhatToExpect().map((expectation, index) => (
                <li key={index}>• {expectation}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
