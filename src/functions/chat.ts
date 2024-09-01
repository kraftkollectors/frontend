import { ChatHead, ChatMessage } from "@/utils/types/chat";
import { UserDetails } from "@/utils/types/user";

export function newMessageChat(props: {
  senderId: string;
  receiverId: string;
  message: string;
}): ChatMessage {
  return {
    senderId: props.senderId,
    receiverId: props.receiverId,
    data: props.message,
    message: props.message,
    status: "sent",
    type: "text",
  } as ChatMessage;
}

export function newFileChat(props: {
  senderId: string;
  receiverId: string;
  message: string;
  data: string[];
}): ChatMessage {
  return {
    senderId: props.senderId,
    receiverId: props.receiverId,
    data: props.data,
    message: props.message,
    status: "sent",
    type: "file",
  } as ChatMessage;
}

export function buildChatHeadFromChatMessage(
  msg: ChatMessage,
  i: ChatHead,
): ChatHead {
  return {
    _id: i._id,
    lastMessageTime: msg.createdAt,
    image: i.image,
    lastMessage: msg.message,
    firstName: i.firstName,
    lastName: i.lastName,
    messageDoc: msg,
  };
}

export function reorderChatHeads(heads: ChatHead[], id: string): ChatHead[] {
  const index = heads.findIndex((i) => i._id == id);
  if (index === -1) return heads;
  const headToTop = heads.splice(index, 1)[0];
  heads.unshift(headToTop);
  console.log({ heads, headToTop });
  return heads;
}

export function buildChatHeadFromUser(
  user: UserDetails,
  msg?: ChatMessage,
): ChatHead {
  return {
    _id: user._id,
    lastMessageTime: msg?.createdAt ?? "",
    image: user.image,
    lastMessage: msg?.message ?? "new conversation",
    firstName: user.userName,
    lastName: user.lastName,
    messageDoc: msg as ChatMessage,
  };
}
