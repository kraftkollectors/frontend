import Sort from "@/app/(main)/(public)/search/components/Sort";
import Price from "@/app/(main)/(public)/search/components/price";
import Location from "@/app/(main)/(public)/search/components/Location";
import { Popover } from "@radix-ui/themes";
import AppIcons from "../AppIcons";

export default function SearchMobile() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="p-1 md:hidden">
          <AppIcons.Filter />
        </button>
      </Popover.Trigger>
      <Popover.Content
        style={{
          maxWidth: "min(95vw, 320px)",
        }}
      >
        <div className=" divide-y-2">
          <div className="search-mobile-group">
            <p>Sort By</p>
            <Sort />
          </div>

          <div className="search-mobile-group">
            <p>Price</p>
            <Price />
          </div>
          <div className="search-mobile-group">
            <p>Location</p>
            <Location />
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
