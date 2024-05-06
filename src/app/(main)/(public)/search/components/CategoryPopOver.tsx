import { Popover } from "@radix-ui/themes";
import Category from "./Category";
import { FaChevronDown } from "react-icons/fa6";

export default function CategoryPopOver() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="search-filter-btn">
          Category <FaChevronDown />
        </button>
      </Popover.Trigger>
      <Popover.Content
        style={{
          minWidth: 280,
        }}
      >
        <form className="flex flex-col gap-2">
          <Category />
          <button className="btn-dark-tiny py-2 w-full">Apply</button>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
}
