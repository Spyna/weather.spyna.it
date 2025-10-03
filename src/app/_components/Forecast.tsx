import dayjs from "dayjs";
import { Forecastday, Weather } from "../service/weatherData";
import Condition from "./Condition";
import Wind from "./WindSection";

interface Props {
  weather: Weather;
}
export default function Forecast({ weather }: Readonly<Props>) {
  return (
    <section className="bg-pink-700 p-2 nm-inset-pink-700">
      <h2 className="text-2xl font-semibold m-6">Forecast</h2>
      <div className="">
        <div className="m-2">
          {weather.forecast.forecastday.map((day: Forecastday) => (
            <div
              key={day.date_epoch}
              className="min-w-28 flex justify-around items-end py-4 pb-6 nm-flat-pink-700 rounded my-6 p-2"
            >
              <div>
                <span className="font-semibold">
                  {dayjs(day.date).format("dddd DD")}
                </span>
                <br></br>
                {day.day.condition.text}
              </div>
              <div className="flex justify-evenly">
                <Condition icon={day.day.condition.icon} small text="" />
                <div>
                  {day.day.maxtemp_c}&deg;C <br></br> {day.day.mintemp_c}&deg;C
                </div>
              </div>
              <Wind small speed={day.day.maxwind_kph} direction="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
