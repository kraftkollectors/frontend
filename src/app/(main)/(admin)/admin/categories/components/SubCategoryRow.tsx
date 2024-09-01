'use client'

import { apis } from "@/utils";
import { SubCategory } from "@/utils/types/category";
import { useQuery } from "@tanstack/react-query";

export default function SubCategoryRow({
    _id,
    title,
}: SubCategory) {
    const { data, isLoading, error } = useQuery({
        queryFn: () => fetch(apis.singleSubCategory(_id)).then(res => res.json()),
        queryKey: [_id, "sub_category"]
    })

    // if(data?.statusCode === 201) alert(JSON.stringify(data.data))

    return (
        <tr className="bg-light">
            <td className="!py-0 flex gap-2 items-center overflow-hidden">
                <div className="w-10 py-1"></div>
                <h2 className="border-l ps-4">{title}</h2>
            </td>
            <td>
                {
                    error ? "--"
                        : isLoading ? "..."
                        // : JSON.stringify(data)
                            : `${Number(data.serviceCount) ?? '--'}`
                }
            </td>
            <td></td>
            <td></td>
        </tr>
    );
}