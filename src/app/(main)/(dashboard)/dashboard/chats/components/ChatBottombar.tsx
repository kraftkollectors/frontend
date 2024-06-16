'use client'

import { FormButton } from "@/components";
import { debugLog } from "@/functions/helpers";
import { useUserStore } from "@/state";
import { ChangeEvent, useState } from "react";
import { GrFormAttachment } from "react-icons/gr";
import { VscSend } from "react-icons/vsc";
import { Socket } from "socket.io-client";

export function ChatBottombar({ socket, roomId }: { socket: Socket; roomId: string }) {
  const [chatMsg, setChatMsg] = useState('');
  const [sending, setSending] = useState(false);
  const user = useUserStore(s => s.user);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setChatMsg(value);
    const computedStyle = getComputedStyle(e.target);
    const fontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
    const px = parseFloat(computedStyle.getPropertyValue('padding-inline'));
    const w = parseFloat(computedStyle.getPropertyValue('width')) - px;
    const _w = (fontSize / 1.6) * value.length;
    if (_w > w) e.target.setAttribute('rows', '4'); else e.target.setAttribute('rows', '1');
  }

  function sendMsg() {
    if (!chatMsg.trim() || !user) return;
    setSending(true);
    const v = socket.emit('chatMessage', { userId: user._id, roomId: roomId, message: chatMsg });
    if (v.connected) {
      setChatMsg('')
      setSending(false);
    } else {
      setTimeout(() => {
        setSending(false);
      }, 2000);
    }
  }

  return (
    <div className="flex gap-2 md:gap-4 p-4">
      <div className="relative">
        <label htmlFor="file-select" className="block icon-btn text-title p-2">
          <GrFormAttachment />
        </label>
        <input type="file" hidden name="file" id="file-select" />
      </div>
      <div className="w-full relative">
        <div className="absolute bottom-0 left-0 w-full max-h-32 min-h-6 flex flex-col">
          <textarea
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                if (!e.shiftKey || !e.ctrlKey) {
                  e.preventDefault();
                  sendMsg();
                }
              }
            }}
            onChange={handleInputChange}
            placeholder="enter message"
            rows={1}
            value={chatMsg}
            className="focus:outline-primary focus:outline rounded-md !border-none !outline-none w-full focus:shadow-lg"
          />
        </div>
      </div>
      <FormButton onClick={sendMsg} loading={sending} className="icon-btn p-2">
        <VscSend />
      </FormButton>
    </div>
  );
}
