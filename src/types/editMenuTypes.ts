import {z} from "zod"

export const editMenuTypes = z.object({
  name:z.string().optional(),
  image:z.string().url({ message: "Invalid url" }).optional(),
  cuisines:z.string().array().max(4,"only 4 cuisines are allowed").optional(),
  avgStarRating:z.string().min(1,"min 1 star").max(5,"max 5 star").optional(),
  price:z.number().optional(),
  description:z.string().optional(),
  category:z.enum(["Recomended", "Dinner", "Break fast"]).optional(),
});