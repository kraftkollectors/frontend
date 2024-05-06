"use client";

import { ReactNode } from "react";
import { Popover, Theme } from "@radix-ui/themes";
import Link from "next/link";
import { FaRegIdBadge, FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import paths from "@/utils/paths";

export type ProfileDropdownProps = {
  children: ReactNode;
};

export default function ProfileDropdown({ children }: ProfileDropdownProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="border">
        <div className="flex flex-col divide-y-2">
          {profilelinks.map((profilelink) => (
            <Link
              key={profilelink.href}
              href={profilelink.title}
              className={`flex gap-2 py-2 hover:text-primary items-center ${
                paths.dashboardLogout == profilelink.href
                  ? "text-red-700"
                  : "text-black-400"
              }`}
            >
              {profilelink.icon} {profilelink.title}
            </Link>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

const profilelinks = [
  {
    title: "Profile",
    icon: <FaRegUser />,
    href: paths.dashboard,
  },
  {
    title: "Become an artisan",
    icon: <FaRegIdBadge />,
    href: paths.becomeASeller,
  },
  {
    title: "Settings",
    icon: <IoSettingsOutline />,
    href: paths.dashboardSettings,
  },
  {
    title: "Log out",
    icon: <BiLogOut />,
    href: paths.dashboardLogout,
  },
];
