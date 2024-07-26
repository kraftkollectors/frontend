import { FaChevronDown } from "react-icons/fa6";
import LocationPopOver from "./components/LocationPopOver";
import PricePopOver from "./components/PricePopOver";
import SortBy from "./components/SortByPopOver";
import CategoryPopOver from "./components/CategoryPopOver";

export default function SearchOption() {
  return (
    <div className="flex justify-between gap-2 py-3 max-md:hidden">
      <div className="flex items-center gap-2">
        <p className="font-semibold text-black-300">Filter:</p>
        <LocationPopOver />
        <CategoryPopOver />
        <PricePopOver />
      </div>
      <div className="flex items-center gap-2">
        <p className="font-semibold text-black-300">sort by:</p>
        <SortBy />
      </div>
    </div>
  );
}
