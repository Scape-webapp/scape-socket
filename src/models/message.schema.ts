import mongoose, { Schema, model, ObjectId } from "mongoose";

interface Message {
  sender: [ObjectId];
  reciever: [ObjectId];
  text: string;
}
const messageSchema = new Schema<Message>(
  {
    sender: { type: [mongoose.Types.ObjectId], required: true },
    reciever: { type: [mongoose.Types.ObjectId], required: true },
    text: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export default model<Message>("message", messageSchema);
