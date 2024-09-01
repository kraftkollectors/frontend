/* eslint-disable @next/next/no-img-element */
import AppIcons from "@/components/AppIcons";
import { formatChatTime } from "@/functions/date";
import { useUserStore } from "@/state";
import { wse } from "@/utils";
import { ALLOWED_VIDEO_EXTENSIONS } from "@/utils/constants";
import { ChatMessage } from "@/utils/types/chat";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

export type ChatMessageProps = ChatMessage & {
  me: boolean;
  socket: Socket;
};

const motionProps = {
  initial: {
    opacity: 0,
    scale: 0.5,
    translateY: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    translateY: 0,
  },
};

export function ChatBubble({
  _id,
  message,
  createdAt,
  status,
  me = false,
  socket,
  data,
  ...props
}: ChatMessageProps) {
  const user = useUserStore((s) => s.user);
  useEffect(() => {
    if (
      status !== "seen" &&
      socket.connected &&
      user &&
      user._id == props.receiverId
    ) {
      socket.emit(wse.mark_seen, {
        senderId: props.senderId,
        receiverId: props.receiverId,
        chatId: _id,
        status: "seen",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, status]);
  let gridClass = "grid-cols-1";
  if (typeof data !== "string") {
    if (data.length >= 2) gridClass = "grid-cols-2";
  }

  return (
    <div className={`z-[1] flex px-2 py-0.5 ${me ? "flex-row-reverse" : ""}`}>
      <motion.div
        {...motionProps}
        className={`w-90 relative flex min-w-32 max-w-[280px] flex-col gap-1 rounded-xl p-2 shadow-[0_4px_4px_#00000011] ${
          me ? "bg-primary-chat" : "bg-light"
        }`}
      >
        <div>
          {typeof data === "string" ? (
            <p className="text-label text-black-900">{message}</p>
          ) : (
            <div className={`grid w-full gap-2 ${gridClass}`}>
              {data.map((item) => {
                return ALLOWED_VIDEO_EXTENSIONS.includes(
                  item.split(".").pop() ?? "png",
                ) ? (
                  <video
                    key={item}
                    src={item}
                    className="aspect-square w-full rounded-md bg-slate-100 object-cover"
                  />
                ) : (
                  <img
                    key={item}
                    src={item}
                    alt="slider item"
                    className="aspect-square w-full rounded-md bg-slate-100 object-cover"
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-1 text-small text-black-300">
          <span>{formatChatTime(createdAt)}</span>
          {me && (
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
      </motion.div>
    </div>
  );
}
