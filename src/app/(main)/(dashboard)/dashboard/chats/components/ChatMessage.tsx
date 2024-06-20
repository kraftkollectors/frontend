import { formatChatTime } from '@/functions/date';
import { useUserStore } from '@/state';
import { wse } from '@/utils';
import { ChatMessage } from '@/utils/types/chat';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Socket } from "socket.io-client";

export type ChatMessageProps = ChatMessage & {
  me: boolean;
  socket: Socket;
};

const motionProps = {
  initial: {
    opacity: 0,
    scale: .5,
    translateY: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    translateY: 0,
  },
}

export function ChatBubble({
  _id,
  message,
  createdAt,
  status,
  me = false,
  socket,
  ...props
}: ChatMessageProps) {

  const user = useUserStore(s => s.user);
  useEffect(() => {
    if (status !== 'seen' &&
      socket.connected && user &&
      user._id == props.receiverId) {
      socket.emit(wse.mark_seen, {
        senderId: props.senderId, receiverId: props.receiverId, chatId: _id, status: 'seen'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, status])

  return (
    <div className={`flex px-2 py-0.5 z-[1] ${me ? "flex-row-reverse" : ""}`}>
      <motion.div
        {...motionProps}
        transition={{

        }}
        className={`w-90 max-w-[280px] relative rounded-lg p-2 flex flex-col gap-1 ${me
          ? "bg-primary-lightActive2"
          : "bg-light"}`}
      >
        <p className="text-label text-black-300">
          {message}
        </p>
        <div className="flex gap-1 justify-end text-small text-black-100">
          <span>
            {formatChatTime(createdAt)}
          </span>
          {
            me &&
            <span>
              {status}
            </span>}
        </div>
      </motion.div>
    </div>
  );
}
