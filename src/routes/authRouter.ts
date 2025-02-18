import express from "express";
import { signupTypes } from "../types/signupTypes";
import { User } from "../models/userSchema";
import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken";
import { signinType } from "../types/signinTypes";
import zod from "zod"
import { handleError } from "../utils/errorfunction";

export const authRouter = express.Router();


authRouter.post("/signup", async(req,res) => {
  const {success, error} = signupTypes.safeParse(req.body);
  if(!success){
    res.status(400).json({ error });
    return;
  }
  try {
    const user = await User.findOne({
      email:req.body.email
    });
    if(user){
      res.status(409).json({message:"User already exist!"});
      return;
    } else{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          contact:req.body.contact,
          email:req.body.email,
          password:hashedPassword,
          role:req.body.role,
          isVerified:req.body.isVerified
        });
        await newUser.save();

        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET as string, {expiresIn:"1hr"});
        res.cookie("token",token, {expires:new Date(Date.now() + 1 * 3600000)});
        res.status(200).json({message:"success"});
    }
  } catch (error) {
      if(error instanceof Error){
        console.error(error.message);
        res.status(400).json({Error: error.message});
      }
      else{
        console.error("An Unknown error from /sign-up")
      }
  }


});

authRouter.post("/signin", async(req, res) => {
  const {success, error} = signinType.safeParse(req.body);
  if(!success){
    res.status(400).json({error});
    return;
  }
  try {
    const user = await User.findOne({
      email:req.body.email
    });
    if(user){
      const isMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if(isMatch){
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {expiresIn: "1hr"});
        res.cookie("token", token,  {expires: new Date(Date.now() + 1 * 3600000)});
        res.status(200).json({message:"success"})
      } else{
        res.status(401).json({message:"Invalid email/password"});
      }
    } else{
      res.status(404).json({message:"User not found"})
    }
  } catch (error) {
    handleError(res, error);
  }
});

authRouter.post("/logout", (req,res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  }).json("successfully logout")
})
