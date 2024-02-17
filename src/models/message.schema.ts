import mongoose, { Schema, model } from "mongoose";

interface Message {
  sender: any;
  receiver: any;
  groupId: any;
  text: string;
  image: string;
  archive: any;
}
const messageSchema = new Schema<Message>(
  {
    sender: { type: mongoose.Types.ObjectId, required: true },
    receiver: { type: mongoose.Types.ObjectId, required: false },
    groupId: { type: mongoose.Types.ObjectId, required: false },
    text: { type: String },
    image: { type: String },
    archive: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<Message>("message", messageSchema);
