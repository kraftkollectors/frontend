import { debugLog, fallbackImage, fullName } from "@/functions/helpers";
import { useLastSeen, useTypingDetector } from "@/hooks";
import { useUserStore } from "@/state";
import { wse } from "@/utils";
import { UserDetails } from "@/utils/types/user";
import { useEffect, useMemo, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { Socket } from "socket.io-client";

/* eslint-disable @next/next/no-img-element */
export type ChatTopbarProps = {
  guest: UserDetails;
  socket: Socket;
};

export function ChatTopbar({guest, socket }: ChatTopbarProps) {
  const user = useUserStore(s=>s.user);
  const fullname = useMemo(()=>fullName(guest.firstName, guest.lastName), [guest])
  const [typing, setTyping] = useState(false);
  const lastSeen = useLastSeen(guest._id);
  const isTyping = useTypingDetector();

  // hadle when a guest is typing
  useEffect(()=>{
    if(socket.connected){
      socket.on(wse.started_typing, (res: { senderId: string, receiverId: string })=>{
        if(res.senderId == guest._id) setTyping(true)
      });
      socket.on(wse.stopped_typing, (res: { senderId: string, receiverId: string })=>{
        if(res.senderId == guest._id) setTyping(false)
      });
    }

    return ()=>{
      socket.off(wse.start_typing);
      socket.off(wse.stop_typing);
    }
  }, [socket, guest])

  // hadle when this user is typing
  useEffect(()=>{
    if(!user) return;
    if(socket.connected){
      debugLog(isTyping);
      if(isTyping) socket.emit(wse.start_typing, {senderId: user._id, receiverId: guest._id});
      else if (!isTyping) socket.emit(wse.stop_typing, {senderId: user._id, receiverId: guest._id});
    }
  }, [socket, isTyping, user, guest])
  
  return (
    <header className="py-2 px-4 flex items-center justify-between border-b border-black-50">
      <div className="flex gap-2">
        <img
          src={fallbackImage(guest.image)}
          alt={fullname}
          title={`Conversation with ${fullname}`}
          className="rounded-full aspect-square size-12 flex-shrink-0 profile-img"
        />
        <div className="w-full flex-shrink">
          <h1 className="font-semibold">
            {fullname}
          </h1>
          <p className="line-clamp-2 overflow-ellipsis text-black-300 text-label flex items-center gap-3">
            {lastSeen}
            {
              typing && "typing..."
            }
          </p>
        </div>
      </div>
      <button className="btn-primary-border px-4">
        <FiPhone />
        <span>Show Contact</span>
      </button>
    </header>
  );
}
