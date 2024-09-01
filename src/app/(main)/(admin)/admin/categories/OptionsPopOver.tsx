"use client"

import { useChangeSearchParams } from "@/hooks";
import { Popover } from "@radix-ui/themes";
import { FaEllipsisVertical } from "react-icons/fa6";
export default function OptionsPopOver({ _id: id, title }: { _id: string; title: string }) {
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
                    <button
                        onClick={() => pushParams({
                            category: title,
                            categoryId: id,
                            action: 'new_subcategory'
                        })}
                        className="flex gap-3 text-black-400 pb-1">Add sub-category + </button>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}