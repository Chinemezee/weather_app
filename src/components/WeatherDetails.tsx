import { Card } from "./ui/card";
import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, MapPin } from "lucide-react";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export function WeatherDetails({ 
  humidity, 
  windSpeed, 
  visibility, 
  pressure, 
  sunrise, 
  sunset,
  coordinates 
}: WeatherDetailsProps) {
  const details = [
    { icon: <Droplets className="w-5 h-5" />, label: "Humidity", value: `${humidity}%` },
    { icon: <Wind className="w-5 h-5" />, label: "Wind Speed", value: `${windSpeed} km/h` },
    { icon: <Eye className="w-5 h-5" />, label: "Visibility", value: `${visibility} km` },
    { icon: <Gauge className="w-5 h-5" />, label: "Pressure", value: `${pressure} hPa` },
    { icon: <Sunrise className="w-5 h-5" />, label: "Sunrise", value: sunrise },
    { icon: <Sunset className="w-5 h-5" />, label: "Sunset", value: sunset },
    { icon: <MapPin className="w-5 h-5" />, label: "Coordinates", value: `${coordinates.lat.toFixed(4)}°, ${coordinates.lon.toFixed(4)}°` },
  ];

  return (
    <Card className="p-6">
      <h3 className="mb-4">Weather Details</h3>
      <div className="grid grid-cols-2 gap-6">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="text-muted-foreground mt-0.5">
              {detail.icon}
            </div>
            <div>
              <p className="text-muted-foreground">{detail.label}</p>
              <p>{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
