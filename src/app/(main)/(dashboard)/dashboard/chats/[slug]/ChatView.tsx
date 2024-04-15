"use client";
import { useEffect, useRef } from "react";
import { ChatInfoMessage, ChatMessage, ChatMessageProps } from "../components";

export default function ChatView() {
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);
  return (
    <section
      className="w-full h-full overflow-y-auto bg-light-text flex flex-col "
      ref={chatRef}
    >
      <ChatInfoMessage type="warning" message="Do not pay in advance" />
      <ChatInfoMessage message="today" />
      {dummyChats.map((chat, i) => {
        return <ChatMessage key={chat.id} {...chat} />;
      })}
    </section>
  );
}

const dummyChats: ChatMessageProps[] = [
  {
    id: "1",
    message: "hello",
    datetime: "now",
    status: "sent",
    me: false,
  },
  {
    id: "2",
    message: "you have disturbed me too much",
    datetime: "now",
    status: "seen",
    me: true,
  },
  {
    id: "3",
    message: "omo, nna eh",
    datetime: "now",
    status: "seen",
    me: false,
  },
  {
    id: "4",
    message:
      "omo, nna eh omo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna eh",
    datetime: "now",
    status: "seen",
    me: false,
  },
  {
    id: "4",
    message:
      "omo, nna eh omo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna eh",
    datetime: "now",
    status: "seen",
    me: false,
  },
  {
    id: "4",
    message:
      "omo, nna eh omo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna eh",
    datetime: "now",
    status: "seen",
    me: false,
  },
  {
    id: "4",
    message:
      "omo, nna eh omo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna eh",
    datetime: "now",
    status: "seen",
    me: false,
  },
  {
    id: "4",
    message:
      "omo, nna eh omo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna eh",
    datetime: "now",
    status: "seen",
    me: false,
  },
  {
    id: "4",
    message:
      "omo, nna eh omo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna ehomo, nna eh",
    datetime: "now",
    status: "seen",
    me: false,
  },
];
