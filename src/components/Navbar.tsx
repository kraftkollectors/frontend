import { AppLogo } from "@/components";
import NavLinks from "./navbar/NavLinks";
import NavSearch from "./navbar/NavSearch";

export function Navbar() {
  return (
    <header className="flex gap-5 justify-between items-center h-16 app-container w-full py-3 border-b-2">
      <AppLogo />
      <NavSearch />
      <NavLinks />
    </header>
  );
}
