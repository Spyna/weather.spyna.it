import dayjs from "dayjs";
import Wind from "./WindSection";
import Condition from "./Condition";
import umbrella from "./umbrella.svg";
import Image from "next/image";
import { Weather } from "../service/weatherData";

interface WithWeather {
  weather: Weather;
}
interface SummaryProps {
  weather: Weather;
  location: string;
}

export default function Summary({ weather, location }: Readonly<SummaryProps>) {
  return (
    <section className="p-4">
      <h2 className="text-white">
        <strong className="text-xl">{location}</strong>
        <br></br>
        <small>
          {dayjs(weather.location.localtime).format("dddd, MMMM D, YYYY")}
        </small>
      </h2>
      <div className="grid grid-cols-2 text-white gap-4 my-4">
        <Temperature weather={weather} />
        <WeatherCondition weather={weather} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Wind
          speed={weather.current.wind_kph}
          direction={weather.current.wind_dir}
          degree={weather.current.wind_degree}
        />
        <ChancheOfRain weather={weather} />
      </div>
    </section>
  );
}

function ChancheOfRain({ weather }: Readonly<WithWeather>) {
  return (
    <div className="p-4 nm-concave-pink-700 rounded-lg flex items-center space-x-4">
      <Image
        className="inline-block"
        src={umbrella}
        width={60}
        height={60}
        alt={`chance of raining: ${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`}
      />{" "}
      <div className="text-center">
        <small>Chance of rain: </small>
        <br></br>
        <span className="text-lg font-medium">
          {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
        </span>
      </div>
    </div>
  );
}

function Temperature({ weather }: Readonly<WithWeather>) {
  return (
    <div className="p-4 nm-concave-pink-700 rounded-lg text-center">
      <div>
        <p className="mb-3">
          <small>
            Max {weather.forecast.forecastday[0].day.maxtemp_c}&deg; -{" "}
            <span className="">
              Min {weather.forecast.forecastday[0].day.mintemp_c}&deg;
            </span>
          </small>
        </p>
        <span className="text-7xl">{weather.current.temp_c}&deg;</span>
        <span className="text-3xl -mt-7 inline-block">C</span>
      </div>
      <small>Feels like {weather.current.feelslike_c}&deg;</small>
    </div>
  );
}

function WeatherCondition({ weather }: Readonly<WithWeather>) {
  return (
    <div className="">
      <div className="p-2 nm-concave-pink-700 rounded-lg">
        Current
        <Condition
          icon={weather.current.condition.icon}
          text={weather.current.condition.text}
        />
      </div>
      <div className="mt-6 p-2 nm-concave-pink-700 rounded-lg">
        Day
        <div className="flex items-center">
          <img
            src={weather.forecast.forecastday[0].day.condition.icon}
            alt={weather.forecast.forecastday[0].day.condition.text}
            width={64}
            height={64}
          />
          <span>{weather.forecast.forecastday[0].day.condition.text}</span>
        </div>
      </div>
    </div>
  );
}
