import Link from "next/link";
import { ReactNode } from "react";

export type SidebarLinkProps = {
    title: string;
    icon: ReactNode;
    href: string;
}

export default function SidebarLink({ href, title, icon }: SidebarLinkProps) {
    return (
        <Link href={href}
            className="admin-side-link"
        >
            {icon}
            <span>{title}</span>
        </Link>
    );
}