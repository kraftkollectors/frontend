"use client";
import { AppLogo } from "@/components";
import NavLinks from "./navbar/NavLinks";
import NavSearch from "./navbar/NavSearch";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import paths from "@/utils/paths";

export function Navbar() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [showSearch, setShowSearch] = useState(true);

  useLayoutEffect(() => {
    if (pathname.includes(paths.dashboardSingleChat(""))) {
      setShow(false);
    } else {
      setShow(true);
    }

    const p = pathsToHideSearch.map((_) => pathname.includes(_));
    if (p.includes(true)) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [pathname]);

  return (
    <header
      className={`flex flex-col gap-1 app-container w-full py-3 border-b-2 ${
        show ? "" : "max-md:hidden"
      }`}
    >
      <div className="flex gap-5 justify-between items-center h-12 md:h-16">
        <AppLogo />
        <div className="max-md:hidden  md:w-5/12">
          <NavSearch />
        </div>
        <NavLinks />
      </div>
      <div className={`md:hidden ${showSearch ? "" : "hidden"}`}>
        <NavSearch />
      </div>
    </header>
  );
}

const pathsToHideSearch = [
  paths.dashboardChats,
  paths.dashboardSettings,
  paths.dashboardNewService,
];
