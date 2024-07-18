'use client';

import { submitSearch } from "@/actions";
import { useParams } from "next/navigation";
import NavLocationSelector from "./LocationSelector";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "@/hooks";
import { debugLog, getParentIds } from "@/functions/helpers";

export default function NavSearch() {
  const [open, setOpen] = useState(false);
  const { query } = useParams();
  const q = typeof query == 'string' ? query : (query ?? []).join(' ')
  const excludedDivRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const { isLoaded, ...location } = useLocation({
    address: q ? q : "Lagos, Nigeria",
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    // Function to handle click outside the excluded div
    const handleClickOutside = (event: MouseEvent) => {
      if (!getParentIds(event.target).includes('ignore_search_click')) {
        // Click occurred outside the excluded div
        debugLog('out click')
        setOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mouseup', handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only once


  return (
    <div id="excluded-div" className="relative flex items-center gap-2 w-full md:min-w-[450px] z-10" ref={excludedDivRef}>
      <form action={submitSearch}
        id="ignore_search_click"
        className="flex max-md:flex-col items-stretch flex-grow rounded-lg border border-black-50 overflow-hidden max-md:p-2 max-md:gap-2">
        <select name="type" id="" className="bg-[#F0F0F0] max-md:hidden focus:outline-none text-black-400 border-none outline-none font-semibold text-label">
          <option value="search">Services</option>
          <option value="artisans">Artisans</option>
        </select>
        <input
          onClick={() => setOpen(true)}
          type="text"
          className="[border:1px_solid_transparent!important] font-semibold text-label text-black-500 flex-grow [outline:1px_solid_transparent!important] [all:unset] [box-shadow:none!important] w-[100%!important] md:!px-3 py-1 rounded-md "
          placeholder="What are you looking for?"
          name="query"
          defaultValue={q}
        />
        <div className={`max-md:self-center md:my-1 rounded max-md:h-[1px] md:w-[1px] w-[calc(100%-8px)] bg-black-100 md:bg-black-300
          ${open ? "max-md:block" : "max-md:hidden"}
          `}></div>
        {isLoaded && <NavLocationSelector
          {...location}
          suggestionRef={suggestionRef}
          open={open}
          className={`${open ? "max-md:flex" : "max-md:hidden"}`} />}
      </form>
      {/* <Suspense><SearchMobile /></Suspense> */}
    </div>
  );
}
