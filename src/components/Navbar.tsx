"use client";
import { AppLogo } from "@/components";
import NavLinks from "./navbar/NavLinks";
import NavSearch from "./navbar/NavSearch";
import { usePathname } from "next/navigation";
import { Suspense, useLayoutEffect, useState } from "react";
import paths from "@/utils/paths";
import { FaBars } from "react-icons/fa6";
import MobileNav from "./navbar/MobileNav";
import { useUserStore } from "@/state";
import Link from "next/link";
import { useUpdateOnline } from "@/hooks";
import { debugLog } from "@/functions/helpers";

const search = (
  <Suspense>
    <NavSearch />
  </Suspense>
);
export function Navbar() {
  useUpdateOnline();
  const user = useUserStore((s) => s.user);
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useLayoutEffect(() => {
    if (pathname.includes(paths.dashboardSingleChat(""))) setShow(false);
    else setShow(true);

    const p = pathsToHideSearch.map((_) => pathname.includes(_));
    if (pathname == paths.home || p.includes(true)) setShowSearch(false);
    else setShowSearch(true);
  }, [pathname]);

  return (
    <header
      className={`app-container flex w-full flex-col gap-1 border-b border-black-50 py-3 ${
        show ? "" : "max-md:hidden"
      }`}
    >
      <div className="flex h-12 items-center justify-between gap-5 md:h-12">
        <AppLogo />
        {pathname !== paths.home && (
          <div className="max-md:hidden md:w-5/12">{search}</div>
        )}
        {!!user ? (
          <div>
            <NavLinks />
            <MobileNav>
              <FaBars />
            </MobileNav>
          </div>
        ) : (
          <nav className="flex gap-2">
            <Link href={paths.login} className="btn-transparent-tiny px-4">
              Log in
            </Link>
            <Link
              href={paths.signup}
              className="btn-primary-border px-4 max-md:hidden"
            >
              Sign Up
            </Link>
          </nav>
        )}
      </div>
      <div className={`md:hidden ${showSearch ? "" : "hidden"}`}>{search}</div>
    </header>
  );
}

const pathsToHideSearch = [
  paths.dashboardChats,
  paths.dashboardSettings,
  paths.dashboardNewService,
  paths.login,
  paths.signup,
  paths.forgotPassword,
  paths.resetPassword,
  // paths.dashboardSingleChat("")
];
