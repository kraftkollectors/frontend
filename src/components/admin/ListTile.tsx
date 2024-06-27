import Link, { LinkProps } from "next/link";
import { HTMLAttributes, ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa6";

export type ListTileProps = HTMLAttributes<HTMLAnchorElement> & LinkProps & {
    before: ReactNode;
    children: ReactNode;
}

export default function ListTile({
    children, before: prefix, className, ...props
}: ListTileProps) {
    return (
        <Link {...props}>
        <div className={`flex items-center gap-3 justify-stretch py-1 hover:bg-gradient-to-t from-[#00000011] rounded overflow-hidden to-transparent ${className}`}>
            {prefix}
            <div className="w-full flex-shrink grow">
                {children}
            </div>
            <FaChevronRight className='text-[#292D32]' />
        </div>
        </Link>
    );
}