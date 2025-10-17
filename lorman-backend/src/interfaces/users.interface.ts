import { z } from "zod";

const registerUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    tel: z.string().min(10, "Telephone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type RegisterUserDto = z.infer<typeof registerUserSchema>;