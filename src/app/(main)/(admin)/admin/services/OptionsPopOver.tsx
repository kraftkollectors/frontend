"use client"
import { FormButton } from "@/components";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";
import { Popover } from "@radix-ui/themes";
import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { useDisableOrEnableService } from "@/hooks";
import { AdminAuth } from "@/components/admin";



export default function OptionsPopOver({id, active}:{id: string; active:boolean}) {
    const {action, enabled} = useDisableOrEnableService(active);
    
    return (
        <Popover.Root>
            <Popover.Trigger>
                <button className="icon-btn p-1">
                <FaEllipsisVertical />
                </button>
            </Popover.Trigger>
            <Popover.Content>
                <div className="flex flex-col divide-y font-semibold">
                    <Link href={paths.service(id)} target="_blank" className="flex gap-3 justify-between w-full text-black-400 pb-1">View Details <AppIcons.ExternalLink/> </Link>
                    <form action={action}>
                        <FormButton className="flex items-center justify-between w-full text-[#BE2828] gap-3 pt-1">
                            <span>{!enabled ? "Unblock" : "Block"}</span>
                            {!enabled ? <CgUnblock /> : <MdOutlineBlock />}
                        </FormButton>
                        <input type="hidden" name="serviceId" value={id} />
                        <input type="hidden" name="enable" value={`${!enabled}`} />
                        <AdminAuth />
                    </form>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}