import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email(),
    rol: z.enum(['admininistrador', 'cliente']),
    nombre_completo: z.string(),
    id_usuario: z.number(),
});

export const sessionUserSchema = z.object({
    user: userSchema,
    token: z.string(),
});

export type UserType = z.infer<typeof userSchema>;
export type SessionUserType = z.infer<typeof sessionUserSchema>;    