'use client'

import { SubCategory } from "@/utils/types/category";

export default function SubCategoryRow({
    _id,
    title,
}: SubCategory) {
    return (
        <tr className="bg-light">
            <td className="!py-0 flex gap-2 items-center overflow-hidden">
                <div className="w-10 py-1"></div>
                <h2 className="border-l ps-4">{title}</h2>
            </td>
            <td>
                100
            </td>
            <td></td>
            <td></td>
        </tr>
    );
}