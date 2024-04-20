import { MdMyLocation } from "react-icons/md";

export function UseCurrentLocation() {
  return (
    <button className="text-primary hover:text-primary-dark flex items-center gap-2">
      <MdMyLocation />
      <span>Use Current location</span>
    </button>
  );
}
