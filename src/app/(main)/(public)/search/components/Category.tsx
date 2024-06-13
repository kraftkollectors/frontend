import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams } from "@/hooks";

export default function Category() {
  const {params} = useChangeSearchParams();
  
  return (
    <div className="flex flex-col gap-2">
      <AppSelect name="category" value={params.get('category') ?? undefined} title="Category" options={['select a category',"category"]} />
      <AppSelect name="subCategory" value={params.get('subCategory') ?? undefined} title="Sub-Category" options={["Select A Subcategory", 'sub-cat2']} />
    </div>
  );
}
