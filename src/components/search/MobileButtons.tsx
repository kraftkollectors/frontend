"use client"

import SearchMobile from "../navbar/SearchMobile";
import { Suspense } from "react";
import SearchTypeSelect from "./SearchTypeSelect";

export default function MobileFilterButtons() {


    return (
        <div className="grid grid-cols-2 gap-3 items-center justify-between md:hidden">
            <Suspense>
                <SearchTypeSelect />
                <SearchMobile />
            </Suspense>
        </div>
    );
}