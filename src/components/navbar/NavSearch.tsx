import { CiSearch } from "react-icons/ci";
import AppIcons from "../AppIcons";
import SearchMobile from "./SearchMobile";
import { submitSearch } from "@/actions";
import { FormButton } from "../ui/FormButton";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import NavLocationSelector from "./LocationSelector";

export default function NavSearch() {
  const {query} = useParams();
  const q = typeof query == 'string' ? query : (query ?? []).join(' ')
  
  return (
    <div className="relative flex items-center gap-2 w-full">
      <form action={submitSearch} className="flex max-md:flex-col items-stretch flex-grow rounded-lg border border-black-50 overflow-hidden max-md:p-2 max-md:gap-2">
        <select name="type" id="" className="bg-[#F0F0F0] max-md:hidden focus:outline-none text-black-400 border-none outline-none font-semibold text-label">
          <option value="search">Services</option>
          <option value="artisans">Artisans</option>
        </select>
        <input
          type="text"
          className="[border:1px_solid_transparent!important] font-semibold text-label text-black-500 flex-grow [outline:1px_solid_transparent!important] [all:unset] [box-shadow:none!important] w-[100%!important] md:!px-3 py-1 rounded-md "
          placeholder="What are you looking for?"
          name="query"
          defaultValue={q}
        />
        <div className="max-md:self-center md:my-1 rounded max-md:h-[1px] md:w-[1px] w-[calc(100%-8px)] bg-black-100 md:bg-black-300"></div>
        <NavLocationSelector />
      </form>
      {/* <Suspense><SearchMobile /></Suspense> */}
    </div>
  );
}
