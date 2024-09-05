"use client";

import { tryCatch } from "@/functions/helpers";
import { apis } from "@/utils";
import { SubCategory } from "@/utils/types/category";
import { useQuery } from "@tanstack/react-query";

export default function SubCategoryRow({ _id, title }: SubCategory) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetch(apis.singleSubCategory(_id)).then((res) => res.json()),
    queryKey: [_id, "sub_category"],
  });

  const serviceCount = tryCatch(
    () => {
      const count = data.data.existingRecord.serviceCount;
      return count;
    },
    () => {
      return "--";
    },
  );

  return (
    <tr className="bg-light">
      <td className="flex items-center gap-2 overflow-hidden !py-0">
        <div className="w-10 py-1"></div>
        <h2 className="border-l ps-4">{title}</h2>
      </td>
      <td>
        {error
          ? "--"
          : isLoading
            ? "..."
            : // : JSON.stringify(data)
              `${serviceCount ?? "--"}`}
      </td>
      <td></td>
      <td></td>
    </tr>
  );
}
