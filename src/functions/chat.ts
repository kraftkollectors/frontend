import { ChatMessage, ChatStatus } from "@/utils/types/chat";

export function newMessageChat(props: {
    senderId: string;
    receiverId: string;
    message: string;
}): ChatMessage{
    return {
        senderId: props.senderId,
        receiverId: props.receiverId,
        data: props.message,
        message: props.message,
        status: "sent",
        type: "text",
    } as ChatMessage
}