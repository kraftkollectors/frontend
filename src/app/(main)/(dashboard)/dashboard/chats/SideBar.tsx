"use client";

import { dummyConversations } from "@/utils/data";

import paths from "@/utils/paths";
import Conversations from "./Conversations";
import AppInput from "@/components/ui/AppInput";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-1 md:max-h-full md:h-full rounded-md md:bg-light md:border border-black-50 overflow-hidden">
      <div className="md:px-3 pt-4 flex-shrink-0 h-fit">
        <h1 className="font-bold text-title pb-2 line-clamp-1">Messages</h1>
        <AppInput
          placeholder="search..."
          name="search"
          icon={<FaMagnifyingGlass />}
        />
      </div>
      <Conversations conversations={dummyConversations} />
    </div>
  );
}
