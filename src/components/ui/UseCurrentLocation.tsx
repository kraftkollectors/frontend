import { MdMyLocation } from "react-icons/md";

export function UseCurrentLocation() {
  return (
    <>
    <input type="hidden" name="longitude" value={-1.09873} />
    <input type="hidden" name="latitude" value={0.09873} />
    <button className="text-primary hover:text-primary-dark flex items-center gap-2">
      <MdMyLocation />
      <span>Use Current location</span>
    </button>
    </>
  );
}
