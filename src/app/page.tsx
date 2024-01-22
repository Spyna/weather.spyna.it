"use client";
import Search from "./_components/Search";
import Summary from "./_components/Summary";
import Detail from "./Detail";
import { observer } from "mobx-react-lite";
import { weatherService } from "./service/WeatherService";
import Loader from "@/component/ui/Loader/Loader";
import RecentLocations from "./_components/RecentLocations";

export default observer(function Home() {
  const { weatherData, loading } = weatherService;
  
  return (
    <main>
      <Search />
      {weatherData && (
        <div className="bg-gradient-to-b from-pink-800 to-pink-600">
          <Summary response={weatherData} />
          <Detail response={weatherData} />
        </div>
      )}
<RecentLocations />
      {!weatherData && (
        <div className="h-screen bg-gradient-to-b from-pink-800 to-pink-600">
          {loading && <Loader />}
        </div>
      )}
    </main>
  );
});
