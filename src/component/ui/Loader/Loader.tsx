import Image from "next/image";
import lodingImage from "./loading.svg";

export default function Loader() {
  return (
    <div className="loader flex justify-center">
      <Image
        src={lodingImage}
        alt="Loading, please wait"
        width={128}
        height={128}
        priority
      />
    </div>
  );
}
