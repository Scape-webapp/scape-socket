import groupSchema, { GroupIF } from "../models/group.schema";

export const createGroup = (data: GroupIF) => {
  return groupSchema.create(data);
};

export const findOneGroup = (id: string) => {
  return groupSchema.findById(id);
};
