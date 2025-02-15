import {z} from "zod"

export const signinSchemaType = z.object({
    email: z.string().email("provide valid email").trim().toLowerCase(),
    password: z.string().min(6,"Password must have six characters"),
})