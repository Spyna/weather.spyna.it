
import { storageService } from "../service/StorageService";
import { observer } from "mobx-react-lite";
import Location from "./Locations/Location";

export default observer(function RecentLocations() {
  const { locations } = storageService;
  return (
    <section className="p-4 bg-pink-800 nm-concave-pink-700-sm">
      {locations.length === 0 && <div>Search a city</div>}
      {locations.length > 0 && (
        <div>
          <h2 className="text-xl">Recent locations</h2>
          {locations.map((l) => (
            <Location key={l.location} location={l} storageService={storageService} />
          ))}
        </div>
      )}
    </section>
  );
});
