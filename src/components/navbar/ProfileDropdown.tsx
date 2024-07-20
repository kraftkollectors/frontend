"use client";

import { ReactNode } from "react";
import { Popover, Theme } from "@radix-ui/themes";
import Link from "next/link";
import { FaRegIdBadge, FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import paths from "@/utils/paths";
import { useUserStore } from "@/state";
import AppIcons from "../AppIcons";

export type ProfileDropdownProps = {
  children: ReactNode;
};

export default function ProfileDropdown({ children }: ProfileDropdownProps) {
  // const artisan = useUserStore(s=>s.artisan);
  const user = useUserStore((s) => s.user);

  return (
    <Popover.Root>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="border">
        <div className="flex flex-col divide-y-2">
          {profilelinks.map((profilelink) => {
            if (user?.isArtisan && profilelink.href == paths.becomeASeller)
              return null;
            if (
              user?.paymentPlan.trim() == "" &&
              profilelink.href == paths.premium
            )
              return null;
            return (
              <Link
                key={profilelink.href}
                href={profilelink.href}
                className={`flex items-center gap-2 py-2 hover:text-primary ${
                  paths.dashboardLogout == profilelink.href
                    ? "text-red-700"
                    : paths.premium == profilelink.href
                      ? "text-primary"
                      : "text-black-400"
                }`}
              >
                {profilelink.icon} {profilelink.title}
              </Link>
            );
          })}
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
    title: "Upgrade Account",
    icon: <AppIcons.Premium />,
    href: paths.premium,
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
