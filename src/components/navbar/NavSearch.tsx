import { FaMagnifyingGlass } from "react-icons/fa6";

export default function NavSearch() {
  return (
    <div className="relative flex items-center gap-2 p-1 rounded-md border ps-2 h-10 w-full">
      <FaMagnifyingGlass className="flex-shrink-0" />
      <input
        type="text"
        className="[border:1px_solid_transparent!important] [outline:1px_solid_transparent!important] [all:unset] [box-shadow:none!important] w-[100%!important] text-dark-gray  px-3 py-1 rounded-md "
        placeholder="Search..."
      />
      <button className="btn-primary-tiny px-3 h-full flex-shrink-0">
        Search
      </button>
    </div>
  );
}
