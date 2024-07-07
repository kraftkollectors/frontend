"use client"
import { FormButton } from "@/components";
import { AdminAuth } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { useDisableOrEnableUser } from "@/hooks";
import { paths } from "@/utils";
import { Popover } from "@radix-ui/themes";
import Link from "next/link";
import { CgUnblock } from "react-icons/cg";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
export default function OptionsPopOver({ id, active }: { id: string; active: boolean }) {
    const { enabled, action } = useDisableOrEnableUser(active);

    return (
        <Popover.Root>
            <Popover.Trigger>
                <button className="icon-btn p-1">
                    <FaEllipsisVertical />
                </button>
            </Popover.Trigger>
            <Popover.Content>
                <div className="flex flex-col divide-y">
                    <Link href={paths.adminSingleUser(id)} className="flex justify-between w-full gap-3 fony-semibold text-black-400 pb-1">View details <AppIcons.ExternalLink /> </Link>
                    <form action={action}>
                        <FormButton className="flex items-center justify-between w-full text-[#BE2828] gap-3 pt-1">
                            <span>{!enabled ? "Unblock Account" : "Block Account"}</span>
                            {!enabled ? <CgUnblock /> : <MdOutlineBlock />}
                        </FormButton>
                        <input type="hidden" name="userId" value={id} />
                        <input type="hidden" name="enable" value={`${!enabled}`} />
                        <AdminAuth />
                    </form>


                </div>
            </Popover.Content>
        </Popover.Root>
    );
}