import { Category } from "@/utils/types/category";
import SubCategoryRowGroup from "./SubCategoryRowGroup";
import SubCategoryRow from "./components/SubCategoryRow";
import ExpandCategory from "./components/ExpandCategory";
import OptionsPopOver from "./OptionsPopOver";
import { Suspense } from "react";

export default function TableRow({
  _id,
  title,
  serviceCount: servicesCount,
  subcategories: subCategories
}: Category) {
  return (
    <>
      <tr className=" text-black-400 font-semibold text-label bg-light first-of-type:bg-red-400 typ">
        <td className="py-1">
          <ExpandCategory title={title} _id={_id} />
        </td>
        <td>
          {subCategories.length}
        </td>

        <td className="py-1">{servicesCount}</td>
        <td className="py-1">
          <Suspense><OptionsPopOver {...{_id, title}} /></Suspense>
        </td>
      </tr>
      <SubCategoryRowGroup id={_id}>
      {subCategories.map((subCategory) => (
          <SubCategoryRow key={subCategory._id} {...subCategory} />
        ))}
      </SubCategoryRowGroup>
    </>
  );
}
