"use client";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import { weatherService } from "../service/WeatherService";
import React, { useEffect } from "react";
import { storageService } from "../service/StorageService";

export default observer(function Search() {
  const current = weatherService.location;

  function locationChangeListener(e: React.ChangeEvent<HTMLInputElement>) {
    weatherService.setLocation(e.target.value);
  }

  function onSubmitListener(e: React.SyntheticEvent) {
    e.preventDefault();
    storageService.addLocation(weatherService.location);
    weatherService.update();
  }

  useEffect(() => {
    const defaultLocation = storageService.locations.find((l) => l.default);
    if (defaultLocation) {
      weatherService.setLocation(defaultLocation.location);
      weatherService.update();
    }
  }, []);

  return (
    <form onSubmit={onSubmitListener}>
      <div className="flex p-2 bg-pink-800">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          City
        </label>
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-pink-100 border border-e-0 border-gray-300"
          type="button"
        >
          <Bars3Icon className="w-5 h-5 ml-2" />
        </button>
        {/* <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg nm-concave-pink-700 rounded-lg m-2 w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Shopping
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Images
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                News
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Finance
              </a>
            </li>
          </ul>
        </div> */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-pink-500"
            placeholder="City"
            required
            value={current}
            onChange={locationChangeListener}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-pink-700 rounded-e border border-pink-700 hover:bg-pink-800 "
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
});
