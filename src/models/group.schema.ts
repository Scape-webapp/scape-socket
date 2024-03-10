import mongoose, { ObjectId, Schema, model } from "mongoose";

export const PastUser = new Schema({
  pastUserId: mongoose.Types.ObjectId,
  timestamps: Date,
});

export interface GroupIF {
  name: string;
  profile_image: string;
  description: string;
  users: Array<ObjectId>[];
  admins: Array<ObjectId>[];
  archive: Array<ObjectId>[];
  past_user: Array<typeof PastUser>[];
}

const groupSchema = new Schema<GroupIF>(
  {
    name: { type: String, required: true },
    profile_image: { type: String },
    description: { type: String },
    users: {
      type: [mongoose.Types.ObjectId],
    },
    admins: {
      type: [mongoose.Types.ObjectId],
    },
    archive: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    past_user: {
      type: [PastUser],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<GroupIF>("group", groupSchema);
