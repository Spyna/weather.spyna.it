import { Wheater } from "./weatherData";
export interface Forecast {
    id: number;
    location: string;
    forecast: Weather;
    created_at: Date;
    updated_at: Date;
}