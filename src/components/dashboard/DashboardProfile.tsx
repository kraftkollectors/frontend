/* eslint-disable @next/next/no-img-element */
"use client";

import { useUserStore } from "@/state";

export type DashboardProfileProps = {
  image: string;
  fullName: string;
  email: string;
};

export default function DashboardProfile(props: DashboardProfileProps) {
  const user = useUserStore((s) => s.user);
  return (
    <div className="flex flex-col gap-2 items-center py-4">
      <img
        src={props.image}
        alt=""
        className="rounded-full size-16 object-cover"
      />
      <p className="font-semibold text-title">{user?.username}</p>
      <p className="">{props.email}</p>
    </div>
  );
}
