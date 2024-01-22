import { makeObservable, observable, runInAction } from "mobx";

interface Location {
  location: string;
  default?: boolean;
}

class StorageService {
  locations: Location[] = [];
  constructor() {
    makeObservable(this, {
      locations: observable,
    });
    this.getLatestLocations();
  }

  setDefault(location: Location) {
    runInAction(() => {
      const temp = [...this.locations];
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        if (element.location === location.location) {
          temp[index].default = true;
        } else {
          temp[index].default = false;
        }
      }
      this.locations = [...temp];
    });
    localStorage.setItem("locations", JSON.stringify(this.locations));
  }

  private getLatestLocations() {
    runInAction(() => {
      this.locations = JSON.parse(localStorage.getItem("locations") ?? "[]");
    });
  }

  addLocation(location: string) {
    runInAction(() => {
      if (this.locations.find((l) => l.location === location)) {
        return;
      }
      this.locations = [{ location, default: false }, ...this.locations];
    });
    localStorage.setItem("locations", JSON.stringify(this.locations));
  }
}

export const storageService = new StorageService();
