"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnection = void 0;
const message_service_1 = require("../service/message.service");
const mongoose_1 = require("mongoose");
const group_service_1 = require("../service/group.service");
let onlineUsers = new Map();
function onConnection(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // messages
            socket.on("add-user", (userId) => {
                onlineUsers.set(userId.id, socket.id);
            });
            socket.on("send-msg", (data) => __awaiter(this, void 0, void 0, function* () {
                const sendUserData = onlineUsers.get(data.receiver);
                data.receiver = new mongoose_1.Types.ObjectId(data.receiver);
                data.sender = new mongoose_1.Types.ObjectId(data.sender);
                const newMsg = yield (0, message_service_1.createMessage)(data);
                if (sendUserData) {
                    socket.to(sendUserData).emit("msg-receive", newMsg);
                }
            }));
            // groups
            // new group created emit
            socket.on("group-created", (data) => __awaiter(this, void 0, void 0, function* () {
                const group = yield (0, group_service_1.createGroup)(data);
                // send group created notification to all online users
                data.users.forEach((ele) => {
                    const user = onlineUsers.get(ele);
                    // added condition to avoid sending emit to user creating the group
                    // && ele !== data.admins[0]
                    //either way send emit to all user's including all admin's since their is no response sent otherwise
                    // socket.to hanles excluding to event's sender
                    if (user) {
                        socket.to(user).emit("added-to-group", group);
                    }
                });
            }));
            // create new group message
            socket.on("send-grp-msg", (data) => __awaiter(this, void 0, void 0, function* () {
                data.sender = new mongoose_1.Types.ObjectId(data.sender);
                data.groupId = new mongoose_1.Types.ObjectId(data.groupId);
                const newMsg = yield (0, message_service_1.createMessage)(data);
                const group = yield (0, group_service_1.findOneGroup)(data.groupId);
                // emit new message to online group user's
                group.users.forEach((ele) => {
                    const user = onlineUsers.get(ele.toString());
                    if (user) {
                        socket.to(user).emit("msg-receive", newMsg);
                    }
                });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.onConnection = onConnection;
