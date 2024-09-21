"use client";

import { FormButton } from "@/components";
import { newFileChat, newMessageChat } from "@/functions/chat";
import { debugLog } from "@/functions/helpers";
import { useChangeSearchParams, useTypingDetector } from "@/hooks";
import { useUserStore } from "@/state";
import { wse } from "@/utils";
import {
  $1MB,
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_VIDEO_EXTENSIONS,
} from "@/utils/constants";
import { ChangeEvent, useEffect, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { Socket } from "socket.io-client";
import {
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";
import FileSender from "./FileSender";

export function ChatBottombar({
  socket,
  receiverId,
}: {
  socket: Socket;
  receiverId: string;
}) {
  const [chatMsg, setChatMsg] = useState("");
  const [fileKey, setFIleKey] = useState("1");
  const [sending, setSending] = useState(false);
  const user = useUserStore((s) => s.user);
  const [isTyping, inputRef] = useTypingDetector();
  const { params, replaceParams } = useChangeSearchParams();

  // hadle when this user is typing
  useEffect(() => {
    if (!user) return;
    if (socket.connected) {
      if (isTyping)
        socket.emit(wse.start_typing, { senderId: user._id, receiverId });
      else if (!isTyping)
        socket.emit(wse.stop_typing, { senderId: user._id, receiverId });
    }
  }, [socket, isTyping, user, receiverId]);

  // onChange of the chat input field
  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setChatMsg(value);
    const computedStyle = getComputedStyle(e.target);
    const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
    const px = parseFloat(computedStyle.getPropertyValue("padding-inline"));
    const w = parseFloat(computedStyle.getPropertyValue("width")) - px;
    const _w = (fontSize / 1.6) * value.length;
    const ceil = Math.ceil(_w / w);
    if (_w > w) e.target.setAttribute("rows", String(ceil > 3 ? 3 : ceil));
    else e.target.setAttribute("rows", "1");
  }

  // submit the chat
  function sendMsg() {
    if (!chatMsg.trim() || !user) return;
    setSending(true);
    const serviceId = params.get("serviceId") ?? undefined;
    const v = socket.emit(
      wse.send_message,
      newMessageChat({
        message: chatMsg,
        senderId: user._id,
        receiverId,
        serviceId,
      }),
    );
    if (v.connected) {
      setChatMsg("");
      inputRef.current?.setAttribute("rows", "1");
      setSending(false);
      if (serviceId) replaceParams({ serviceId: "" });
    } else {
      setTimeout(() => {
        setSending(false);
      }, 2000);
    }
  }

  // submit the file
  function sendFile(files: string[]) {
    if (!user) return;
    setSending(true);
    const fileChat = newFileChat({
      message: `${files.length} file${files.length == 1 ? "" : "s"}`,
      data: files,
      senderId: user._id,
      receiverId,
    });
    const v = socket.emit(wse.send_message, fileChat);
    debugLog(3);
    if (v.connected) {
      setSending(false);
      setFIleKey((v) => v + "1");
    } else {
      setTimeout(() => {
        setSending(false);
      }, 2000);
    }
  }

  return (
    <FileSender
      showFile={!chatMsg.length}
      key={fileKey}
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
      onFileUploaded={(e) => {
        debugLog(2.8);
        sendFile(e);
      }}
    >
      <div className="relative w-full">
        <div className="bottom-0 left-0 flex max-h-32 min-h-6 w-full flex-col">
          <textarea
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
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
            className={`empty w-full rounded-md !border-none !outline-none focus:shadow-lg focus:outline focus:outline-primary ${chatMsg.trim.length > 0 ? "border border-black-100" : ""}`}
          />
        </div>
      </div>
      {!!chatMsg.length && (
        <FormButton
          onClick={sendMsg}
          loading={sending}
          className="icon-btn p-2"
        >
          <VscSend />
        </FormButton>
      )}
    </FileSender>
  );
}
