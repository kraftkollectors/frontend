import Link, { LinkProps } from "next/link";
import { HTMLAttributes } from "react";
import { FaChevronRight } from "react-icons/fa6";

export function ViewAll({className, ...props}: HTMLAttributes<HTMLAnchorElement> & LinkProps){
    return (
        <Link
        className={`${className} w-fit inline-flex gap-2 items-center text-black-500 text-label border-b border-transparent hover:border-primary hover:text-primary`}
        {...props}
            >
                <span>View all</span>
                <FaChevronRight />
            </Link>
    )
}