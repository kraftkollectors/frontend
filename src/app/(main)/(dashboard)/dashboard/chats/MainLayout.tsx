"use client";

import { AppPageProps } from "@/utils/types/basicTypes";
import SideBar from "./SideBar";
import { usePathname } from "next/navigation";
import useWindowWidth from "@/hooks/useWindowWidth";
import paths from "@/utils/paths";
import Conversations from "./Conversations";

export default function MainLayout({ children }: AppPageProps) {
  const pathname = usePathname();
  const vw = useWindowWidth();

  return (
    <main className="app-container md:py-10 md:bg-light-text md:max-h-screen md:h-screen">
      <div className="md:grid md:grid-cols-10 gap-4 md:h-[calc(100vh-64px)] md:max-h-[calc(100vh-64px)]">
        {(pathname === paths.dashboardChats ||
          pathname === paths.dashboardChats + "/" ||
          vw >= 768) &&
          <div className="md:col-span-4 h-full max-h-full">
            <SideBar />
          </div>}
        {((!(
          pathname === paths.dashboardChats ||
          pathname === paths.dashboardChats + "/"
        ) &&
          vw < 768) ||
          vw >= 768) &&
          <div className="col-span-6 bg-light rounded-md md:border border-black-50  max-w-[700px] w-full h-full">
            {children}
          </div>}
      </div>
    </main>
  );
}
