import { getCurrentTime } from "@/functions/date";
import { Artisan } from "@/utils/types/artisan";
import { Dialog } from "@radix-ui/themes";
import { ReactNode } from "react";

export default function ArtisanNotAvailableModal({ showContact, workHourFrom, workHourTo, available, children }: Artisan & { children: ReactNode }) {
    const [hours, minutes] = getCurrentTime().split(':').map(i => parseInt(i));
    const from = workHourFrom.length < 3 ? null : workHourFrom.split(':').map(i => parseInt(i));
    const to = workHourTo.length < 3 ? null : workHourTo.split(':').map(i => parseInt(i));
    let isAvailable = available;
    if (from && to) {
        if (hours < from[0] || (hours == from[0] && minutes < from[1])) {
            isAvailable = false;
        } else if (hours > to[0] || (hours == to[0] && minutes > to[1])) {
            isAvailable = false;
        }
    }

    return (
        (isAvailable || showContact) && available ?
            children :
            <Dialog.Root>
                <Dialog.Trigger>
                    <div className="relative [&>*]:w-full">
                        {children}
                        <div className="absolute top-0 left-0 h-full w-full bg-transparent"></div>
                    </div>
                </Dialog.Trigger>
                <Dialog.Content style={{
                    width: 280,
                }}>
                    <div className="flex flex-col gap-4 p-4">
                        <p className="text-black-400 font-semibold text-center">this user is unavailable</p>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
    );
}