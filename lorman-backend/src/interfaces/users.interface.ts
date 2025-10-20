import { z } from "zod";

export const registerUserSchema = z.object({
    nombre_completo: z.string().min(1, "El nombre completo es requerido"),
    email: z.string().email("Dirección de correo electrónico inválida"),
    telefono: z.string().min(10, "El numero de teléfono debe tener 10 caracteres").optional(),
    password_hash: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    direccion: z.string().default("").nullable(),
})

// TODO: Change direccion to be optional at database level and remove default here
export const UserSchema = registerUserSchema.extend({
    id_usuario: z.number(),
    dias_entrega_preferidos: z.string().optional().default("").nullable(),
    fecha_registro: z.coerce.date(),
    rol: z.enum(["administrador", "cliente"]).default("cliente"),
})

export const UserResponseSchema = UserSchema.omit({ password_hash: true });
export type UserResponseDTO = z.infer<typeof UserResponseSchema>;
export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
export type UserDTO = z.infer<typeof UserSchema>;