import { z } from "zod"

export const resBaseType = z.object({
  name:z.string(),
  image:z.string().url({ message: "Invalid url" }),
  cuisines:z.string().array().max(4,"only 4 cuisines are allowed"),
  avgStarRating:z.string().min(1,"min 1 star").max(5,"max 5 star").optional(),
})