/* eslint-disable @next/next/no-img-element */
"use client";

import { fallbackImage } from "@/functions/helpers";
import { useUserStore } from "@/state";


export default function DashboardProfile() {
  const user = useUserStore((s) => s.user);
  return (
    <div className="flex flex-col gap-2 items-center py-4">
      <img
        src={fallbackImage(user?.image)}
        alt={user?.userName}
        height={124}
        width={124}
        className="rounded-full size-[124px] avatar object-cover profile-img"
      />
      <p className="font-semibold text-title">{user?.userName}</p>
      <p className="">{user?.email}</p>
    </div>
  );
}
