/**
 * Web Socket events
 */
export const wse = {
    start_typing: "onTypingStart",
    stop_typing: "onTypingStop",
    join_room: "joinRoom",
    send_message: "chatMessage",
    new_message: "message",
    joined_room: "userJoined"
} as const