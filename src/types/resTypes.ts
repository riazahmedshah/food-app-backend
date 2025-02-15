import { z } from "zod"
import { resBaseType } from "./resBaseTypes";

export const resTypes = resBaseType.extend({
  contact: z.string().min(10, "mobile number must be 10 digits").max(10,"mobile number must be 10 digits"),
  address:z.string(),
  totalOutlet:z.number().min(1).optional(),
});