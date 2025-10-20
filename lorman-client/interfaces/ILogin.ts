import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Debe tener al menos 6 caracteres'),
  captchaToken: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;