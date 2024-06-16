
export type ChatStatus = "seen" | "delivered" | "sent"

export type ChatMessage = {
    message: string;
    sender_id: string;
    senderId: string;
    receiver_id: string;
    receiverId: string;
    createdAt: string;
    _id: string;
    status: ChatStatus // 'sent' is the default
    // we should have two fields for the main message,
    // instead of just message cos there is ability to upload files, so:
    type: "text" | 'file';
    data: string | string[] // if type == text, data will be a string, else data will be an array of file urls
}

export type ChatHead =  {
    _id: string;
    userName: string;
    image: string;
    lastMessage: string;
    datetime: string;
  }