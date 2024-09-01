import { Suspense } from "react";
import TableRow from "./TableRow";
import { dummyCategory, dummyCategory2 } from "@/utils/dummy";
import NewCategory from "./NewCategory";
import NewSubCategory from "./NewSubCategory";
import { fetchCategories } from "@/actions";
import { Pagination } from "@/components";

export default async function Table({query}:{query: string}) {
  const categories = await fetchCategories({ throwsError: false, params: query });
  if (categories === 'error' || !categories) throw new Error('Connection error | Failed to load Categories');
  
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
          {
            categories.existingRecords.length === 0 ? <tr><td colSpan={4}><div className="info-box">No categories found</div></td></tr> :
            categories.existingRecords.map(cat=><TableRow key={cat._id} {...cat} />)
          }
        </tbody>
      </table>
      <Pagination pagination={categories} />
      <Suspense>
        <NewCategory />
        <NewSubCategory />
      </Suspense>
    </div>
  );
}
