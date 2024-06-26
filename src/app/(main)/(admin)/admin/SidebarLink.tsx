'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export type SidebarLinkProps = {
    title: string;
    icon: ReactNode;
    href: string;
}

export default function SidebarLink({ href, title, icon }: SidebarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname.startsWith(href);
    
    return (
        <Link href={href}
            className={`admin-side-link font-semibold ${isActive ? '' : '!bg-primary-lightActive2 !text-primary hover:text-primary'}`}
        >
            {icon}
            <span>{title}</span>
        </Link>
    );
}