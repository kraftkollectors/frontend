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
    } as ChatMessage
}

export function buildChatHeadFromChatMessage(msg: ChatMessage, i: ChatHead): ChatHead {
    return {
        _id: i._id,
        datetime: msg.createdAt,
        image: i.image,
        lastMessage: msg.message,
        userName: i.userName,
    }
}

export function reorderChatHeads(heads: ChatHead[], id: string): ChatHead[] {
    const index = heads.findIndex(i => i._id == id);
    if (index === -1) return heads;
    const newHeads = [...heads];
    newHeads.splice(index, 1);
    newHeads.unshift(heads[index]);
    return newHeads;
}

export function buildChatHeadFromUser(user: UserDetails, msg?: ChatMessage): ChatHead {
    return {
        _id: user._id,
        datetime: msg?.createdAt ?? '',
        image: user.image,
        lastMessage: msg?.message ?? 'new conversation',
        userName: user.userName,
      }
}