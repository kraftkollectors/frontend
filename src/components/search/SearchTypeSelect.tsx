'use client'
import { useChangeSearchParams } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";

export default function SearchTypeSelect() {
    const {push} = useRouter();
    const pathname = usePathname();
    const {params} = useChangeSearchParams();
    const query = params.get('q') ?? '';
    
    return (
        
            <select 
            defaultValue={pathname.startsWith("/artisan") ? "/artisan" : "/search"}
            onChange={e=>push(`${e.target.value}/${query}`)}
            className="filter-btn text-center !border-transparent">
                <option value="/search">Services</option>
                <option value="/artisan">Artisans</option>
            </select>
    );
}