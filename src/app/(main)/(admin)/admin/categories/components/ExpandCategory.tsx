'use client'

import { useAdminStore } from "@/state";
import { FaChevronRight } from "react-icons/fa6";

export default function ExpandCategory({
    title,
    _id
}: {
    title: string;
    _id: string;
}) {
    const { openCategory, setOpenCategory } = useAdminStore(({ openCategory, setOpenCategory }) => ({ openCategory, setOpenCategory }))
    const isOpen = openCategory === _id;

    return (
        <button
            onClick={() => setOpenCategory(isOpen ? '' : _id)}
            className={`flex gap-2 items-center ${isOpen ? 'text-primary' : ''}`}>
            <div className="w-10 flex justify-center transition-all duration-500">
                <FaChevronRight className={`relative ${isOpen ? 'rotate-90' : ''}`} />
            </div>
            <h2>{title}</h2>
        </button>
    );
}