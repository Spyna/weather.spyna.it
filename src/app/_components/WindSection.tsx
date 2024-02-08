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

export default function WindSection({
  speed,
  direction,
  degree,
  small = false,
  icon = true,
}: Readonly<Props>) {
  return (
    <div
      className={
        "flex p-1" +
        (small ? " items-center" : "  p-2 m-1 flex-col nm-concave-pink-700 rounded-lg") 
      }
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
          {!small && <span>{direction} </span>}
          <ArrowLongUpIcon
            className="w-5 h-5 inline-block"
            style={{
              transform: `rotate(${180 - degree}deg)`,
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
