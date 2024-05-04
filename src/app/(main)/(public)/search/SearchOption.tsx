import { FaChevronDown } from "react-icons/fa6";
import LocationPopOver from "./components/LocationPopOver";
import PricePopOver from "./components/PricePopOver";
import SortBy from "./components/SortByPopOver";

export default function SearchOption() {
  return (
    <div className="flex gap-2 py-3 justify-between max-md:hidden">
      <div className="flex gap-2 items-center">
        <p className="text-black-300">Filter:</p>
        <PricePopOver />
        <LocationPopOver />
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-black-300">sort by:</p>
        <SortBy />
      </div>
    </div>
  );
}
