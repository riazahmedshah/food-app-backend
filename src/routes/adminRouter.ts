import express from "express";
import { authMiddleware, CustomReq } from "../middleware/authMiddleWare";
import { User } from "../models/userSchema";
import { handleError } from "../utils/errorfunction";
import { editUserTypes } from "../types/editUserTypes";
import { Restaurant } from "../models/restaurantSchema";
import { checkUserRole } from "../utils/checkUserRole";

export const adminRouter = express.Router();


adminRouter.patch("/approve/:reqUserId", authMiddleware, async (req: CustomReq, res) => {
    const { reqUserId } = req.params;
    const userId = req.decode?.userId;
    const { success, error } = editUserTypes.safeParse(req.body);

    if (!success) {
        res.status(400).json({ error });
        return;
    }

    try {
        const isAdmin = await checkUserRole(userId, res, "admin");
        if (!isAdmin) return;

        const requestedUser = await User.findById(reqUserId);
        if (!requestedUser) {
            res.status(404).json({message: "User not found"});
            return;
        }

        const contact = requestedUser.contact;
        const restaurantOwner = await Restaurant.findOne({ contact });

        if (!restaurantOwner) {
            res.status(404).json({message: "Restaurant not found"});
            return;
        }

        const updatedUserRole = await User.findByIdAndUpdate(reqUserId, {
            role: req.body.role,
        }, { returnDocument: "after" });

        res.status(200).json({ message: "approved", updatedUserRole });
    } catch (error) {
        handleError(res, error);
    }
});
