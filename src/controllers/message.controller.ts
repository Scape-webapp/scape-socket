import { Socket } from "socket.io";
import { createMessage } from "../service/message.service";

let onlineUsers = new Map();
export async function onConnection(socket: Socket) {
  try {
    socket.on("add-user", (userId) => {
      console.log(userId.id, socket.id);
      onlineUsers.set(userId.id, socket.id);
      console.log("onlineUsers :>> ", onlineUsers);
    });
    socket.on("send-msg", async (data) => {
      console.log("server1");
      const sendUserData = onlineUsers.get(data.reciever);
      console.log("onlineUsers :>> ", onlineUsers);
      console.log(sendUserData);
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
