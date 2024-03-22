import { Socket } from "socket.io";
import { createMessage } from "../service/message.service";
import { Types } from "mongoose";
import {
  createGroup,
  findOneGroup,
  updateProfile,
} from "../service/group.service";

let onlineUsers = new Map();
export async function onConnection(socket: Socket) {
  try {
    // messages
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

    // groups

    // new group created emit
    socket.on("group-created", async (data) => {
      const group = await createGroup(data);
      // send group created notification to all online users
      data.users.forEach((ele: any) => {
        const user = onlineUsers.get(ele);
        // added condition to avoid sending emit to user creating the group
        // && ele !== data.admins[0]
        //either way send emit to all user's including all admin's since their is no response sent otherwise
        // socket.to hanles excluding to event's sender
        if (user) {
          socket.to(user).emit("added-to-group", group);
        }
      });
    });

    //Group profile upadate
    socket.on("update-grpprofile", async (data) => {
      // const groupId = new Types.ObjectId(data._id);

      const groupProfile: any = await updateProfile(
        data.groupId.toString(),
        data.update
      );

      // send group created notification to all online users
      groupProfile.users.forEach((ele: any) => {
        const user = onlineUsers.get(ele.toString());
        if (user) {
          socket.to(user).emit("added-grpprofile", groupProfile);
        }
      });
    });
    // create new group message
    socket.on("send-grp-msg", async (data) => {
      data.sender = new Types.ObjectId(data.sender);
      data.groupId = new Types.ObjectId(data.groupId);
      console.log("data before create msg : ", data);
      const newMsg = await createMessage(data);
      console.log("data after create image : ", data);
      const group: any = await findOneGroup(data.groupId);
      // emit new message to online group user's
      group.users.forEach((ele: any) => {
        const user = onlineUsers.get(ele.toString());
        if (user) {
          socket.to(user).emit("msg-receive", newMsg);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}
