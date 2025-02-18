import {z}  from "zod"
export const editUserTypes = z.object({
  firstName:z.string().min(2, "First name must be atleats more than two characters").max(20,"First name must be less than 20 characters").optional(),
  lastName:z.string().optional(),
  role:z.enum(["user","partner","admin"]).optional(),
  isVerified:z.boolean().optional(),
})