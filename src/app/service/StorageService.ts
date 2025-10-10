import { makeObservable, observable, runInAction } from "mobx";

export interface Location {
  location: string;
  default?: boolean;
}

class StorageService {
  locations: Location[] = [];
  private store = new Store();
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
    this.store.save("locations", this.locations);
  }

  private getLatestLocations() {
    runInAction(() => {
      this.locations = this.store.get("locations", "[]") || [];
    });
  }

  addLocation(location: string) {
    runInAction(() => {
      if (this.locations.find((l) => l.location === location)) {
        return;
      }
      this.locations = [{ location, default: false }, ...this.locations];
    });
    this.store.save("locations", this.locations);
  }

  getByName(location: string) {
    return this.locations.find((l) => l.location === location);
  }
}

class Store {
  save(key: string, value: any) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  get(key: string, defaultValue: string = "null") {
    if (typeof localStorage !== "undefined") {
      return JSON.parse(localStorage.getItem(key) ?? defaultValue);
    }
  }
}

export const storageService = new StorageService();
