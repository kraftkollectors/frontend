import { ChatMessage, ChatStatus } from "@/utils/types/chat";

export function newMessageChat(props: {
    senderId: string;
    receiverId: string;
    message: string;
}): ChatMessage{
    return {
        sender_id: props.senderId,
        senderId: props.senderId,
        receiver_id: props.receiverId,
        receiverId: props.receiverId,
        data: props.message,
        message: props.message,
        status: "sent",
        type: "text",
    } as ChatMessage
}