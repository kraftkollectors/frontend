"use client";
import { AppLogo } from "@/components";
import NavLinks from "./navbar/NavLinks";
import NavSearch from "./navbar/NavSearch";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import paths from "@/utils/paths";
import { FaBars } from "react-icons/fa6";
import MobileNav from "./navbar/MobileNav";
import { useUserStore } from "@/state";
import Link from "next/link";
import { useUpdateOnline } from "@/hooks";

export function Navbar() {
  useUpdateOnline();
  const user = useUserStore(s=>s.user);
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
      <div className="flex gap-5 justify-between items-center h-12 md:h-12">
        <AppLogo />
        <div className="max-md:hidden  md:w-5/12">
          <NavSearch />
        </div>
       {
        !!user ?
        <>
         <NavLinks />
        <MobileNav>
          <FaBars />
        </MobileNav>
        </> : 
        <nav className="flex gap-2">
          <Link href={paths.login} className="btn-primary px-4">Login</Link>
          <Link href={paths.signup} className="btn-primary-border px-4 max-md:hidden">Sign Up</Link>
        </nav>
       }
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
