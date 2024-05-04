import { UseCurrentLocation } from "@/components";
import { Popover } from "@radix-ui/themes";
import { MdMyLocation } from "react-icons/md";
import Location from "./Location";

export default function LocationPopOver() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="search-filter-btn">
          location <MdMyLocation />
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <Location />
      </Popover.Content>
    </Popover.Root>
  );
}
