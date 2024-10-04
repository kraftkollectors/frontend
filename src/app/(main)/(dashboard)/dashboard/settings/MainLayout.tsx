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
    <main className="app-container min-h-screen py-10 md:bg-light-text">
      <div className="gap-4 md:grid md:grid-cols-9">
        {(pathname === paths.dashboardSettings ||
          pathname === paths.dashboardSettings + "/" ||
          vw >= 768) && (
          <div className="md:col-span-2">
            <SideBar />
          </div>
        )}
        {((!(
          pathname === paths.dashboardSettings ||
          pathname === paths.dashboardSettings + "/"
        ) &&
          vw < 768) ||
          vw >= 768) &&
          (pathname === paths.dashboardSettingsAccountDeletion ? (
            children
          ) : (
            <div className="col-span-7 mx-auto w-full max-w-[700px] rounded-lg bg-light sm:p-6 md:shadow-[0_0_40px_5px_#358FAB14]">
              {children}
            </div>
          ))}
      </div>
    </main>
  );
}
