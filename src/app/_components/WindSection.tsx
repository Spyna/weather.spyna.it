import { ArrowLongUpIcon } from "@heroicons/react/24/solid";
import windIcon from "./wind.svg";
import Image from "next/image";

interface Props {
  speed: number;
  direction: string;
  degree: number;
  small?: boolean;
}

export default function WindSection({
  speed,
  direction,
  degree,
  small = false,
}: Readonly<Props>) {
  return (
    <div className={"flex" + (small?"":"  p-2 shadow m-1")}>
      {!small && (
        <div>
          <Image src={windIcon} alt="Wind" width={60} height={60} />
        </div>
      )}
      <div className="m-1">
        <div>{speed} km/h</div>
        <div>
          {degree} {direction}{" "}
          <ArrowLongUpIcon
            className="w-5 h-5 inline-block"
            style={{
              transform: `rotate(${180-degree}deg)`,
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
