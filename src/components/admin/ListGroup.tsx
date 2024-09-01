import Link from "next/link";
import { ReactNode } from "react";

export type ListGroupProps = {
    title: string;
    allUrl?: string;
    className?: string;
    children: ReactNode;
}

export default function ListGroup({
    title, allUrl = '', children, className = ''
}: ListGroupProps) {
    return (
        <div className={` p-4 rounded-md bg-light flex flex-col gap-3 ${className}`}>
            <div className="flex justify-between items-center">
                <h3 className="text-black-500 font-bold">{title}</h3>
                {
                    allUrl &&
                    <Link href={allUrl} className="hover:text-primary text-black-300 text-label font-semibold">View all</Link>
                }
            </div>
            <div className={`flex flex-col `}>
                {children}
            </div>
        </div>
    );
}