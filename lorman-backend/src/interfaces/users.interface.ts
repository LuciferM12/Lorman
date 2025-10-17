import e from "express";
import { z } from "zod";

export const registerUserSchema = z.object({
    nombre_completo: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    telefono: z.string().min(10, "Telephone number must be at least 10 digits").optional(),
    password_hash: z.string().min(6, "Password must be at least 6 characters long"),
    direccion: z.string().default("").nullable(),
})

// TODO: Change direccion to be optional at database level and remove default here
export const UserSchema = registerUserSchema.extend({
    id_usuario: z.number(),
    dias_entrega_preferidos: z.string().optional().default("").nullable(),
    fecha_registro: z.coerce.date(),
    rol: z.enum(["admin", "cliente"]).default("cliente"),
})

export const UserResponseSchema = UserSchema.omit({ password_hash: true });
export type UserResponseDTO = z.infer<typeof UserResponseSchema>;
export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
export type UserDTO = z.infer<typeof UserSchema>;