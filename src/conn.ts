import mongoose, { ConnectOptions } from "mongoose";

export const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Mongo DB Running");
};
