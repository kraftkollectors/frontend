'use client'

import { useChangeSearchParams } from "@/hooks";

export default function AdminSearch() {
    const { pushParams, params } = useChangeSearchParams();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const q = String(formData.get('search') ?? "");
            pushParams({ q })
        }} className="flex gap-3 justify-stretch">
            <input
            defaultValue={`${params.get('q')??''}`}
             placeholder="Search..." name="search" className="p-2 flex-shrink grow md:w-80 border border-black-100 rounded outline-primary" />
            <button className="btn-dark-tiny flex-shrink-0 px-4">Search</button>
        </form>
    );
}