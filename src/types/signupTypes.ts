import {z}  from "zod"
export const signupTypes = z.object({
  firstName:z.string().min(2, "First name must be atleats more than two characters").max(20,"First name must be less than 20 characters"),
  lastName:z.string().optional(),
  email: z.string().email("provide valid email").trim().toLowerCase(),
  contact: z.string().min(10, "mobile number must be 10 digits").max(10,"mobile number must be 10 digits"),
  password: z.string().min(6,"Password must have six characters"),
  role:z.enum(["user","partner"]).optional(),
  isVerified:z.boolean().optional(),
})