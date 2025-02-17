import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken"
import mongoose from "mongoose";

export interface CustomReq extends Request{
  decode?: {userId: mongoose.Types.ObjectId}
}

interface DecodedToken extends JwtPayload{
  userId:mongoose.Types.ObjectId
}

export const authMiddleware = async (req:CustomReq, res:Response, next:NextFunction) => {
  try {
    const {token} = req.cookies;
    if(!token){
      res.status(401).json({message:"Unauthorised"});
      return;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken
    if(decode){
      req.decode = {userId: decode.userId};
      next();
    }
  } catch (error) {
      if(error instanceof JsonWebTokenError){
        res.status(400).json({error});
      } else{
        console.error(error);
      }
  }
}