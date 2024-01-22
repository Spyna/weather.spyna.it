import dayjs from "dayjs";
import WindSection from "./WindSection";
import Condition from "./Condition";
import umbrella from "./umbrella.svg";
import Image from "next/image";
import { Weather } from "../service/weatherData";

interface Props {
  weather: Weather;
}

export default function Summary({ weather }: Readonly<Props>) {
  return (
    <section className="mb-4 shadow p-2">
      <span className="text-white">
        {dayjs(weather.location.localtime).format("dddd, MMMM D, YYYY")}
      </span>
      <div className="flex text-white items-center justify-around my-5">
        <div className="p-2 shadow w-1/2">
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
        <div className="text-center m-1">
          <div className="p-2 shadow">
            <Condition
              icon={weather.current.condition.icon}
              text={weather.current.condition.text}
            />
          </div>
          <div className="my-2 p-2 shadow">
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
      </div>
      <div className="flex">
        <WindSection
          speed={weather.current.wind_kph}
          direction={weather.current.wind_dir}
          degree={weather.current.wind_degree}
        />
        <div className="p-2 shadow m-1">
          <Image
            className="inline-block"
            src={umbrella}
            width={60}
            height={60}
            alt={`chance of raining: ${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`}
          />{" "}
          {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
        </div>
      </div>
    </section>
  );
}
