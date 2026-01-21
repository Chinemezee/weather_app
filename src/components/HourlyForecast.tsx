import { Card } from "./ui/card";
import { Cloud, CloudRain, Sun, CloudSnow } from "lucide-react";

interface HourlyData {
  time: string;
  temperature: number;
  condition: string;
}

interface HourlyForecastProps {
  data: HourlyData[];
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes("rain")) return <CloudRain className="w-6 h-6" />;
    if (lower.includes("cloud")) return <Cloud className="w-6 h-6" />;
    if (lower.includes("snow")) return <CloudSnow className="w-6 h-6" />;
    return <Sun className="w-6 h-6" />;
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Hourly Forecast</h3>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {data.map((hour, index) => (
          <div key={index} className="flex flex-col items-center gap-2 min-w-[60px]">
            <p className="text-muted-foreground">{hour.time}</p>
            <div className="text-muted-foreground">
              {getWeatherIcon(hour.condition)}
            </div>
            <p>{Math.round(hour.temperature)}°</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
