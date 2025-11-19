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

export const userUpdateSchema = userSchema.extend({
    direccion: z.string().optional(),
    telefono: z.string().optional(),
    dias_entrega_preferidos: z.string().optional(),
})

export type UserType = z.infer<typeof userSchema>;
export type SessionUserType = z.infer<typeof sessionUserSchema>;    
export type UserUpdateType = z.infer<typeof userUpdateSchema>;