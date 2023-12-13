import { Socket } from "socket.io";
import { createMessage } from "../service/message.service";

declare global {
  var onlineUsers: any;
  var chatSocket: any;
}
export async function onConnection(socket: Socket) {
  try {
    global.onlineUsers = new Map();
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", async (data) => {
      const sendUserData = onlineUsers.get(data.to);
      if (sendUserData) {
        socket.to(sendUserData).emit("msg-recieve", data.msg);
      }
      await createMessage(data);
    });
  } catch (error) {
    console.log(error);
  }
}
