"use client";

import { AppLayoutProps } from "@/utils/types/basicTypes";
import { usePathname } from "next/navigation";
import useWindowWidth from "@/hooks/useWindowWidth";
import paths from "@/utils/paths";
import { ReactNode } from "react";

export default function MainLayout({
  children,
  sideBar,
}: AppLayoutProps & {
  // chatHeads: Paginated<any>;
  sideBar: ReactNode;
}) {
  // const {} = useWS();

  const pathname = usePathname();
  const vw = useWindowWidth();
  const isMobile =
    pathname === paths.dashboardChats ||
    pathname === paths.dashboardChats + "/" ||
    vw >= 768;

  return (
    <main
      id="ChatView"
      className="md:app-container md:h-screen md:max-h-screen md:bg-light-text md:py-10"
    >
      <div className="gap-4 md:grid md:h-[calc(100vh-64px)] md:max-h-[calc(100vh-64px)] md:grid-cols-10">
        <div
          className={`h-full md:col-span-4 md:h-[calc(100vh-5rem)] ${isMobile ? "max-md:invisible" : ""}`}
        >
          {sideBar}
        </div>

        {((!(
          pathname === paths.dashboardChats ||
          pathname === paths.dashboardChats + "/"
        ) &&
          vw < 768) ||
          vw >= 768) && (
          <div className="col-span-6 h-screen w-full max-w-[700px] rounded-md border-black-50 bg-light md:h-[calc(100vh-5rem)] md:border">
            {children}
          </div>
        )}
      </div>
    </main>
  );
}
