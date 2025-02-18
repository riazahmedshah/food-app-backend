import { Response } from "express";
import zod from "zod";

export function handleError(res:Response, error: unknown) {
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
    console.error("An unknown error occurred.");
  }
}
