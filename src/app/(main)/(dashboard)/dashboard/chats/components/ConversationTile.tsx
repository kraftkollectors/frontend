"use client";

/* eslint-disable @next/next/no-img-element */
import paths from "@/utils/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ConversationTileProps = {
  id: string;
  name: string;
  img: string;
  message: string;
  datetime: string;
};

export function ConversationTile({
  id,
  name,
  message,
  img,
  datetime
}: ConversationTileProps) {
  const pathname = usePathname();
  const href = paths.dashboardSingleChat(id);
  const active = pathname.includes(href);

  return (
    <Link href={href}>
      <div
        className={`flex hover:bg-black-50 p-3 gap-3 items-start ${active
          ? "md:bg-primary-lightActive2 hover:bg-primary-lightActive2"
          : ""} `}
      >
        <img
          src={img}
          alt={name}
          title={`Conversation with ${name}`}
          className="rounded-full aspect-square size-12 flex-shrink-0"
        />
        <div className="w-full flex-shrink">
          <h1 className="font-semibold line-clamp-1">
            {name}
          </h1>
          <p className="line-clamp-2 overflow-ellipsis text-black-300 text-label">
            {message}
          </p>
        </div>
        <p className="whitespace-nowrap truncate flex-shrink-0 text-black-200 text-small">
          {datetime}
        </p>
      </div>
    </Link>
  );
}
