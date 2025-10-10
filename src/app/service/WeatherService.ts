import { makeObservable, observable, runInAction } from "mobx";
import { Weather } from "../../types/weatherData";

class WeatherService {
  location: string = "";
  weatherData: Weather | null = null;
  loading: boolean = false;

  constructor() {
    makeObservable(this, {
      location: observable,
      weatherData: observable,
    });
  }

  setLocation(location: string) {
    this.location = location;
  }

  async update() {
    if (this.location === "") {
      return;
    }
    runInAction(() => {
      this.loading = true;
      this.weatherData = null;
    });
    try {
      const response = await fetch(`/api?query=${this.location}&days=10&aqi=no&alerts=no`);

      const body = await response.json();
      runInAction(() => {
        this.weatherData = body;
      });
    } catch (error) {
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const weatherService = new WeatherService();
