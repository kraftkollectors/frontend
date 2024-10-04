"use client";

import { useUserStore } from "@/state";
import paths from "@/utils/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
  const artisan = useUserStore(s=>s.artisan);

  return (
    <div className="flex flex-col gap-1">
      {[...links, ...(artisan ? artisanLinks : [])].map(({ title, href }, i) => {
        const active =
          pathname.includes(href) ||
          (i == 0 && pathname === paths.dashboardSettings) ||
          (i == 0 && pathname === paths.dashboardSettings + "/");
          const isRed = href === paths.dashboardSettingsAccountDeletion;
        return (
          <Link
            key={href}
            className={`block p-3 rounded hover:bg-primary-lightActive 
              ${ active ? "md:bg-primary-lightActive2 md:font-semibold" : "" }
              ${ isRed ? "text-danger !md:bg-[#ECE1E0] hover:bg-[#ECE1E0]" : "" }
              `}
            href={href}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
}

const artisanLinks = [
  {
    title: "Artisan Profile",
    href: paths.dashboardSettingsAccount,
  },
  {
    title: "Contact Information",
    href: paths.dashboardSettingsContactInfo,
  },
]

const links = [
  {
    title: "Personal Details",
    href: paths.dashboardSettingsPersonalDetails,
  },
  {
    title: "Profile Photo",
    href: paths.dashboardSettingsPhoto,
  },
  {
    title: "Change Password",
    href: paths.dashboardSettingsPassword,
  },
 
  {
    title: "Manage Notification",
    href: paths.dashboardSettingsNotification,
  },
  {
    title: "Account Deletion",
    href: paths.dashboardSettingsAccountDeletion,
  },
];
