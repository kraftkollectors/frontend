'use client'

import Image from "next/image";
import SidebarLink, { SidebarLinkProps } from "./SidebarLink";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";
import { AppLogo } from "@/components";
import { FaX } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        setOpen(false);
    }, [pathname]);
    
    return (
        <div className={`w-full flex flex-col gap-4 fixed md:sticky bg-light top-0 left-0 h-screen p-4 overflow-y-auto transition-transform ${open ? 'max-md:translate-x-0' : 'max-md:translate-x-[-110%]'}`}>
            <div className="flex justify-between items-center">
            <AppLogo />
            <button className="text-xl icon-btn md:hidden">
                <FaX />
            </button>
            </div>
            <div className="flex gap-2 border rounded-md p-2">
                <Image height={60} width={60} src="/images/user-avatar.png" alt="admin" className="avatar size-10" />
                <div>
                    <h2 className="text-black-500 font-semibold">email@admin.com</h2>
                    <p className="text-black-300 text-label">Admin User</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {
                    links.map(link =>
                        <SidebarLink
                            key={link.href}
                            {...link}
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
        title: "Feedback",
        icon: <AppIcons.AdminFeedback />,
        href: paths.adminFeedback,
    },
    {
        title: "Report",
        icon: <AppIcons.AdminReport />,
        href: paths.adminReports,
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