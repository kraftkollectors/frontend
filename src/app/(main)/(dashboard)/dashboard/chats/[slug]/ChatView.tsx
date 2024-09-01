"use client";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { usePathname } from "next/navigation";

export default function ChatView({
  socket,
  receiverId,
}: {
  socket: Socket;
  receiverId: string;
}) {
  const user = useUserStore((s) => s.user);
  const chatRef = useRef<HTMLDivElement>(null);
  const [locChats, setLocChats] = useLocalStorage<ChatMessageType[]>(
    generateRoomId(user!._id, receiverId),
    [],
  );
  const [chats, setChats] = useState<ChatMessageType[]>(locChats);
  const [toBottom, setToBottom] = useState(true); // if the view should scroll to bottom on new messages recieved
  const [loadingMore, setLoadingMore] = useState(false); // if there are more chats fetching
  const [hasMore, setHasMore] = useState(true); // if there are more chats to fetch
  const [hasFetchedMore, setHasFetchedMore] = useState(false); // if there are more chats to fetch
  const [lastDate, setLastDate] = useState("");
  const pathname = usePathname();

  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => {
      // debugLog("querying...");
      return fetchChats(receiverId, { params: lastDate, throwsError: false });
    },
    queryKey: ["chats", receiverId],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  function scrollToBottom() {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }

  // clear chats
  useLayoutEffect(() => {
    setLastDate("");
    setChats([]);
  }, [pathname]);

  // initial fetch previous chats
  useEffect(() => {
    debugLog({ data });
    setLoadingMore(false);
    if (!data || data == "error" || !data.existingRecords || error) return;
    if (data.existingRecords.length < 10) setHasMore(false);
    if (data.existingRecords.length == 0) return;
    const c = data.existingRecords.reverse();
    const messages: ChatMessageType[] = c.map((v) => ({
      ...v,
      createdAt: v.timestamp,
      senderId: v.sender._id,
      receiverId: v.receiver._id,
    }));

    if ((lastDate || lastDate !== c[0].timestamp) && hasFetchedMore)
      setChats((v) => [...messages, ...v]);
    else {
      setChats(messages);
      scrollToBottom();
    }
    setLastDate(c[0].timestamp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  // initial scroll to bottom on page load
  useEffect(() => {
    scrollToBottom();
  }, []);

  // handle new message
  useEffect(() => {
    socket.on(wse.new_message, (m: { data: ChatMessageType }) => {
      debugLog({ m });
      const msg = typeof m == "string" ? null : m.data;
      if (!msg || !msg?.type) return;
      setChats((v) => {
        const ret = [...v, msg];
        setLocChats(ret.slice(-10));
        return ret;
      });
      if (
        msg.status !== "seen" &&
        socket.connected &&
        msg.receiverId === user?._id
      ) {
        socket.emit(wse.mark_seen, {
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          chatId: msg._id,
          status: "seen",
        });
      }
      if (msg.senderId == user?._id) scrollToBottom();
    });

    return () => {
      socket.off(wse.new_message);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // handle message marked seen
  useEffect(() => {
    socket.on(wse.mark_seen, (m: { chatId: string }) => {
      debugLog(m);
      if (!m.chatId) return;
      setChats((v) => {
        const ret = v.map((i) => {
          const isSame = i._id == m.chatId;
          if (isSame) {
            i.status = "seen";
          }
          return i;
        });
        setLocChats(ret.slice(-10));
        return ret;
      });
    });

    return () => {
      socket.off(wse.mark_seen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // handle message marked delivered
  useEffect(() => {
    socket.on(wse.mark_delivered, (m: { chatId: string }) => {
      debugLog(m);
      if (!m.chatId) return;
      setChats((v) => {
        const ret = v.map((i) => {
          const isSame = i._id == m.chatId;
          if (isSame) {
            i.status = "delivered";
          }
          return i;
        });
        setLocChats(ret.slice(-10));
        return ret;
      });
    });

    return () => {
      socket.off(wse.mark_delivered);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // handle scroll to bottom
  useEffect(() => {
    setLocChats(chats.slice(-10));
    // debugLog({ toBottom });
    if (toBottom) scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  useEffect(() => {
    if (!visualViewport || !chatRef.current) return;

    function handleResize() {
      const w = visualViewport?.width;
      let h = visualViewport?.height;
      if ((w && w > 768) || !h) return;
      h = h - (72 + 65);
      if (!visualViewport || !chatRef.current) return;
      chatRef!.current.style.maxHeight = `${h}px !important`;
      chatRef!.current.style.height = `${h}px !important`;
      // toast(`${h}px`);
    }

    visualViewport.addEventListener("resize", handleResize);
    return () => {
      visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [chatRef]);

  return (
    <section
      className="relative z-[1] flex h-full w-full flex-col overflow-y-auto scroll-smooth bg-black-50"
      ref={chatRef}
      onScroll={() => {
        if (chatRef.current) {
          const scrollTop = chatRef.current.scrollTop;
          const atBottom =
            chatRef.current.scrollHeight -
              scrollTop -
              chatRef.current.clientHeight <=
            50;
          if (atBottom !== toBottom) setToBottom(atBottom);
        }
      }}
    >
      <ChatInfoMessage
        key="__warning"
        type="warning"
        message="Do not pay in advance"
      />
      {isLoading ||
        (loadingMore && (
          <ChatInfoMessage
            key="__loading"
            type="warning"
            message="loading messages..."
          />
        ))}
      {error && (
        <ChatInfoMessage
          key="__error"
          type="danger"
          message="Failed to load messages"
        />
      )}
      {!isLoading && !loadingMore && hasMore && (
        <div className="flex items-center justify-center p-2">
          <button
            onClick={() => {
              if (!chatRef.current) return;
              if (!isLoading && hasMore && !loadingMore) {
                setHasFetchedMore(true);
                setLoadingMore(true);
                refetch();
              }
            }}
            className="btn-dark-border !px-4 !py-1.5 !text-label !font-normal"
          >
            load more
          </button>
        </div>
      )}
      {chats.map((chat, i) => {
        return (
          <Fragment key={chat._id}>
            {i == 0 ? (
              <ChatInfoMessage
                key={`info-${chat._id}`}
                message={getChatDate(chats[i].createdAt)}
              />
            ) : (
              chats[i - 1] &&
              getChatDate(chats[i - 1].createdAt) !==
                getChatDate(chats[i].createdAt) && (
                <ChatInfoMessage
                  key={`info-${chat._id}`}
                  message={getChatDate(chats[i].createdAt)}
                />
              )
            )}
            <ChatMessage
              key={"message-" + chat._id}
              me={user?._id == chat.senderId}
              {...chat}
              socket={socket}
            />
          </Fragment>
        );
      })}

      {/* {!toBottom &&
        <button title="latest message"
          onClick={() => {
            if (!chatRef.current) return;
            chatRef.current.scrollTop = chatRef.current.scrollHeight
            setToBottom(true);
          }}
          className={`bg-light z-10 icon-btn p-2 size-8 sticky bottom-4 left-[96%] shadow-md hidden ${toBottom ? '!inline-flex' : 'hidden'}`}
        >
          <FaArrowDown />
        </button>} */}
    </section>
  );
}
