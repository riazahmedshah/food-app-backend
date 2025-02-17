import express from "express"
import { resTypes } from "../types/resTypes";
import zod from "zod"
import { User } from "../models/userSchema";
import { authMiddleware, CustomReq } from "../middleware/authMiddleWare";
import { Restaurant } from "../models/restaurantSchema";
import { resMenuTypes } from "../types/resMenuTypes";
import { ResMenu } from "../models/restaurantMenuSchema";

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
});

resRouter.post("/addmenu/:resId", authMiddleware, async(req,res) => {
  const { resId } = req.params;
  const {success, error} = resMenuTypes.safeParse(req.body);
  if(!success){
    res.status(400).json({error});
    return
  }
  try {
    const restaurant = await Restaurant.findById(resId);
    if(!restaurant){
      res.status(404).json({message:"Invalid resId"});
      return;
    };
    const addMenu = new ResMenu({
      resId,
      name:req.body.name,
      price:req.body.price,
      avgStarRating:req.body.avgStarRating,
      image:req.body.image,
      description:req.body.description,
      category:req.body.category,
      cuisines:req.body.cuisines
    });
    await addMenu.save();
    res.status(200).json({message:"success"});
  } catch (error) {
      if (error instanceof zod.ZodError) {
        console.error(error.message);
        res.status(400).json({ ZodError: error.message });
        return;
      };
      if (error instanceof Error) {
        console.error(error.message);
        res.status(400).json({ Error: error.message });
        return;
      } else {
        console.error("An Unknown error from /sign-in");
      }
  };
})

