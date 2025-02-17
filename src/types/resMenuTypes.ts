import { z } from "zod"
import { resBaseType } from "./resBaseTypes";

export const resMenuTypes = resBaseType.extend({
  price:z.number().optional(),
  description:z.string().optional(),
  category:z.enum(["Recomended", "Dinner", "Break fast"]).optional(),
});