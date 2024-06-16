import { ChatMessage } from '@/utils/types/chat';
import {motion} from 'framer-motion'

export type ChatMessageProps = ChatMessage & {
  me: boolean;
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
  me = false
}: ChatMessageProps) {
  return (
    <div className={`flex px-2 py-0.5 ${me ? "flex-row-reverse" : ""}`}>
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
        <div className="flex gap-1 justify-end">
          <span className="text-small text-black-100">
            {createdAt}
          </span>
          <span className="text-small text-black-100">
            {status}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
