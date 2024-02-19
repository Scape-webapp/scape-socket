import messageSchema from "../models/message.schema";

export const createMessage = (data: any) => {
  return messageSchema.create(data);
};
