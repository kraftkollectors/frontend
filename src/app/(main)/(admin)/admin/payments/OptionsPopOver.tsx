"use client"
import { FormButton } from "@/components";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";
import { Popover } from "@radix-ui/themes";
import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
export default function OptionsPopOver({id}:{id: string}) {
    return (
        <Popover.Root>
            <Popover.Trigger>
                <button className="icon-btn p-1">
                <FaEllipsisVertical />
                </button>
            </Popover.Trigger>
            <Popover.Content>
                <div className="flex flex-col divide-y">
                    <button className="flex gap-3 fony-semibold pb-1 items-center text-[#BE2828]">Disable<MdOutlineBlock /> Re-activate <AppIcons.ReActivate/> </button>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}