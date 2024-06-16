
export type ChatMessage = {
    message: string;
    roomId: string;
    userId: string;
    createdAt: string;
    _id: string;
    status: "seen" | "delivered" | "sent" // 'sent' is the default
    // we should have two fields for the main message,
    // instead of just message cos there is ability to upload files, so:
    type: "text" | 'file';
    data: string | string[] // if type == text, data will be a string, else data will be an array of file urls
}