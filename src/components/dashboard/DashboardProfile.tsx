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
        className="rounded-full size-16 object-cover"
      />
      <p className="font-semibold text-title">{user?.userName}</p>
      <p className="">{user?.email}</p>
    </div>
  );
}
