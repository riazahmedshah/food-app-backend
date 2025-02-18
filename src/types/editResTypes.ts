import {z} from "zod"
import { resBaseType } from "./resBaseTypes";

export const editResTypes = resBaseType.extend({
  name:z.string().optional(),
  image:z.string().url({ message: "Invalid url" }).optional(),
  cuisines:z.string().array().max(4,"only 4 cuisines are allowed").optional(),
  avgStarRating:z.string().min(1,"min 1 star").max(5,"max 5 star").optional(),
  address:z.string().optional(),
  totalOutlet:z.number().min(1).optional(),
});