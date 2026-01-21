import { Card } from "./ui/card";
import { Cloud, CloudRain, Sun, CloudSnow, CloudDrizzle } from "lucide-react";

interface DailyData {
  day: string;
  condition: string;
  high: number;
  low: number;
}

interface DailyForecastProps {
  data: DailyData[];
}

export function DailyForecast({ data }: DailyForecastProps) {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes("rain")) return <CloudRain className="w-6 h-6" />;
    if (lower.includes("cloud")) return <Cloud className="w-6 h-6" />;
    if (lower.includes("snow")) return <CloudSnow className="w-6 h-6" />;
    if (lower.includes("drizzle")) return <CloudDrizzle className="w-6 h-6" />;
    return <Sun className="w-6 h-6" />;
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {data.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <p className="w-16">{day.day}</p>
              <div className="text-muted-foreground">
                {getWeatherIcon(day.condition)}
              </div>
              <p className="text-muted-foreground">{day.condition}</p>
            </div>
            <div className="flex gap-4">
              <p className="text-muted-foreground">{Math.round(day.low)}°</p>
              <p className="w-8">{Math.round(day.high)}°</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
