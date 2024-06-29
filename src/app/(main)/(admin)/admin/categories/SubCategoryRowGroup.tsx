'use client'

import { useAdminStore } from "@/state";
import { ReactNode } from "react";

export type SubCategoryRowGroupProps = {
    children: ReactNode;
    id: string;
}

export default function SubCategoryRowGroup({ children, id }: SubCategoryRowGroupProps) {
    const openCategory = useAdminStore(s=>s.openCategory);
    const isOpen = openCategory === id;

    if(isOpen)
    return (
        <>
            <tr className="bg-[#F3F3F3]">
                <td className="!py-1 flex gap-2 items-center">
                    <div className="w-10"></div>
                    <h2>Sub-category name</h2>
                </td>
                <td>
                    Total services
                </td>
                <td></td>
                <td></td>
            </tr>
            {children}
        </>
    );
}