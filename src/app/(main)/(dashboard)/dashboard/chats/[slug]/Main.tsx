"use client";

import { ChatTopbar, ChatBottombar } from "../components";
import ChatView from "./ChatView";

export default function Form() {
  return (
    <div className="flex flex-col justify-stretch h-full">
      <ChatTopbar
        name="Kizito Ryder"
        lastSeen="2 days ago"
        img="/images/dna logo.png"
      />
      <ChatView />
      <ChatBottombar />
    </div>
  );
}
