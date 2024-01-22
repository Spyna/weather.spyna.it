import { makeObservable, observable, runInAction } from "mobx";

class WeatherService {
  location: string = "";
  weatherData: any = null;
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
      const response = await fetch(`/api?query=${this.location}`);

      const body = await response.json();
      runInAction(() => {
        this.weatherData = body;
        console.log(this.weatherData);
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
