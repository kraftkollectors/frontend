"use client";

import AppIcons from "@/components/AppIcons";
import { formatChatDate } from "@/functions/date";
import { fallbackImage, fullName } from "@/functions/helpers";
/* eslint-disable @next/next/no-img-element */
import paths from "@/utils/paths";
import { ChatHead } from "@/utils/types/chat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

export type ConversationTileProps = ChatHead &
  HTMLAttributes<HTMLAnchorElement> & {
    isNew?: boolean;
  };

export function ConversationTile({
  _id: id,
  firstName,
  lastName,
  lastMessage: message,
  image: img,
  lastMessageTime: datetime,
  isNew = false,
  messageDoc,
  ...props
}: ConversationTileProps) {
  const pathname = usePathname();
  const href = paths.dashboardSingleChat(id);
  const active = pathname.includes(href);
  const name = fullName(firstName, lastName);
  const status = messageDoc.status;

  return (
    <Link href={href} {...props}>
      <div
        className={`flex items-start gap-3 p-3 hover:bg-black-50 ${
          active
            ? "hover:bg-primary-lightActive2 md:bg-primary-lightActive2"
            : ""
        } `}
      >
        <img
          src={fallbackImage(img)}
          alt={name}
          title={`Conversation with ${name}`}
          className="avatar profile-img aspect-square size-12 flex-shrink-0 rounded-full"
        />
        <div className="w-full flex-shrink">
          <h3 className="line-clamp-1 font-semibold">{name}</h3>
          <p className="line-clamp-2 overflow-ellipsis text-label text-black-300">
            {message}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end gap-2 truncate whitespace-nowrap text-small text-black-200">
          <span>{datetime ? formatChatDate(datetime) : ""}</span>
          {isNew ? (
            <div className={`size-2 rounded-full bg-lime-600`}></div>
          ) : (
            <span>
              {status == "sent" ? (
                <AppIcons.ChatCheck />
              ) : status == "delivered" ? (
                <AppIcons.ChatCheckDouble />
              ) : (
                <i className="text-primary-dark">
                  <AppIcons.ChatCheckDouble />
                </i>
              )}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
