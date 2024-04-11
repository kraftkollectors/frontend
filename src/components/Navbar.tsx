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

  useLayoutEffect(
    () => {
      if (pathname.includes(paths.dashboardSingleChat(""))) {
        setShow(false);
      } else {
        setShow(true);
      }
    },
    [pathname]
  );

  return (
    <header
      className={`flex flex-col gap-1 app-container w-full py-3 border-b-2 ${show
        ? ""
        : "max-md:hidden"}`}
    >
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
