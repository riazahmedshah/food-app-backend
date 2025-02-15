import { z } from "zod"
import { resBaseType } from "./resBaseTypes";

export const resTypes = resBaseType.extend({
  restaurantId:z.string(),
  price:z.number().optional(),
  description:z.string(),
  category:z.enum(["Recomended", "Dinner", "Break fast"]),
});