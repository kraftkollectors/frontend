"use client";
import useWindowWidth from "@/hooks/useWindowWidth";
import paths from "@/utils/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashBoardNav() {
  const path = usePathname();
  const vw = useWindowWidth();

  return (
    <div className="flex gap-4 pt-2 px-2 max-md:justify-between">
      {services.map((service) => {
        const isActive = path == service.href;
        const isMobile = vw <= 768;
        const hideProfile = !isMobile && service.href == paths.dashboard;
        const servicesActive =
          !isMobile &&
          path == paths.dashboard &&
          service.href == paths.dashboardServices;

        if (!hideProfile)
          return (
            <Link
              className={`border-b-2 ${
                isActive || servicesActive
                  ? " border-primary font-semibold"
                  : "border-transparent"
              }`}
              key={service.href}
              {...service}
            >
              {service.title}
            </Link>
          );
      })}
    </div>
  );
}

const services = [
  {
    title: "Profile Info",
    href: paths.dashboard,
  },
  {
    title: "Services",
    href: paths.dashboardServices,
  },
  {
    title: "Reviews",
    href: paths.dashboardReviews,
  },
  {
    title: "Saved",
    href: paths.dashboardSaved,
  },
];
