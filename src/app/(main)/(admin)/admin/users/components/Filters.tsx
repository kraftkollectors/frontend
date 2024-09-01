'use client'
import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams } from "@/hooks";
import { ADMIN_USERS_FILTERS, ADMIN_USERS_SORT } from "@/utils/constants";

export default function Filters() {
  const { params, pushParams } = useChangeSearchParams();

  return (
    <div className="flex gap-3 [&_select]:!py-1.5">
      <AppSelect
        value={params.get('artisanOnly') ?? ''}
        name="filter"
        options={ADMIN_USERS_FILTERS}
        onChange={(e) => pushParams({ artisanOnly: e })}
      />
      <AppSelect
        value={params.get('sort') ?? "date"}
        name="sort"
        options={ADMIN_USERS_SORT}
        onChange={(e) => pushParams({ sort: e })}
      />
    </div>
  );
}