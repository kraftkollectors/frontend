"use client"

import { usePathname, useRouter } from "next/navigation";
import SearchMobile from "../navbar/SearchMobile";

export default function MobileFilterButtons() {
    const {push} = useRouter();
    const pathname = usePathname();
    
    return (
        <div className="grid grid-cols-2 gap-3 items-center justify-between md:hidden">
            <select 
            defaultValue={pathname.startsWith("/search") ? "/search" : "/artisan"}
            onChange={e=>push(e.target.value)}
            className="filter-btn text-center !border-transparent">
                <option value="/search">Services</option>
                <option value="/artisan">Artisans</option>
            </select>
           <SearchMobile />
        </div>
    );
}