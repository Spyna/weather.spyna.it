interface Props {
  icon: string;
  text: string;
  current?: boolean;
  small?: boolean;
}
export default function Condition({
  icon,
  text,
  current = true,
  small = false,
}: Readonly<Props>) {
  return (
    <div
      className={"flex items-center" + (small ? " justify-center text-sm" : "")}
    >
      <img
        src={icon}
        alt={text}
        width={small ? 32 : 48}
        height={small ? 32 : 48}
      />
      {!small && (
        <small>
          {text}
          {current && (
            <>
              {" "}
              <br></br>(current)
            </>
          )}
        </small>
      )}
    </div>
  );
}
