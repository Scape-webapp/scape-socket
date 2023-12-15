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
      console.log(userId.id);
      onlineUsers.set(userId.id, socket.id);
    });
    socket.on("send-msg", async (data) => {
      console.log("server1");
      const sendUserData = onlineUsers.get(data.reciever);
      if (sendUserData) {
        console.log(sendUserData);
        socket.to(sendUserData).emit("msg-recieve", data.text);
        console.log("server");
      }
      await createMessage(data);
    });
  } catch (error) {
    console.log(error);
  }
}
