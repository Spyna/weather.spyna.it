import dayjs from "dayjs";
import WindSection from "./WindSection";
import Condition from "./Condition";
import umbrella from "./umbrella.svg";
import Image from "next/image";

interface Props {
  response: any;
}

export default function Summary({ response }: Readonly<Props>) {
  return (
    <section className="mb-4 shadow p-2">
      <span className="text-white">
        {dayjs(response.location.localtime).format("dddd, MMMM D, YYYY")}
      </span>
      <div className="flex text-white items-center justify-around my-5">
        <div className="p-2 shadow w-1/2">
          <div>
            <p className="mb-3">
              <small>
                Max {response.forecast.forecastday[0].day.maxtemp_c}&deg; -{" "}
                <span className="">
                  Min {response.forecast.forecastday[0].day.mintemp_c}&deg;
                </span>
              </small>
            </p>
            <span className="text-7xl">{response.current.temp_c}&deg;</span>
            <span className="text-3xl -mt-7 inline-block">C</span>
          </div>
          <small>Feels like {response.current.feelslike_c}&deg;</small>
        </div>
        <div className="text-center m-1">
          <div className="p-2 shadow">
            <Condition
              icon={response.current.condition.icon}
              text={response.current.condition.text}
            />
          </div>
          <div className="my-2 p-2 shadow">
            Day
            <div className="flex items-center">
              <img
                src={response.forecast.forecastday[0].day.condition.icon}
                alt={response.forecast.forecastday[0].day.condition.text}
                width={64}
                height={64}
              />
              <span>{response.forecast.forecastday[0].day.condition.text}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <WindSection
          speed={response.current.wind_kph}
          direction={response.current.wind_dir}
          degree={response.current.wind_degree}
        />
        <div className="p-2 shadow m-1">
          <Image
            className="inline-block"
            src={umbrella}
            width={60}
            height={60}
            alt={`chance of raining: ${response.forecast.forecastday[0].day.daily_chance_of_rain}%`}
          />{" "}
          {response.forecast.forecastday[0].day.daily_chance_of_rain}%
        </div>
      </div>
    </section>
  );
}
