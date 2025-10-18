import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email("Ingresa un correo válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    telefono: z.string().min(7, "El teléfono debe tener al menos 7 caracteres"),
});

export type RegisterType = z.infer<typeof registerSchema>;