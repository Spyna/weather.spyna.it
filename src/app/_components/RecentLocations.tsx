import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconEmpty } from "@heroicons/react/24/outline";
import { storageService } from "../service/StorageService";
import { observer } from "mobx-react-lite";

export default observer(function RecentLocations() {
  const { locations } = storageService;
  return (
    <section className="p-4 bg-pink-800 nm-concave-pink-700-sm">
      {locations.length === 0 && <div>Search a city</div>}
      {locations.length > 0 && (
        <div>
          <h2 className="text-xl">Recent locations</h2>
          {locations.map((l) => (
            <div
              className="p-3 border-b flex justify-between items-center"
              key={l.location}
            >
              {l.location}
              <button
                type="button"
                className="border rounded-full p-2"
                onClick={() => storageService.setDefault(l)}
              >
                {l.default ? (
                  <StarIcon className="w-5 h-5" />
                ) : (
                  <StarIconEmpty className="w-5 h-5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
});
