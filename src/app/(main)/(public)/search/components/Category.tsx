'use client'

import AppSelect from "@/components/ui/AppSelect";
import { useCategories, useChangeSearchParams } from "@/hooks";

export default function Category() {

  const { params } = useChangeSearchParams();
  const { data, isLoading, error, cats, subCats, selectedCat, onCatChange, key } = useCategories({
    addAll: true
  });
  
  return (
    <div
        key={key} className="flex flex-col gap-2">
      <AppSelect
        name="category"
        value={selectedCat}
        title="Category"
        onChange={onCatChange}
        readonly={isLoading || !!error || !data}
        options={cats} />
      <AppSelect
        name="subCategory"
        value={params.get('subCategory') ?? ''}
        title="Sub-Category"
        readonly={isLoading || !!error || !data}
        options={subCats} />
    </div>
  );
}
