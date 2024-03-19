import mongoose, { Schema, model } from "mongoose";

interface Message {
  sender: any;
  receiver: any;
  groupId: any;
  text: string;
  image: string;
  archive: any;
  sender_profile_image: string;
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
    sender_profile_image: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export default model<Message>("message", messageSchema);
