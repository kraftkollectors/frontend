import { Suspense } from "react";
import TableRow from "./TableRow";
import { dummyCategory, dummyCategory2 } from "@/utils/dummy";
import NewCategory from "./NewCategory";
import NewSubCategory from "./NewSubCategory";

export default function Table() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[800px] w-full rounded-md overflow-hidden app-table [&_tr]:border-b">
        <tbody>
          <tr className="bg-black-50 font-bold rounded-md rounded-br-md rounded-bl-md">
            <td className="py-2 !ps-12">Category name</td>
            <td>Total sub-categories</td>
            <td>Total services</td>
            <td></td>
          </tr>
          <tr>
            <td className="p-2"></td>
          </tr>
          <TableRow {...dummyCategory} />
          <TableRow {...dummyCategory2} />
        </tbody>
      </table>
      <Suspense>
        <NewCategory />
        <NewSubCategory />
      </Suspense>
    </div>
  );
}
