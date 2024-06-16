"use client";

import { UserDetails } from "@/utils/types/user";
import { ChatTopbar, ChatBottombar } from "../components";
import ChatView from "./ChatView";
import { useUserStore } from "@/state";
import { useLayoutEffect } from "react";
import { useWS } from "@/hooks";
import { fallbackImage, fullName, generateRoomId } from "@/functions/helpers";

export default function Main({guest}:{guest: UserDetails}) {
  const user = useUserStore(s=>s.user);
  const {socket, isConnected} = useWS();
  const roomId = user ? generateRoomId(user._id, guest._id) : null;

  useLayoutEffect(()=>{
    if(!user || !isConnected || !roomId) return;
    socket.emit('joinRoom', { userId: user._id, roomId: roomId })
    
  }, [user, guest._id, socket, isConnected, roomId])
  
  function onNewMessage(){
    
  }
  
  return (
    <div className="flex flex-col justify-stretch h-full">
      <ChatTopbar
        name={fullName(guest.firstName, guest.lastName)}
        lastSeen="2 days ago"
        img={fallbackImage(guest.image)}
      />
      {
        (roomId) && <>
        <ChatView socket={socket} roomId={roomId} onNewMessage={onNewMessage} />
        <ChatBottombar socket={socket} roomId={roomId} />
        </>
      }
    </div>
  );
}
