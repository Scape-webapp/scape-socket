import groupSchema, { GroupIF } from "../models/group.schema";

export const createGroup = (data: GroupIF) => {
  return groupSchema.create(data);
};
