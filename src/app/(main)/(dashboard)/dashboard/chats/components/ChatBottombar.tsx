'use client'

import { FormButton } from "@/components";
import { newFileChat, newMessageChat } from "@/functions/chat";
import { debugLog } from "@/functions/helpers";
import { useTypingDetector } from "@/hooks";
import { useUserStore } from "@/state";
import { wse } from "@/utils";
import { ChatMessage } from "@/utils/types/chat";
import { ChangeEvent, useEffect, useState } from "react";
import { GrFormAttachment } from "react-icons/gr";
import { VscSend } from "react-icons/vsc";
import { Socket } from "socket.io-client";
import FileSender from "./FileSender";
import { ALLOWED_IMAGE_EXTENSIONS, ALLOWED_VIDEO_EXTENSIONS, $1MB } from "@/utils/constants";
import { FileTypeValidator, FileSizeValidator } from "use-file-picker/validators";

export function ChatBottombar({ socket, receiverId }: { socket: Socket; receiverId: string }) {
  const [chatMsg, setChatMsg] = useState('');
  const [sending, setSending] = useState(false);
  const user = useUserStore(s => s.user);
  const [isTyping, inputRef] = useTypingDetector();


  // hadle when this user is typing
  useEffect(() => {
    if (!user) return;
    if (socket.connected) {
      if (isTyping) socket.emit(wse.start_typing, { senderId: user._id, receiverId });
      else if (!isTyping) socket.emit(wse.stop_typing, { senderId: user._id, receiverId });
    }
  }, [socket, isTyping, user, receiverId])

  // onChange of the chat input field
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

  // submit the chat
  function sendMsg() {
    if (!chatMsg.trim() || !user) return;
    setSending(true);
    const v = socket.emit(wse.send_message, newMessageChat({
      message: chatMsg,
      senderId: user._id,
      receiverId
    }));
    if (v.connected) {
      setChatMsg('');
      inputRef.current?.setAttribute('rows', '1');
      setSending(false);
    } else {
      setTimeout(() => {
        setSending(false);
      }, 2000);
    }
  }

  // submit the file
  function sendFile(files: string[]) {
    if (!chatMsg.trim() || !user) return;
    setSending(true);
    const v = socket.emit(wse.send_message, newFileChat({
      message: `${files.length} file${files.length == 1 ? '' : 's'}`,
      data: files,
      senderId: user._id,
      receiverId
    }));
    debugLog(3)
    if (v.connected) {
      setSending(false);
    } else {
      setTimeout(() => {
        setSending(false);
      }, 2000);
    }
  }


  return (

    <FileSender 
    name="files"
    max={4}
    validators={[
      new FileTypeValidator([
        ...ALLOWED_IMAGE_EXTENSIONS,
        ...ALLOWED_VIDEO_EXTENSIONS,
      ]),
      new FileSizeValidator({
        maxFileSize: 5 * $1MB /* 5 MB */,
      }),
    ]}
    onInvoke={sendFile}>
      <div className="w-full relative">
        <div className="absolute bottom-0 left-0 w-full max-h-32 min-h-6 flex flex-col">
          <textarea
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                if (!e.shiftKey && !e.ctrlKey) {
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
      {
        !!chatMsg.length &&
        <FormButton onClick={sendMsg} loading={sending} className="icon-btn p-2">
          <VscSend />
        </FormButton>}
    </FileSender>
  );
}
