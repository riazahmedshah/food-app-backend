import express from "express";
import { authRouter } from "./authRouter";
import { resRouter } from "./restaurantsRouter";
import { adminRouter } from "./adminRouter";

export const mainRouter = express.Router();

mainRouter.use("/auth",authRouter);
mainRouter.use("/restaurant", resRouter);
mainRouter.use("/admin",adminRouter);