import { AppLogo } from "@/components";
import NavLinks from "./navbar/NavLinks";
import NavSearch from "./navbar/NavSearch";

export function Navbar() {
  return (
    <header className="flex flex-col gap-1 app-container w-full py-3 border-b-2">
      <div className="flex gap-5 justify-between items-center h-16">
        <AppLogo />
        <div className="max-md:hidden  md:w-5/12">
          <NavSearch />
        </div>
        <NavLinks />
      </div>
      <div className="md:hidden">
        <NavSearch />
      </div>
    </header>
  );
}
