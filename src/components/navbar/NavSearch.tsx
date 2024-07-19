'use client';

import { submitSearch } from "@/actions";
import { useParams, usePathname } from "next/navigation";
import NavLocationSelector from "./LocationSelector";
import { useEffect, useState } from "react";
import { useChangeSearchParams, useLocation } from "@/hooks";
import { getParentIds } from "@/functions/helpers";

export default function NavSearch() {
  const { params } = useChangeSearchParams();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { query } = useParams();
  const q = typeof query == 'string' ? query : (query ?? []).join(' ')
  const [val, setVal] = useState(q);
  const { isLoaded, ...location } = useLocation({
    address: params.get('address') ?? "Lagos, Nigeria",
    latitude: 6.5243793,
    longitude: 3.3792057,
  })

  useEffect(() => {
    // Function to handle click outside the excluded div
    const handleClickOutside = (event: MouseEvent) => {
      const parentIds = getParentIds(event.target);
      if (!parentIds.includes('ignore_search_click')) {
        // Click occurred outside the excluded div
        // debugLog('out click')
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

  useEffect(()=>{
    setOpen(false);
  }, [params, pathname])


  return (
    <div id="excluded-div" className="relative flex items-center gap-2 w-full lg:min-w-[450px] z-10">
      <form action={submitSearch}
        onClick={() => setOpen(true)}
        className="flex max-lg:flex-col items-stretch flex-grow rounded-lg border border-black-50 overflow-hidden max-lg:p-2 max-lg:gap-2">
        <select 
        defaultValue={pathname.includes('search') ? 'search' : 'artisan'}
        name="type" className="bg-[#F0F0F0] max-lg:hidden focus:outline-none text-black-400 border-none outline-none font-semibold text-label">
          <option value="search">Services</option>
          <option value="artisan">Artisans</option>
        </select>
        <input
          type="text"
          className="[border:1px_solid_transparent!important] font-semibold text-label text-black-500 flex-grow [outline:1px_solid_transparent!important] [all:unset] [box-shadow:none!important] w-[100%!important] lg:!px-3 py-1 rounded-md "
          placeholder="What are you looking for?"
          name="query"
          value={val}
          onChange={(e)=>setVal(e.target.value)}
        />
        <div className={`max-lg:self-center lg:my-1 rounded max-lg:h-[1px] lg:w-[1px] w-[calc(100%-8px)] bg-black-100 lg:bg-black-300
          ${open ? "max-lg:block" : "max-lg:hidden"}
          `}></div>
        {isLoaded && <NavLocationSelector
          {...location}
          open={open}
          className={`${open ? "max-lg:flex" : "max-lg:hidden"}`} />}
        <input type="hidden" name="longitude" value={location.location?.longitude} />
        <input type="hidden" name="latitude" value={location.location?.latitude} />
        <input type="hidden" name="address" value={location.location?.address} />
        <button type="submit" className="hidden"></button>
      </form>
      {/* <Suspense><SearchMobile /></Suspense> */}
    </div>
  );
}
