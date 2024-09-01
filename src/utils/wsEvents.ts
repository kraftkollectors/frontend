/**
 * Web Socket events
 */
export const wse = {
  /**
   * socket connected
   */
  connect: "connect",
  /**
   * socket disconnected
   */
  disconnect: "disconnect",
  /**
   * socket error
   */
  error: "error",

  /**
   * I am typing
   * @example
   * socket.emit(wse.start_typing, { senderId: user._id, receiverId })
   */
  start_typing: "onTypingStart",
  /**
   * Other person is typing
   * @example
   * socket.on(
   *   wse.started_typing,
   *   (res: { senderId: string; receiverId: string }) => {
   *     if (res.senderId == guest._id) setTyping(true);
   *   },
   * );
   */
  started_typing: "typingStart",
  /**
   * Other stopped typing
   * @example
   * socket.on(
   *   wse.stopped_typing,
   *   (res: { senderId: string; receiverId: string }) => {
   *     if (res.senderId == guest._id) setTyping(false);
   *   },
   * );
   *
   */
  stopped_typing: "typingStop",
  /**
   * I stopped typing
   * @example
   * socket.emit(wse.stop_typing, { senderId: user._id, receiverId });
   */
  stop_typing: "onTypingStop",

  /**
   * I am joining a room (a room consists of 2 users: I and Other)
   * @example
   * socket.emit(wse.join_room, { senderId: user._id, receiverId: guest._id })
   */
  join_room: "joinRoom",
  /**
   * Other joined a room
   */
  joined_room: "userJoined",
  /**
   * I am sending a message
   * @example
   * // type ChatMessage:
   * // send a text message
   * socket.emit(wse.send_message, {
   *    message: string; // "hello bro"
   *    senderId: string;
   *    receiverId: string;
   *    type: "text" | "file"; // "text"
   *    data: string | string[]; // "hello bro" - same as message
   *});
   *
   * @example
   * // send a file
   * socket.emit(wse.send_message, {
   *    message: string; // "n files" - n is number of files
   *    senderId: string;
   *    receiverId: string;
   *    type: "text" | "file"; // "file"
   *    data: string[]; // file urls
   *});
   */
  send_message: "chatMessage",
  /**
   * I received a message | Other sent a message
   * @example
   * socket.on(wse.new_message, (m: { data: ChatMessageType }) => {
   * // set the status of the received message to seen
   * // check the message type and display the message
   * })
   */
  new_message: "message",

  /**
   * I am marking a message as "seen"
   * @example
   *  socket.emit(wse.mark_seen, {
   *    senderId: props.senderId,
   *    receiverId: props.receiverId,
   *    chatId: _id,
   *    status: "seen",
   *  });
   */
  mark_seen: "markSeen",
  /**
   * I am marking a message as "delivered"
   * @example
   *  socket.emit(wse.mark_delivered, {
   *    senderId: props.senderId,
   *    receiverId: props.receiverId,
   *    chatId: _id,
   *    status: "delivered",
   *  });
   */
  mark_delivered: "markDelivered",
  delivered_message: "delivered",

  /**
   * I am prepared to start receiving chat heads
   * @example
   * socket.emit(wse.login_room, { userId: user._id });
   */
  login_room: "loginRoom",
  /**
   * I am prepared to start receiving chat heads
   * @example
   * socket.on(wse.logged_in, ()=>{
   *    // I am connected and ready
   * });
   */
  logged_in: "userLogged",
  /**
   * I sent a message
   * @example
   * socket.on(wse.sent_message, ({ data: ChatMessage })=>{
   *    // rearrange the chat heads - move this chat room to the top
   * });
   */
  sent_message: "senderMessage",
  /**
   * I received a message
   * @example
   * socket.on(wse.received_message, ({ data: ChatMessage })=>{
   *    // rearrange the chat heads - move this chat room to the top
   * });
   */
  received_message: "receiverMessage",
} as const;
