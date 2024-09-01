"use client";
import { useChangeSearchParams } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";

export default function SearchTypeSelect() {
  const { push } = useRouter();
  const pathname = usePathname();
  const { params } = useChangeSearchParams();

  return (
    <select
      defaultValue={pathname.startsWith("/artisan") ? "/artisan" : "/search"}
      onChange={(e) => push(`${e.target.value}/${params.get("q") ?? ""}`)}
      className="filter-btn !border-black-50 text-center"
    >
      <option value="/search">Services</option>
      <option value="/artisan">Artisans</option>
    </select>
  );
}
