import { LuImageOff } from "react-icons/lu";

export function NoImage() {
  return (
    <div
      className=" d-flex flex-column justify-content-center align-items-center bg-light"
      style={{
        width: 150,
        height: 150,
      }}
    >
      <LuImageOff
        style={{
          fontSize: "40px",
        }}
      />
    </div>
  );
}
