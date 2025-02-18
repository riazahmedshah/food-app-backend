import { Response } from "express";
import { Types } from "mongoose";
import { User } from "../models/userSchema"

export const checkUserRole = async(userId: Types.ObjectId | undefined, res: Response, requiredRole: string ) => {
  const user = await User.findById(userId);
  if(user?.role !== requiredRole){
    res.status(401).json({message:"Not a partner yet"});
    return false;
  }
  return true;
}