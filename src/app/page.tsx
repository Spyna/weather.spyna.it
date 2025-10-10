"use client";
import { FaArrowUpLong } from "react-icons/fa6";
import { SiAccuweather } from "react-icons/si";

import Search from "./_components/Search";
import Summary from "./_components/Summary";
import Detail from "./Detail";
import { observer } from "mobx-react-lite";
import { weatherService } from "./service/WeatherService";
import Loader from "@/component/ui/Loader/Loader";
import RecentLocations from "./_components/RecentLocations";
import Forecast from "./_components/Forecast";

export const dynamic = "force-dynamic";


export default observer(function Home() {
  const { weatherData, loading } = weatherService;

  return (
    <main>
      <Search />
      {weatherData && (
        <div className="bg-gradient-to-b from-pink-800 to-pink-600">
          <Summary weather={weatherData} location={weatherService.location} />
          <Detail weather={weatherData} />
        </div>
      )}
      {!weatherData && (
        <div className="h-screen bg-gradient-to-b from-pink-800 to-pink-600">
          {loading && <Loader />}
          {!loading && <Intro />}
        </div>
      )}
      {weatherData && <Forecast weather={weatherData} />}
      <RecentLocations />
    </main>
  );
});

function Intro() {
  return (
    <section className="flex flex-col items-center justify-center py-40 text-white">
      <FaArrowUpLong className="w-16 h-16 animate-bounce" />
      <p>Select a place to start</p>
      <div className="mt-20 flex flex-col items-center">
        <SiAccuweather className="w-20 h-20" />
        <h1 className="text-4xl font-bold">Weather</h1>
        <p className="mt-4">Get the latest weather updates.</p>
      </div>
    </section>
  );
}
