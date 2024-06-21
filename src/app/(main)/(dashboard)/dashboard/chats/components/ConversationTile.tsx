"use client";

import { formatChatDate } from "@/functions/date";
import { fallbackImage } from "@/functions/helpers";
/* eslint-disable @next/next/no-img-element */
import paths from "@/utils/paths";
import { ChatHead } from "@/utils/types/chat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

export type ConversationTileProps = ChatHead & HTMLAttributes<HTMLAnchorElement> & {
  isNew?: boolean;
};

export function ConversationTile({
  _id: id,
  userName: name,
  lastMessage: message,
  image: img,
  datetime,
  isNew = false,
  ...props
}: ConversationTileProps) {
  const pathname = usePathname();
  const href = paths.dashboardSingleChat(id);
  const active = pathname.includes(href);

  return (
    <Link href={href} {...props}>
      <div
        className={`flex hover:bg-black-50 p-3 gap-3 items-start ${active
          ? "md:bg-primary-lightActive2 hover:bg-primary-lightActive2"
          : ""} `}
      >
        <img
          src={fallbackImage(img)}
          alt={name}
          title={`Conversation with ${name}`}
          className="rounded-full aspect-square size-12 flex-shrink-0 avatar profile-img"
        />
        <div className="w-full flex-shrink">
          <h1 className="font-semibold line-clamp-1">
            {name}
          </h1>
          <p className="line-clamp-2 overflow-ellipsis text-black-300 text-label">
            {message}
          </p>
        </div>
        <p className="whitespace-nowrap truncate flex-shrink-0 text-black-200 text-small flex flex-col gap-4 items-end">
          <span>{datetime ? formatChatDate(datetime) : ''}</span>
          {isNew && <div className={`size-2 rounded-full bg-lime-600`}></div>}
        </p>
      </div>
    </Link>
  );
}
