import Sort from "@/app/(main)/(public)/search/components/Sort";
import Price from "@/app/(main)/(public)/search/components/price";
import Location from "@/app/(main)/(public)/search/components/Location";
import { DropdownMenu } from "@radix-ui/themes";
import AppIcons from "../AppIcons";
import Category from "@/app/(main)/(public)/search/components/Category";

export default function SearchMobile() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="p-1 md:hidden">
          <AppIcons.Filter />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        style={{
          maxWidth: "min(95vw, 320px)",
        }}
      >
        <form className=" divide-y-2 flex flex-col gap-2 p-2">
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
          <div className="search-mobile-group">
            <Category />
          </div>
          <button className="btn-dark-tiny py-2 w-full">Apply</button>
        </form>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
