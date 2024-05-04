import { Popover, Radio } from "@radix-ui/themes";
import { LuArrowDownUp } from "react-icons/lu";
import Sort from "./Sort";

export default function SortBy() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className=" flex gap-2 items-center text-primary">
          <LuArrowDownUp />
          <p>Best Rating</p>
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <Sort />
        <button className="btn-dark-tiny py-2 w-full mt-3">Apply</button>
      </Popover.Content>
    </Popover.Root>
  );
}
