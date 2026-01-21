import { Card } from "./ui/card";
import { Clock } from "lucide-react";

interface ForecastPeriodsProps {
  realForecast12h?: string;
  realForecast24h?: string;
}

export function ForecastPeriods({ realForecast12h, realForecast24h }: ForecastPeriodsProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-6">Extended Forecast</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <h4>12-Hour Forecast</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {realForecast12h || "Loading forecast data..."}
          </p>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <h4>24-Hour Forecast</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {realForecast24h || "Loading forecast data..."}
          </p>
        </div>
      </div>
    </Card>
  );
}