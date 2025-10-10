import dayjs from "dayjs";
import Condition from "./_components/Condition";
import Wind from "./_components/WindSection";
import { Hour, Weather } from "../types/weatherData";

interface Props {
  weather: Weather;
}

export default function Detail({ weather }: Readonly<Props>) {
  return (
    <section className="">
      <h3 className="text-2xl m-6 font-semibold">Hourly forecast</h3>
      <div className="overflow-x-auto flex space-x-3 pb-2 px-1">
        {weather.forecast.forecastday[0].hour
          .filter(notPast)
          .map((hour: any) => (
            <div
              key={hour.time_epoch}
              className="nm-concave-pink-700 rounded-lg min-w-32 text-center"
            >
                <div className="py-3 px-2">
              <div className=" items-center text-2xl">
                <Condition
                  icon={hour.condition.icon}
                  text={hour.condition.text}
                  small
                />
                {hour.temp_c}&deg; C
              </div>
              <hr></hr>
              <div className="mt-2">
                Wind
              <Wind
                small
                degree={hour.wind_degree}
                direction={hour.wind_dir}
                speed={hour.wind_kph}
                icon={false}
                />
                </div>
                {hour.chance_of_rain > 0 && (
                  <div className="mt-2">
                    <small>Rain</small>
                    <br></br>
                    <span className="text-lg font-medium">
                      {hour.chance_of_rain}%<br></br>
                      {hour.precip_mm} mm
                    </span>
                  </div>
                )}
              </div>
              <div className="font-normal bg-pink-900 rounded-b-lg p-2">
                H {dayjs(hour.time).format("HH:mm")}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function notPast(hour: Hour) {
  return dayjs(hour.time).hour() > dayjs().hour();
}
