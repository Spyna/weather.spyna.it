import { ArrowLongUpIcon } from "@heroicons/react/24/solid";
import windIcon from "./wind.svg";
import Image from "next/image";

interface Props {
  speed: number;
  direction: string;
  degree?: number;
  small?: boolean;
  icon?: boolean;
}

export default function Wind({
  speed,
  direction,
  degree,
  small = false,
  icon = true,
}: Readonly<Props>) {
  return (
    <div
      className={`flex items-center ${
        small ? "" : " space-x-4 p-4 nm-concave-pink-700 rounded-lg"
      }`}
    >
      {!small && (
        <div>
          <Image src={windIcon} alt="Wind" width={60} height={60} />
        </div>
      )}
      {small && icon && (
        <div className="mr-1">
          <Image src={windIcon} alt="Wind" width={16} height={16} />
        </div>
      )}
      <div>{speed} km/h</div>
      <div className="m-1">
        <div>
          <span>{direction}</span>
          {degree && (
            <ArrowLongUpIcon
              className="w-5 h-5 inline-block"
              style={{
                transform: `rotate(${180 - degree}deg)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
