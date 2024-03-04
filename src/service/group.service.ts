import groupSchema, { GroupIF } from "../models/group.schema";

export const createGroup = (data: GroupIF) => {
  return groupSchema.create(data);
};

export const findOneGroup = (id: string) => {
  return groupSchema.findById(id);
};

export const updateProfile=(id:string)=>{
  //add auth gaurd
  console.log("id>>>>",id)
  return groupSchema.findByIdAndUpdate(id);
}
