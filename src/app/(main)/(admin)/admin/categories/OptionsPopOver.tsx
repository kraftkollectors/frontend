"use client"
import { FormButton } from "@/components";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";
import { Popover } from "@radix-ui/themes";
import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";
export default function OptionsPopOver({ _id: id, title }: { _id: string; title: string }) {
    return (
        <Popover.Root>
            <Popover.Trigger>
                <button className="icon-btn p-1">
                    <FaEllipsisVertical />
                </button>
            </Popover.Trigger>
            <Popover.Content>
                <div className="flex flex-col divide-y">
                    <Link href={paths.adminCategories + `?category=${title}&categoryId=${id}&action=new_subcategory`} className="flex gap-3 fony-semibold text-black-400 pb-1">Add sub-category + </Link>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}