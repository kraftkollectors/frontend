"use client"

import { FormButton } from "@/components";
import { AdminAuth } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { useChangeSearchParams } from "@/hooks";
import { Popover } from "@radix-ui/themes";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import { useDeleteFeedback } from "./hooks";
export default function OptionsPopOver({ id }: { id: string }) {
    const { pushParams } = useChangeSearchParams();
    const deleteAction = useDeleteFeedback();

    return (
        <Popover.Root>
            <Popover.Trigger>
                <button className="icon-btn p-1">
                    <FaEllipsisVertical />
                </button>
            </Popover.Trigger>
            <Popover.Content>
                <div className="flex flex-col divide-y font-semibold">
                    <button onClick={() => pushParams({
                        feedbackId: id,
                    })} className="flex gap-3 text-black-400 pb-1">Open <AppIcons.ExternalLink /> </button>
                    <form action={deleteAction}>
                        <FormButton className="flex items-center justify-between text-[#BE2828] gap-3 pt-1">Delete<MdOutlineBlock />
                        </FormButton>
                        <AdminAuth />
                        <input type="hidden" name="feedbackId" value={id} />
                    </form>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}