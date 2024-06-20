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

export default function SideBar({ chatHeads:heads }: { chatHeads: ChatHead[] }) {
  const [chatHeads, setChatHeads] = useState(heads);
  const user = useUserStore(s=>s.user);
  const { isConnected, socket } = useWS();
  const { slug } = useParams();
  const { data: slugUser, isLoading, error } = useQuery({
    queryFn: () => fetchUser({ isPublic: true, throwsError: false, params: slug.toString() }),
    queryKey: [slug, 'slugUser'],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  function startListening(){
    socket.on(wse.logged_in, ()=>{
      debugLog('joined personal')
      socket.on(wse.sent_message, ({data:msg}: {data: ChatMessage})=>{
        debugLog({sentMessage: msg});
        const newHeads = chatHeads.map(i => {
          if(i._id == msg.receiverId) return {
            _id: i._id,
            datetime: msg.createdAt,
            image: i.image,
            lastMessage: msg.message,
            userName: i.userName,
          } as ChatHead;
          return i;
        });

        setChatHeads(newHeads);
      })

      socket.on(wse.received_message, ({data:msg}: {data: ChatMessage})=>{
        debugLog({receivedMessage: msg});
        const newHeads = chatHeads.map(i => {
          if(i._id == msg.receiverId) return {
            _id: i._id,
            datetime: msg.createdAt,
            image: i.image,
            lastMessage: msg.message,
            userName: i.userName,
          } as ChatHead;
          return i;
        });

        setChatHeads(newHeads);
      })
    })
  }

  useLayoutEffect(()=>{
    if(!user) return;
    socket.emit(wse.login_room, {userId: user._id});

    startListening();

    return()=>{
      socket.off(wse.logged_in);
      socket.off(wse.sent_message);
      socket.off(wse.received_message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, slug, user]);

  useEffect(()=>{
    if(!isLoading && !error && slugUser !== 'error' && slugUser && chatHeads.filter(i=>i._id === slugUser._id).length === 0){
      setChatHeads(prev => [{
        _id: slugUser._id,
        datetime: '',
        image: slugUser.image,
        lastMessage: 'new conversation',
        userName: slugUser.userName
      }, ...prev]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugUser])

  return (
    <div className="flex flex-col gap-1 md:max-h-full md:h-full rounded-md md:bg-light md:border border-black-50 overflow-hidden">
      <div className="px-3 pt-4 flex-shrink-0 h-fit">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-title pb-2 line-clamp-1">Messages</h1>
          <div className={`size-2 rounded-full ${isConnected ? ' bg-lime-600' : 'bg-red-700'}`}></div>
        </div>
        <AppInput
          placeholder="search..."
          name="search"
          icon={<FaMagnifyingGlass />}
        />
      </div>
      <div className="flex flex-col overflow-y-auto ">
        {chatHeads.map(conversation =>
          <ConversationTile key={conversation._id} {...conversation} />
        )}
      </div>
    </div>
  );
}
