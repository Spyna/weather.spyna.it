import dayjs from "dayjs";
import { Forecastday, Weather } from "../service/weatherData";
import Condition from "./Condition";
import WindSection from "./WindSection";

interface Props {
  weather: Weather;
}
export default function Forecast({ weather }: Readonly<Props>) {
  return (
    <section className="bg-gradient-to-br from-pink-950 to-pink-900">
      <div className="">
        {weather.forecast.forecastday.map((day: Forecastday) => (
          <div key={day.date_epoch} className="border-b min-w-28 flex justify-around items-end py-4 pb-6">
            <div><span className="font-semibold">{dayjs(day.date).format("dddd DD")}</span><br></br>
            {day.day.condition.text}
            </div>
            <div className="flex justify-evenly">
              <Condition icon={day.day.condition.icon} small text="" />
              <div>
                {day.day.maxtemp_c}&deg;C <br></br> {day.day.mintemp_c}&deg;C
              </div>
            </div>
              <WindSection small speed={day.day.maxwind_kph} direction="" />
          </div>
        ))}
      </div>
    </section>
  );
}
