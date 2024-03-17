import { FaMagnifyingGlass } from "react-icons/fa6";

export default function NavSearch() {
  return (
    <div className="relative flex items-center gap-2 p-1 rounded-md border ps-2 h-10 w-full md:w-5/12">
      <FaMagnifyingGlass className="flex-shrink-0" />
      <input
        type="text"
        className="outline-none w-full text-dark-gray"
        placeholder="Search..."
      />
      <button className="btn-primary-tiny px-3 h-full flex-shrink-0">
        Search
      </button>
    </div>
  );
}
