import dayjs from "dayjs";
import Condition from "./_components/Condition";
import WindSection from "./_components/WindSection";
import { Hour, Weather } from "./service/weatherData";

interface Props {
  weather: Weather;
}
export default function Detail({ weather }: Readonly<Props>) {
  return (
    <section className="p-2">
      <h2 className="text-xl font-semibold">Hourly</h2>
      <div className="overflow-x-auto flex">
        {weather.forecast.forecastday[0].hour
          .filter(notPast)
          .map((hour: any) => (
            <div
              key={hour.time_epoch}
              className="nm-concave-pink-700 rounded-lg m-2 min-w-28 m-1 text-center"
            >
              <div className="flex items-center">
                <Condition
                  icon={hour.condition.icon}
                  text={hour.condition.text}
                  current={false}
                  small
                  />
                  {hour.temp_c}&deg; C<br></br>
              </div>
              <WindSection
                small
                degree={hour.wind_degree}
                direction={hour.wind_dir}
                speed={hour.wind_kph}
                icon={false}
              />
              <small className="font-normal">
                {dayjs(hour.time).format("HH:mm")}
              </small>
            </div>
          ))}
      </div>
    </section>
  );
}

function notPast(a: Hour) {
  return dayjs(a.time).isAfter(dayjs());
}
