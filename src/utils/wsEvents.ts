/**
 * Web Socket events
 */
export const wse = {
    connect: "connect",
    disconnect: "disconnect",
    error: "error",

    start_typing: "onTypingStart",
    started_typing: "typingStart",
    stopped_typing: "typingStop",
    stop_typing: "onTypingStop",

    join_room: "joinRoom",
    joined_room: "userJoined",
    send_message: "chatMessage",
    new_message: "message",

    mark_seen: "markSeen",
    mark_delivered: "markDelivered",
    delivered_message: "delivered",
    
    login_room: "loginRoom",
    logged_in: "userLogged",
    sent_message: "senderMessage",
    received_message: "receiverMessage",
} as const