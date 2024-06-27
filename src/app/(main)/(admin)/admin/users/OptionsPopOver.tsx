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
                    <Link href={paths.adminSingleUser(id)} className="flex gap-3 fony-semibold text-black-400 pb-1">View details <AppIcons.ExternalLink/> </Link>
                  <form action="">
                  <FormButton className="flex items-center text-[#BE2828] gap-3 pt-1">Block account <MdOutlineBlock />
                  </FormButton>
                  </form>


                </div>
            </Popover.Content>
        </Popover.Root>
    );
}