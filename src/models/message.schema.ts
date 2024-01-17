import mongoose, { Schema, model, ObjectId } from "mongoose";

interface Message {
  sender: any;
  receiver: any;
  text: string;
}
const messageSchema = new Schema<Message>(
  {
    sender: { type: mongoose.Types.ObjectId, required: true },
    receiver: { type: mongoose.Types.ObjectId, required: true },
    text: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export default model<Message>("message", messageSchema);
