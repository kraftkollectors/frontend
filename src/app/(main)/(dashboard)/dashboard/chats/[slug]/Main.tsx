"use client";

import { UserDetails } from "@/utils/types/user";
import { ChatTopbar, ChatBottombar } from "../components";
import ChatView from "./ChatView";
import { useUserStore } from "@/state";
import { useLayoutEffect } from "react";
import { useWS } from "@/hooks";
import { fallbackImage, fullName, generateRoomId } from "@/functions/helpers";
import { wse } from "@/utils";

export default function Main({guest}:{guest: UserDetails}) {
  const user = useUserStore(s=>s.user);
  const {socket, isConnected} = useWS();

  useLayoutEffect(()=>{
    if(!user || !isConnected) return;
    socket.emit(wse.join_room, { senderId: user._id, receiverId: guest._id })
    // socket.on(wse.joined_room, ()=>alert('user joined'));
    
  }, [user, guest._id, socket, isConnected])
  

  
  return (
    <div className="flex flex-col justify-stretch h-full">
      <ChatTopbar
        name={fullName(guest.firstName, guest.lastName)}
        lastSeen="2 days ago"
        img={fallbackImage(guest.image)}
      />
      {
        (user?._id && guest._id) && <>
        <ChatView socket={socket} receiverId={guest._id}/>
        <ChatBottombar socket={socket} receiverId={guest._id} />
        </>
      }
    </div>
  );
}
