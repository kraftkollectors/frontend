"use client";
import { useEffect, useRef, useState } from "react";
import { ChatInfoMessage, ChatMessage } from "../components";
import { Socket } from "socket.io-client";
import { debugLog, generateRoomId } from "@/functions/helpers";
import { ChatMessage as ChatMessageType } from "@/utils/types/chat";
import { useUserStore } from "@/state";
import useLocalStorage from "use-local-storage";
import { FaArrowDown } from "react-icons/fa6";
import { tags, wse } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "@/actions";

export default function ChatView({ socket, receiverId }: { socket: Socket; receiverId: string;}) {
  const user = useUserStore(s => s.user);
  const chatRef = useRef<HTMLDivElement>(null);
  const [locChats, setLocChats] = useLocalStorage<ChatMessageType[]>(generateRoomId(user!._id, receiverId), []);
  const [chats, setChats] = useState<ChatMessageType[]>(locChats);
  const [toBottom, setToBottom] = useState(true); // if the view should scroll to bottom on new messages recieved

  const {data, isLoading, error} = useQuery({
    queryFn: ()=>fetchChats(receiverId, {params: 1}),
    queryKey: [tags.chats(user!._id, receiverId)],
  });

  useEffect(()=>{
    debugLog(data);
  }, [data])
  
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    socket.on(wse.new_message, (msg: ChatMessageType) => {
      if(!msg.type) return;
      // debugLog({msg});
      setChats(v => {
        setLocChats(v.slice(-10));
        return [...v, msg]
      });
      if (chatRef.current && msg.sender_id == user?._id)
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    });

    return () => {
      socket.off(wse.new_message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (toBottom && chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats])


  return (
      <section
      className="w-full h-full overflow-y-auto bg-light-text flex flex-col relative scroll-smooth"
      ref={chatRef}
      onScroll={() => {
        if (chatRef.current) {
          const scrollTop = chatRef.current.scrollTop;
          const atBottom = chatRef.current.scrollHeight - chatRef.current.clientHeight === scrollTop;
          if (atBottom !== toBottom) setToBottom(atBottom);
        }
      }}
    >
       {!toBottom && <button title="latest message"
        onClick={() => {
          if (!chatRef.current) return;
          chatRef.current.scrollTop = chatRef.current.scrollHeight
          setToBottom(true);
        }}
        className={`bg-light z-10 icon-btn p-2 size-8 sticky top-[92%] left-[96%] shadow-md hidden ${toBottom ? '!inline-flex' : 'hidden'}`}
      >
        <FaArrowDown />
      </button>}

      <ChatInfoMessage type="warning" message="Do not pay in advance" />
      <ChatInfoMessage message="today" />
      {chats.map((chat, i) => {
        return <ChatMessage key={i}
          me={user?._id == chat.sender_id}
         {...chat} 
        />;
      })}

     
    </section>
  );
}
