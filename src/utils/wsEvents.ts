/**
 * Web Socket events
 */
export const wse = {
    start_typing: "onTypingStart",
    started_typing: "typingStart",
    stopped_typing: "typingStop",
    stop_typing: "onTypingStop",
    join_room: "joinRoom",
    send_message: "chatMessage",
    new_message: "message",
    joined_room: "userJoined",
    connect: "connect",
    disconnect: "disconnect",
    mark_seen: "markSeen",
    login_room: "loginRoom",
    logged_in: "userLogged",
    sent_message: "senderMessage",
    received_message: "receiverMessage",
} as const