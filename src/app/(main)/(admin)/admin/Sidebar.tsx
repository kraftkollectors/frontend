import Image from "next/image";
import SidebarLink, { SidebarLinkProps } from "./SidebarLink";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";
import { AppLogo } from "@/components";

export default function Sidebar() {
    return (
        <div className="w-full flex flex-col gap-4 sticky top-0 left-0 h-screen p-4 overflow-y-auto">
            <AppLogo />
            <div className="flex gap-2 border rounded-md p-2">
                <Image height={60} width={60} src="/images/user-avatar.png" alt="admin" className="avatar size-10" />
                <div>
                    <h2 className="text-black-500 font-semibold">email@admin.com</h2>
                    <p className="text-black-300 text-label">Admin User</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {
                    links.slice(0, 2).map(link =>
                        <SidebarLink
                            key={link.href}
                            icon={link.icon}
                            title={link.title}
                            href={link.href}
                        />
                    )
                }



                {
                    links.slice(2).map(link =>
                        <SidebarLink
                            key={link.href}
                            icon={link.icon}
                            title={link.title}
                            href={link.href}
                        />
                    )
                }
            </div>
        </div>
    );
}


const links: SidebarLinkProps[] = [
    {
        title: "Overview",
        icon: <AppIcons.AdminOverview />,
        href: paths.admin,
    },
    {
        title: "Users",
        icon: <AppIcons.AdminUsers />,
        href: paths.adminUsers,
    },
    {
        title: "Services",
        icon: <AppIcons.AdminServices />,
        href: paths.adminServices,
    },
    {
        title: "Categories",
        icon: <AppIcons.AdminCategories />,
        href: paths.adminCategories,
    },
    {
        title: "Payments",
        icon: <AppIcons.AdminPayments />,
        href: paths.adminPayments,
    },
    {
        title: "Adverts",
        icon: <AppIcons.AdminAdverts />,
        href: paths.adminAdverts,
    },
    {
        title: "Settings",
        icon: <AppIcons.AdminSettings />,
        href: paths.adminSettings,
    },
    {
        className: "admin-side-link-logout mt-10",
        title: "Log out",
        icon: <AppIcons.AdminLogout />,
        href: paths.adminLogout,
    },
]