import expres from "express"
import { authMiddleware, CustomReq } from "../middleware/authMiddleWare";
import { User } from "../models/userSchema";
import { handleError } from "../utils/errorfunction";
import { USER_DATA } from "../utils/selectedUserData";

export const profileRouter = expres.Router();

profileRouter.get("/", authMiddleware, async(req:CustomReq, res) => {
  const userId = req.decode?.userId;
  try {
    const user = await User.findById(userId).select(USER_DATA);
    if(!user){
      res.status(404).json({message:"User Not found"});
      return;
    }

    res.status(200).json({user});
  } catch (error) {
    handleError(res,error);
  }
});

profileRouter.patch("/edit", authMiddleware, async(req:CustomReq,res) => {
  const userId = req.decode?.userId;
  try {
    const user = await User.findByIdAndUpdate(userId,{
      firstName:req.body.firstName,
      lastName:req.body.lastName,
    },{returnDocument:"after"}).select(USER_DATA);
    if(!user){
      res.status(404).json({message:"User Not found"});
      return;
    }
    res.status(200).json({user});
  } catch (error) {
    handleError(res,error);
  }
});