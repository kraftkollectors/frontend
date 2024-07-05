import Link, { LinkProps } from "next/link";
import { HTMLAttributeAnchorTarget, HTMLAttributes, ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa6";

export type ListTileProps = HTMLAttributes<HTMLAnchorElement> & LinkProps & {
    before: ReactNode;
    after?: ReactNode;
    children: ReactNode;
    target?: HTMLAttributeAnchorTarget;
}

export default function ListTile({
    children, before: prefix, className,after, ...props
}: ListTileProps) {
    return (
        <Link {...props} >
        <div className={`flex items-center gap-3 justify-stretch py-1 hover:bg-gradient-to-t from-[#00000011] rounded overflow-hidden to-transparent ${className}`}>
            {prefix}
            <div className="w-full flex-shrink grow">
                {children}
            </div>
            {after ?? <FaChevronRight className='text-[#292D32]' />}
        </div>
        </Link>
    );
}