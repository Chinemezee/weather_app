import { Cloud, CloudRain, Sun, CloudSnow, CloudDrizzle, Wind } from "lucide-react";
import { Card } from "./ui/card";

interface WeatherCardProps {
  temperature: number;
  condition: string;
  location: string;
  date: string;
  high: number;
  low: number;
}

export function WeatherCard({ temperature, condition, location, date, high, low }: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes("rain")) return <CloudRain className="w-24 h-24" />;
    if (lower.includes("cloud")) return <Cloud className="w-24 h-24" />;
    if (lower.includes("snow")) return <CloudSnow className="w-24 h-24" />;
    if (lower.includes("drizzle")) return <CloudDrizzle className="w-24 h-24" />;
    if (lower.includes("wind")) return <Wind className="w-24 h-24" />;
    return <Sun className="w-24 h-24" />;
  };

  return (
    <Card className="p-8 text-white border-0" style={{ background: 'linear-gradient(to bottom right, #2ECC71, #27AE60)' }}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-white">{location}</h2>
          <p className="opacity-90" style={{ color: '#E8F8F5' }}>{date}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-4">
            <div className="flex items-baseline">
              <span className="text-6xl text-white">{Math.round(temperature)}</span>
              <span className="text-4xl text-white ml-2">°C</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-6xl text-white">{Math.round(temperature * 9/5 + 32)}</span>
              <span className="text-4xl text-white ml-2">°F</span>
            </div>
          </div>
          <p className="mt-2" style={{ color: '#E8F8F5' }}>{condition}</p>
          <p className="mt-1" style={{ color: '#E8F8F5' }}>H:{Math.round(high)}° L:{Math.round(low)}°</p>
        </div>
        <div style={{ color: '#E8F8F5' }}>
          {getWeatherIcon(condition)}
        </div>
      </div>
    </Card>
  );
}
