"use client";

import { AppLayoutProps } from "@/utils/types/basicTypes";
import SideBar from "./SideBar";
import { usePathname } from "next/navigation";
import useWindowWidth from "@/hooks/useWindowWidth";
import paths from "@/utils/paths";

export default function MainLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const vw = useWindowWidth();

  return (
    <main className="app-container py-10 min-h-screen md:bg-light-text">
      <div className="md:grid md:grid-cols-9 gap-4">
        {(pathname === paths.dashboardSettings ||
          pathname === paths.dashboardSettings + "/" ||
          vw >= 768) &&
          <div className="md:col-span-2">
            <SideBar />
          </div>}
        {((!(
          pathname === paths.dashboardSettings ||
          pathname === paths.dashboardSettings + "/"
        ) &&
          vw < 768) ||
          vw >= 768) &&
          <div className="col-span-7 bg-light rounded-md md:shadow-xl sm:p-6 max-w-[700px] mx-auto w-full">
            {children}
          </div>}
      </div>
    </main>
  );
}
