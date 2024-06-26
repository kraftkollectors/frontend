import Image from "next/image";
import SidebarLink, { SidebarLinkProps } from "./SidebarLink";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";

export default function Sidebar() {
    return (
        <div className="w-full flex flex-col gap-4 sticky top-0 left-0 h-screen">
            <div className="flex gap-2 border rounded-md p-4">
                <Image height={60} width={60} src="/images/user-avatar.png" alt="admin" className="avatar size-14" />
                <div>
                    <h2 className="text-black-500 font-semibold">email@admin.com</h2>
                    <p className="text-black-300 text-label"></p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <SidebarLink
                    icon={links[0].icon}
                    title={links[0].title}
                    href={links[0].href}
                />

                {
                    links.splice(1).map(link =>
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
        title: "Users",
        icon: <AppIcons.AdminUsers />,
        href: paths.adminUsers,
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
]