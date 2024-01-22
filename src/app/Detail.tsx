import dayjs from "dayjs";
import Condition from "./_components/Condition";
import WindSection from "./_components/WindSection";

interface Props {
  response: any;
}
export default function Detail({ response }: Readonly<Props>) {
  return (
    <section className="p-2 shadow">
      <h2 className="text-xl font-semibold">Hourly</h2>
      <div className="overflow-x-auto flex">
        {response.forecast.forecastday[0].hour.map((hour: any) => (
          <div
            key={hour.time_epoch}
            className="shadow min-w-28 m-1 text-center"
          >
            {hour.temp_c}&deg; C<br></br>
            <Condition
              icon={hour.condition.icon}
              text={hour.condition.text}
              current={false}
              small
            />
            <WindSection
              small
              degree={hour.wind_degree}
              direction={hour.wind_dir}
              speed={hour.wind_kph}
            />
            <small className="font-semibold">
              {dayjs(hour.time).format("HH:mm")}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}
