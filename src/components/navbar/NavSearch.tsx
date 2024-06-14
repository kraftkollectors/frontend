import { CiSearch } from "react-icons/ci";
import AppIcons from "../AppIcons";
import SearchMobile from "./SearchMobile";
import { submitSearch } from "@/actions";
import { FormButton } from "../ui/FormButton";
import { Suspense } from "react";
import { useParams } from "next/navigation";

export default function NavSearch() {
  const {query} = useParams();
  const q = typeof query == 'string' ? query : (query ?? []).join(' ')
  
  return (
    <div className="relative flex items-center gap-2 w-full">
      <form action={submitSearch} className="flex gap-2 items-center flex-grow rounded-md border p-1 ps-2 ">
        <CiSearch className="flex-shrink-0" />
        <input
          type="text"
          className="[border:1px_solid_transparent!important] flex-grow [outline:1px_solid_transparent!important] [all:unset] [box-shadow:none!important] w-[100%!important] text-dark-gray  px-3 py-1 rounded-md "
          placeholder="Search..."
          name="query"
          defaultValue={q}
        />
        <FormButton className="btn-primary-tiny px-3 py-1 h-full flex-shrink-0 max-md:hidden">
          Search
        </FormButton>
      </form>
      <Suspense><SearchMobile /></Suspense>
    </div>
  );
}
