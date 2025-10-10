import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconEmpty } from "@heroicons/react/24/outline";
import {
  Location as LocationType,
  storageService,
} from "@/app/service/StorageService";

interface Props {
  location?: LocationType;
  storageService: typeof storageService;
}

export default function Location({ location: l, storageService }: Props) {
  if (!l) {
    return <div>Unknown location</div>;
  }
  return (
    <div className="p-3 border-b flex justify-between items-center text-xl">
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
  );
}
