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
import { getChatDate } from "@/functions/date";

export default function ChatView({ socket, receiverId }: { socket: Socket; receiverId: string; }) {
  const user = useUserStore(s => s.user);
  const chatRef = useRef<HTMLDivElement>(null);
  const [locChats, setLocChats] = useLocalStorage<ChatMessageType[]>(generateRoomId(user!._id, receiverId), []);
  const [chats, setChats] = useState<ChatMessageType[]>(locChats);
  const [toBottom, setToBottom] = useState(true); // if the view should scroll to bottom on new messages recieved

  // const { data, isLoading, error } = useQuery({
  //   queryFn: () => fetchChats(receiverId, { params: 1 }),
  //   queryKey: [tags.chats(user!._id, receiverId)],
  //   refetchOnReconnect: (query) => {
  //     return false;
  //   },

  // });

  // useEffect(() => {
  //   debugLog(data);
  // }, [data])

  // initial scroll to bottom on page load
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  // handle new message
  useEffect(() => {
    socket.on(wse.new_message, (m: { data: ChatMessageType }) => {
      debugLog(m);
      const msg = typeof m == 'string' ? null : m.data;
      if (!msg || !msg?.type) return;
      setChats(v => {
        const ret = [...v, msg];
        setLocChats(ret.slice(-10));
        return ret;
      });
      if (msg.status !== 'seen' && socket.connected && msg.receiverId === user?._id) {
        socket.emit(wse.mark_seen, {
          senderId: msg.senderId, receiverId: msg.receiverId, chatId: msg._id, status: 'seen'
        })
      }
      if (chatRef.current && msg.senderId == user?._id)
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    });

    return () => {
      socket.off(wse.new_message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // handle message marked seen
  useEffect(() => {
    socket.on(wse.mark_seen, (m: { chatId: string }) => {
      debugLog(m);
      if (!m.chatId) return;
      setChats(v => {
        const ret = v.map(i => {
          const isSame = i._id == m.chatId;
          if (isSame) {
            i.status = 'seen'
          }
          return i;
        })
        setLocChats(ret.slice(-10));
        return ret;
      });

    });

    return () => {
      socket.off(wse.mark_seen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // handle scroll to bottom
  useEffect(() => {
    if (toBottom && chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);


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


      <ChatInfoMessage type="warning" message="Do not pay in advance" />

      {chats.map((chat, i) => {
        return (
          <>
            {
              (chats[i - 1] && getChatDate(chats[i - 1].createdAt) !== getChatDate(chats[i].createdAt))
              && <ChatInfoMessage key={`info-${chat._id}`} message={getChatDate(chats[i].createdAt)} />
            }
            <ChatMessage
              key={`chat-${chat._id}`}
              me={user?._id == chat.senderId}
              {...chat}
              socket={socket}
            />
          </>);
      })}

      {!toBottom &&
        <button title="latest message"
          onClick={() => {
            if (!chatRef.current) return;
            chatRef.current.scrollTop = chatRef.current.scrollHeight
            setToBottom(true);
          }}
          className={`bg-light z-10 icon-btn p-2 size-8 sticky bottom-4 left-[96%] shadow-md hidden ${toBottom ? '!inline-flex' : 'hidden'}`}
        >
          <FaArrowDown />
        </button>}
    </section>
  );
}
