import { UseCurrentLocation } from "@/components";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { Popover } from "@radix-ui/themes";
import { MdMyLocation } from "react-icons/md";

export default function LocationPopOver() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="search-filter-btn">
          location <MdMyLocation />
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-2">
          <AppInput name="location" placeholder="Enter Location" />
          <UseCurrentLocation />
          <AppSelect name="radius" options={["radius"]} />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
