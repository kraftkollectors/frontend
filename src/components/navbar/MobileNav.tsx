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
import { debugLog, fallbackImage, fullName } from "@/functions/helpers";
import AppIcons from "../AppIcons";

export type MobileNavProps = {
  children: ReactNode;
};

export default function MobileNav({ children }: MobileNavProps) {
  const user = useUserStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useLayoutEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden">
        {children}
      </button>

      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-screen ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          className="relative h-full w-full bg-[#00000033]"
          onClick={() => setOpen(false)}
        ></div>
        <div
          className={`absolute -left-full top-0 h-full w-[90%] max-w-[300px] -translate-x-full bg-light ${
            open ? "!left-0 !translate-x-0" : "-translate-x-full"
          } flex flex-col gap-6 shadow transition-all delay-100 duration-500`}
        >
          <div className="flex justify-end p-1">
            <button
              className="icon-btn p-2 text-xl"
              onClick={() => setOpen(false)}
            >
              <IoClose />
            </button>
          </div>
          <div className="justify-cener flex w-full flex-col items-center p-2 pb-4">
            <img
              src={fallbackImage(user?.image)}
              alt={user?.userName}
              title={user?.userName}
              className="avatar profile-img size-24"
              height={96}
              width={96}
            />
            <h3 className="text-black-900">
              {fullName(user?.firstName, user?.lastName)}
            </h3>
            <p className="text-black-400">{user?.email}</p>
            <Link
              href={paths.premium}
              className="mt-2 flex items-center gap-1 rounded-[100px] bg-primary-lightActive2 px-3 py-1 font-semibold text-primary"
            >
              <AppIcons.Premium />
              <span>Upgrade account</span>
            </Link>
          </div>

          <div className="flex flex-col divide-y-2 px-4">
            {navLinks.map((navLink) => {
              if (user?.isArtisan && navLink.href == paths.becomeASeller)
                return null;
              return (
                <Link
                  key={navLink.href}
                  href={navLink.href}
                  className={`flex items-center gap-2.5 px-2 py-3 hover:text-primary ${
                    paths.dashboardLogout == navLink.href
                      ? "text-red-700"
                      : "text-black-400"
                  }`}
                >
                  {navLink.icon} {navLink.name}
                </Link>
              );
            })}
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
