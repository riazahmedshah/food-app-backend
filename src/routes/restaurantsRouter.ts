import express from "express"
import { resTypes } from "../types/resTypes";
import zod from "zod"
import { User } from "../models/userSchema";
import { authMiddleware, CustomReq } from "../middleware/authMiddleWare";
import { Restaurant } from "../models/restaurantSchema";
import { resMenuTypes } from "../types/resMenuTypes";
import { ResMenu } from "../models/restaurantMenuSchema";
import { editResTypes } from "../types/editResTypes";
import { handleError } from "../utils/errorfunction";

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
    } else{
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
    }
  } catch (error) {
      handleError(res, error);
  }
});

resRouter.patch("/edit", authMiddleware,async(req:CustomReq,res) => {
  const userId = req.decode?.userId;
  const {success, error} = editResTypes.safeParse(req.body);
  if(!success){
    res.status(400).json({error});
    return
  }
  try {
    const user = await User.findById(userId);
    const contact = user?.contact;
    //console.log(contact);
    const restaurant = await Restaurant.findOneAndUpdate({contact},{
      name:req.body.name,
      image:req.body.image,
      cuisines:req.body.cuisines,
      avgStarRating:req.body.avgStarRating,
      address:req.body.address,
      totalOutlets:req.body.totalOutlet
    },{returnDocument:"after"});
    res.status(200).json({restaurant});
  } catch (error) {
    handleError(res,error);
  }
})

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
      handleError(res,error);
  };
});

resRouter.get("/all", async(req, res) => {
  try {
    const resList = await Restaurant.find({}).select(["name","image","cuisines","avgStarRatings","address","totalOutlets"]);
    res.status(200).json({resList});
  } catch (error) {
    handleError(res, error);
  }
});

