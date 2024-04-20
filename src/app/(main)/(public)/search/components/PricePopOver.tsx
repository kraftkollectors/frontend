import { Popover } from "@radix-ui/themes";
import { FaChevronDown } from "react-icons/fa6";

export default function PricePopOver() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="search-filter-btn">
          Price <FaChevronDown />
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-2 min-w-72 w-screen max-w-[400px]">
          <button className="btn-dark-tiny py-2 w-full">Apply</button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
