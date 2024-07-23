"use client";

import SearchMobile from "../navbar/SearchMobile";
import { Suspense } from "react";
import SearchTypeSelect from "./SearchTypeSelect";
import TypePopover from "../navbar/TypePopover";

export default function MobileFilterButtons() {
  return (
    <div className="grid grid-cols-2 items-center justify-between gap-3 md:hidden">
      <Suspense>
        <TypePopover className="filter-btn !border-black-50 text-center" />
        {/* <SearchTypeSelect /> */}
        <SearchMobile />
      </Suspense>
    </div>
  );
}
