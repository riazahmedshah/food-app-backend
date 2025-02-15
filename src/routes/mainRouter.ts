import express from "express";
import { authRouter } from "./authRouter";
import { resRouter } from "./restaurantsRouter";

export const mainRouter = express.Router();

mainRouter.use("/auth",authRouter);
mainRouter.use("/restaurant", resRouter);