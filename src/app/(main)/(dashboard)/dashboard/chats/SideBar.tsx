/* eslint-disable @next/next/no-img-element */
"use client";

import AppInput from "@/components/ui/AppInput";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useWS } from "@/hooks";
import { ChatHead, ChatMessage } from "@/utils/types/chat";
import { ConversationTile } from "./components";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchUser } from "@/actions";
import { useEffect, useLayoutEffect, useState } from "react";
import { wse } from "@/utils";
import { useUserStore } from "@/state";
import { debugLog } from "@/functions/helpers";
import {
  buildChatHeadFromChatMessage,
  buildChatHeadFromUser,
  reorderChatHeads,
} from "@/functions/chat";

export default function SideBar({
  chatHeads: heads,
}: {
  chatHeads: ChatHead[];
}) {
  const [chatHeads, setChatHeads] = useState(heads);
  const [search, setSearch] = useState("");
  const user = useUserStore((s) => s.user);
  const { isConnected, socket } = useWS();
  const { slug } = useParams();
  const {
    data: slugUser,
    isLoading,
    error,
  } = useQuery({
    queryFn: () =>
      fetchUser({
        isPublic: true,
        throwsError: false,
        params: slug.toString(),
      }),
    queryKey: [slug, "slugUser"],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  // listen for new chatheads
  useLayoutEffect(() => {
    if (!user) return;
    socket.emit(wse.login_room, { userId: user._id });

    const handleLoggedIn = () => {
      debugLog("joined personal");
    };
    socket.on(wse.logged_in, handleLoggedIn);

    const handleSentMessage = ({ data: msg }: { data: ChatMessage }) => {
      debugLog({ sentMessage: msg });

      setChatHeads((v) => {
        const newHeads = v.map((i) => {
          if (i._id == msg.receiverId)
            return buildChatHeadFromChatMessage(msg, i);
          return i;
        });
        return reorderChatHeads(newHeads, msg.receiverId);
      });
    };
    socket.on(wse.sent_message, handleSentMessage);

    const handleReceiveMessage = async ({
      data: msg,
    }: {
      data: ChatMessage;
    }) => {
      debugLog({ receivedMessage: msg });
      // check if the sender is also the receiver
      if (msg.senderId == user._id) return;
      // check if the senderId of the new head is already in my chat heads
      const inHeads = chatHeads.some((i) => i._id == msg.senderId);
      if (!inHeads) {
        const head = await fetchUser({
          isPublic: true,
          throwsError: false,
          params: msg.senderId,
        });
        if (!head || head == "error") return;
        setChatHeads((prev) => [buildChatHeadFromUser(head, msg), ...prev]);
        return;
      }

      setChatHeads((v) => {
        const newHeads = v.map((i) => {
          if (i._id == msg.senderId)
            return {
              ...buildChatHeadFromChatMessage(msg, i),
              isNew: slug !== msg.senderId,
            };
          return i;
        });
        return reorderChatHeads(newHeads, msg.senderId);
      });
    };
    socket.on(wse.received_message, handleReceiveMessage);

    return () => {
      socket.off(wse.logged_in, handleLoggedIn);
      socket.off(wse.sent_message, handleSentMessage);
      socket.off(wse.received_message, handleReceiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, slug, user]);

  // use the current url id to build chathead
  useEffect(() => {
    if (
      !isLoading &&
      !error &&
      slugUser !== "error" &&
      slugUser &&
      chatHeads.filter((i) => i._id === slugUser._id).length === 0
    ) {
      setChatHeads((prev) => [buildChatHeadFromUser(slugUser), ...prev]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugUser]);

  return (
    <div className="flex flex-col gap-1 overflow-hidden rounded-md border-black-50 md:h-full md:max-h-full md:border md:bg-light">
      <div className="h-fit flex-shrink-0 px-3 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="line-clamp-1 pb-2 text-title font-bold">Messages</h1>
          <div
            className={`size-1 rounded-full ${isConnected ? "bg-lime-600" : "bg-red-700"}`}
          ></div>
        </div>
        <AppInput
          placeholder="search..."
          name="search"
          icon={<FaMagnifyingGlass />}
          onChange={(v) => setSearch(v)}
        />
      </div>
      <div className="flex flex-col overflow-y-auto">
        {chatHeads.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 p-10">
            <img
              src="/images/message-banner.svg"
              alt="no conversations"
              height={160}
              width={160}
            />
            <p className="font-bold text-black-400">No conversations yet</p>
          </div>
        )}
        {chatHeads
          .filter((i) =>
            i.firstName.toLowerCase().includes(search.toLowerCase()),
          )
          .map((conversation) => (
            <ConversationTile
              key={conversation._id}
              onClick={() => {
                setChatHeads((prev) =>
                  prev.map((i) =>
                    i._id === conversation._id ? { ...i, isNew: false } : i,
                  ),
                );
              }}
              {...conversation}
            />
          ))}
      </div>
    </div>
  );
}
