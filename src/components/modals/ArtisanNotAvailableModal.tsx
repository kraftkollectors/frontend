import { formatTime, getCurrentTime } from "@/functions/date";
import { Artisan } from "@/utils/types/artisan";
import { Dialog } from "@radix-ui/themes";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

export default function ArtisanNotAvailableModal({
  showContact,
  workHourFrom,
  workHourTo,
  available,
  children,
}: Artisan & { children: ReactNode }) {
  const [hours, minutes] = getCurrentTime()
    .split(":")
    .map((i) => parseInt(i));
  const from =
    workHourFrom.length < 3
      ? null
      : workHourFrom.split(":").map((i) => parseInt(i));
  const to =
    workHourTo.length < 3
      ? null
      : workHourTo.split(":").map((i) => parseInt(i));
  let isAvailable = available;
  if (from && to) {
    if (hours < from[0] || (hours == from[0] && minutes < from[1])) {
      isAvailable = false;
    } else if (hours > to[0] || (hours == to[0] && minutes > to[1])) {
      isAvailable = false;
    }
  }

  return (isAvailable || showContact) && available ? (
    children
  ) : (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="relative [&>*]:w-full">
          {children}
          <div className="absolute left-0 top-0 h-full w-full bg-transparent"></div>
        </div>
      </Dialog.Trigger>
      <Dialog.Content
        style={{
          width: 300,
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Dialog.Close>
              <button className="icon-btn p-1">
                <IoClose />
              </button>
            </Dialog.Close>
          </div>
          <h2 className="text-center text-title font-bold text-secondary">
            Unavailable
          </h2>
          <p className="text-label font-semibold text-black-300">
            This user is not available for calls right now.
            {available && (
              <>
                They are available from
                <span className="text-black-900">
                  {formatTime(workHourFrom)}
                </span>
                to
                <span className="text-black-900">
                  {" "}
                  {formatTime(workHourTo)}
                </span>
                .
              </>
            )}
            <br />
            <br />
            You can leave a message for them to get back to you.
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
