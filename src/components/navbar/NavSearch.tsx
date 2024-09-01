"use client";

import { submitSearch } from "@/actions";
import { useParams, usePathname } from "next/navigation";
import NavLocationSelector from "./LocationSelector";
import { useEffect, useState } from "react";
import { useChangeSearchParams, useLocation } from "@/hooks";
import { getParentIds } from "@/functions/helpers";
import TypePopover from "./TypePopover";

export default function NavSearch() {
  const { params } = useChangeSearchParams();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { query } = useParams();
  const q = typeof query == "string" ? query : (query ?? []).join(" ");
  const [val, setVal] = useState(q);
  const { isLoaded, ...location } = useLocation({
    address: params.get("address") ?? "Lagos, Nigeria",
    latitude: 6.5243793,
    longitude: 3.3792057,
  });

  useEffect(() => {
    // Function to handle click outside the excluded div
    const handleClickOutside = (event: MouseEvent) => {
      const parentIds = getParentIds(event.target);
      if (!parentIds.includes("ignore_search_click")) {
        // Click occurred outside the excluded div
        // debugLog('out click')
        setOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mouseup", handleClickOutside);
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    setOpen(false);
  }, [params, pathname]);

  return (
    <div
      id="excluded-div"
      className="relative z-10 flex w-full items-center gap-2 lg:min-w-[450px]"
    >
      <form
        action={submitSearch}
        onClick={() => setOpen(true)}
        className="animate flex flex-grow items-stretch overflow-hidden rounded-lg border border-black-50 max-lg:flex-col max-lg:gap-2 max-lg:p-2"
      >
        {/* <input
          type="hidden"
          name="type"
          value={pathname.includes("artisan") ? "artisan" : "search"}
        /> */}
        <TypePopover search={val} />
        <input
          type="text"
          className="w-[100%!important] flex-grow rounded-md py-1 text-label font-semibold text-black-500 [all:unset] [border:1px_solid_transparent!important] [box-shadow:none!important] [outline:1px_solid_transparent!important] lg:!px-3"
          placeholder="What are you looking for?"
          name="query"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <div
          className={`w-[calc(100%-8px)] rounded bg-black-100 max-lg:h-[1px] max-lg:self-center lg:my-1 lg:w-[1px] lg:bg-black-300 ${open ? "max-lg:block" : "max-lg:hidden"} `}
        ></div>
        {isLoaded && (
          <NavLocationSelector
            {...location}
            className={`${open ? "max-lg:flex" : "max-lg:hidden"}`}
          />
        )}
        <input
          type="hidden"
          name="longitude"
          value={location.location?.longitude}
        />
        <input
          type="hidden"
          name="latitude"
          value={location.location?.latitude}
        />
        <input
          type="hidden"
          name="address"
          value={location.location?.address}
        />
        <button type="submit" className="hidden"></button>
      </form>
      {/* <Suspense><SearchMobile /></Suspense> */}
    </div>
  );
}
