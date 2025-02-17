import express from "express"
import { resTypes } from "../types/resTypes";
import zod from "zod"
import { User } from "../models/userSchema";
import { authMiddleware, CustomReq } from "../middleware/authMiddleWare";
import { Restaurant } from "../models/restaurantSchema";

export const resRouter = express.Router();

resRouter.post("/create", authMiddleware,async (req:CustomReq, res) => {
  const userId = req.decode?.userId
  const {success, error} = resTypes.safeParse(req.body);
  if(!success){
    res.status(400).json({error});
    return;
  }
  try {
    const resWithContact = await User.findOne({
      contact:req.body.contact
    })
    if(!resWithContact){
      res.status(404).json({message:"No user found with provided number"});
      return;
    }
    const restaurant = await Restaurant.findOne({
      contact:req.body.contact,
    });
    if(restaurant){
      res.status(409).json({message:"Cannot create two restaurant"});
      return;
    } else{
      const newRes = new Restaurant({
        contact:req.body.contact,
        name:req.body.name,
        image:req.body.image,
        cuisines:req.body.cuisines,
        avgStarRatings:req.body.avgStarRatings,
        address:req.body.address,
        totalOutlets:req.body.totalOutlets
      });
      await newRes.save();
      res.status(200).json({message:"success"});
    }
  } catch (error) {
      if (error instanceof zod.ZodError) {
        console.error(error.message);
        res.status(400).json({ ZodError: error.message });
        return;
      }
      if (error instanceof Error) {
        console.error(error.message);
        res.status(400).json({ Error: error.message });
        return;
      } else {
        console.error("An Unknown error from /sign-in");
      }
  }
})

