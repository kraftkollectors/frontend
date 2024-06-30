"use client"

import { FormButton } from "@/components";
import AppIcons from "@/components/AppIcons";
import { useChangeSearchParams } from "@/hooks";
import { Popover } from "@radix-ui/themes";
import { FaEllipsisVertical } from "react-icons/fa6";
export default function OptionsPopOver({ id }: { id: string }) {
    const { pushParams } = useChangeSearchParams();

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
                        advertId: id,
                    })} className="flex gap-3  text-black-400 pb-1 justify-between">Edit <AppIcons.EditPencil /> </button>
                    <form action="">
                        <FormButton className="flex items-center text-[#BE2828] gap-3 pt-1 justify-between">Delete <AppIcons.Delete />
                        </FormButton>
                    </form>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}