import { FaChevronDown } from "react-icons/fa6";
import LocationPopOver from "./components/LocationPopOver";
import PricePopOver from "./components/PricePopOver";

export default function SearchOption() {
  return (
    <div className="flex gap-2 py-3 items-center">
      <p className="text-black-300">Filter:</p>
      <PricePopOver />
      <LocationPopOver />
    </div>
  );
}
