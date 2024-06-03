"use client";

import paths from "@/utils/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { title } from "process";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {links.map(({ title, href }, i) => {
        const active =
          pathname.includes(href) ||
          (i == 0 && pathname === paths.dashboardSettings) ||
          (i == 0 && pathname === paths.dashboardSettings + "/");
        return (
          <Link
            key={href}
            className={`block p-3 rounded hover:bg-primary-lightActive ${
              active ? "md:bg-primary-lightActive2 md:font-semibold" : ""
            }`}
            href={href}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
}

const links = [
  {
    title: "Personal Details",
    href: paths.dashboardSettingsPersonalDetails,
  },
  {
    title: "Change Password",
    href: paths.dashboardSettingsPassword,
  },
  {
    title: "Artisan Profile",
    href: paths.dashboardSettingsAccount,
  },
  {
    title: "Contact Information",
    href: paths.dashboardSettingsContactInfo,
  },
  {
    title: "Manage Notification",
    href: paths.dashboardSettingsNotification,
  },
];
