import { Socket } from "socket.io";
import { createMessage } from "../service/message.service";
import { Types } from "mongoose";

let onlineUsers = new Map();
export async function onConnection(socket: Socket) {
  try {
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId.id, socket.id);
    });
    socket.on("send-msg", async (data) => {
      const sendUserData = onlineUsers.get(data.receiver);
      data.receiver = new Types.ObjectId(data.receiver);
      data.sender = new Types.ObjectId(data.sender);
      const newMsg = await createMessage(data);
      if (sendUserData) {
        socket.to(sendUserData).emit("msg-receive", newMsg);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
