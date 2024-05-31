/* eslint-disable @next/next/no-img-element */
"use client";
import { ReactNode, useLayoutEffect, useState } from "react";
import {
  FaIdBadge,
  FaRegEnvelope,
  FaRegHeart,
  FaRegIdBadge,
  FaRegUser,
} from "react-icons/fa6";
import Link from "next/link";
import paths from "@/utils/paths";
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { PiHeadsetBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/state";
import { debugLog } from "@/functions/helpers";

export type MobileNavProps = {
  children: ReactNode;
};

export default function MobileNav({ children }: MobileNavProps) {
  const user = useUserStore(s=>s.user);
  const [open, setOpen] = useState(false);
  const pathname = usePathname()
  useLayoutEffect(()=>{
    setOpen(false);
  }, [pathname])

  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden">
        {children}
      </button>

      <aside
        className={`fixed h-screen w-screen z-30 top-0 left-0 ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          className="h-full w-full relative bg-[#00000033]"
          onClick={() => setOpen(false)}
        ></div>
        <div
          className={`absolute h-full w-[90%] max-w-[300px] bg-light top-0 -left-full -translate-x-full ${
            open ? "!translate-x-0 !left-0" : "-translate-x-full"
          } flex flex-col gap-6 shadow transition-all duration-500 delay-100`}
        >
          <div className="flex justify-end">
            <button className="p-2 text-xl" onClick={() => setOpen(false)}>
              <IoClose />
            </button>
          </div>
          <div className="flex flex-col items-center justify-cener w-full pb-4 p-2">
            <img
              src="/images/auth-bg.png"
              alt={user?.userName}
              title={user?.userName}
              className="rounded-full size-16"
              height={64}
              width={64}
            />
            <p>{user?.userName}</p>
            <p>{user?.email}</p>
          </div>

          <div className="flex flex-col divide-y-2 px-4">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.href}
                href={navLink.href}
                className={`flex gap-2 py-2 hover:text-primary items-center p-2 ${
                  paths.dashboardLogout == navLink.href
                    ? "text-red-700"
                    : "text-black-400"
                }`}
              >
                {navLink.icon} {navLink.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

const navLinks = [
  {
    name: "Profile",
    icon: <FaRegUser />,
    href: paths.dashboard,
  },
  {
    name: "Messages",
    icon: <FaRegEnvelope />,
    href: paths.dashboardChats,
  },
  {
    name: "Saved",
    icon: <FaRegHeart />,
    href: paths.dashboardSaved,
  },
  {
    name: "Become an artisan",
    icon: <FaRegIdBadge />,
    href: paths.becomeASeller,
  },
  {
    name: "Settings",
    icon: <IoSettingsOutline />,
    href: paths.dashboardSettings,
  },
  {
    name: "Support",
    icon: <PiHeadsetBold />,
    href: paths.support,
  },
  {
    name: "Logout",
    icon: <BiLogOut />,
    href: paths.dashboardLogout,
  },
];
