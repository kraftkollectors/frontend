"use client";
import { useEffect, useRef, useState } from "react";
import { ChatInfoMessage, ChatMessage, ChatMessageProps } from "../components";
import { Socket } from "socket.io-client";
import { debugLog } from "@/functions/helpers";
import { ChatMessage as ChatMessageType } from "@/utils/types/chat";
import { useUserStore } from "@/state";
import useLocalStorage from "use-local-storage";

export default function ChatView({ socket, roomId, onNewMessage }: { socket: Socket; roomId: string, onNewMessage: ()=>void }) {
  const user = useUserStore(s=>s.user);
  const chatRef = useRef<HTMLDivElement>(null);
  const [locChats, setLocChats] = useLocalStorage<ChatMessageType[]>(roomId, []);
  const [chats, setChats] = useState<ChatMessageType[]>(locChats);
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    socket.on('message', (msg: ChatMessageType) => {
      debugLog(msg);
      setChats(v=>{
        setLocChats(v.slice(-10));
        return [...v, msg]
      });
      if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    });

    return ()=>{
      socket.off('message');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);


  return (
    <section
      className="w-full h-full overflow-y-auto bg-light-text flex flex-col "
      ref={chatRef}
    >
      <ChatInfoMessage type="warning" message="Do not pay in advance" />
      <ChatInfoMessage message="today" />
      {chats.map((chat, i) => {
        return <ChatMessage key={i}
        me={user?._id == chat.userId}
        message={chat.message}
        datetime=""
        id=""
        status="seen"
        //  {...chat} 
         />;
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
